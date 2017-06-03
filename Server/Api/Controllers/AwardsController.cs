using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Api.Models.Database;
using Api.Models.ViewModels;
using Api.Infrastructure;

namespace Api.Controllers
{
    [Route("api/v1/[controller]")]
    public class AwardsController : Controller
    {
        private AppDbContext _context;

        public AwardsController(AppDbContext context)
        {
            _context = context;
        }

        //[HttpGet("forUser/{userId}")]
        //public IActionResult GetAwardsForUser(string userId)
        //{
        //    var awards = new List<AwardViewModel>();
        //    var startDate = new DateTime(2017, 05, 18);

        //    var query = _context.Activities.GroupBy(x => new { x.Type, x.UserId })
        //        .Select(x => new { Group = x.Key, TotalAmount = x.Sum(y => y.Amount) })
        //        .OrderByDescending(x => x.TotalAmount)
        //        .FirstOrDefault();

        //    return new ObjectResult(awards);
        //}
        
        [HttpGet("{fitnessType}/{filter}")]
        public IActionResult GetAwards(FitnessType fitnessType, FilterType filter)
        {
            var query = _context.Activities.Where(x => x.Type == fitnessType);
            var awards = new List<AwardViewModel>();

            var startDate = new DateTime(2017, 05, 18);

            switch (filter)
            {
                case FilterType.Month:
                    for (DateTime date = startDate; date.Month < DateTime.UtcNow.Month; date = date.AddMonths(1))
                    {
                        var res = query
                            .Where(x => x.Date.Month == date.Month)
                            .GroupBy(x => x.UserId)
                            .Select(x => new { UserId = x.Key, TotalAmount = x.Sum(y => y.Amount) })
                            .OrderByDescending(x => x.TotalAmount)
                            .FirstOrDefault();
                        if (res != null)
                        {
                            awards.Add(new AwardViewModel
                            {
                                UserId = res.UserId,
                                Description = fitnessType == FitnessType.Distance ? $"Längst sträcka månad: {date.Month}" : $"Mest steg månad: {date.Month}",
                                Value = res.TotalAmount.ToString(),
                                Date = date,
                                Type = fitnessType == FitnessType.Distance ? AwardType.TopMonthDistance : AwardType.TopMonthSteps
                            });
                        }
                    }
                    break;
                case FilterType.Week:
                    for (DateTime date = startDate; DateHelper.GetIso8601WeekOfYear(date) < DateHelper.GetIso8601WeekOfYear(DateTime.UtcNow); date = date.AddDays(7))
                    {
                        var week = DateHelper.GetIso8601WeekOfYear(date);

                        var res = query
                            .Where(x => DateHelper.GetIso8601WeekOfYear(x.Date.Date) == week)
                            .GroupBy(x => x.UserId)
                            .Select(x => new { UserId = x.Key, TotalAmount = x.Sum(y => y.Amount) })
                            .OrderByDescending(x => x.TotalAmount)
                            .FirstOrDefault();
                        if (res != null)
                        {
                            awards.Add(new AwardViewModel
                            {
                                UserId = res.UserId,
                                Description = fitnessType == FitnessType.Distance ? $"Längst sträcka vecka: {week}" : $"Mest steg vecka: {week}",
                                Value = res.TotalAmount.ToString(),
                                Date = date,
                                Type = fitnessType == FitnessType.Distance ? AwardType.TopWeekDistance : AwardType.TopWeekSteps
                            });
                        }
                    }
                    break;
                case FilterType.All:
                default:
                    break;
            }

            return new ObjectResult(awards);
        }
    }
}
