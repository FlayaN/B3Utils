using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Api.Models.ViewModels;
using Api.Models.Database;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Api.Infrastructure;
using AutoMapper;
using System;

namespace Api.Controllers
{
    [Route("api/v1/[controller]")]
    public class ActivityController : Controller
    {
        private AppDbContext _context;

        public ActivityController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("forUser/{userId}/{type}/{filter}")]
        public IActionResult Activities(string userId, FitnessType type, FilterType filter)
        {
            var user = _context.Users
                .Include(x => x.Activities)
                .FirstOrDefault(x => x.UserId == userId);
            if (user != null)
            {
                IEnumerable<Activity> userQuery;

                switch (filter)
                {
                    case FilterType.Month:
                        userQuery = user.Activities.Where(x => x.Type == type && x.Date.Month == DateTime.UtcNow.Month);
                        break;
                    case FilterType.Week:
                        userQuery = user.Activities.Where(x => x.Type == type && DateHelper.GetIso8601WeekOfYear(x.Date.Date) == DateHelper.GetIso8601WeekOfYear(DateTime.UtcNow));
                        break;
                    default:
                    case FilterType.All:
                        userQuery = user.Activities.Where(x => x.Type == type);
                        break;
                }

                var activities = userQuery.Select(Mapper.Map<ActivityViewModel>).OrderByDescending(x => x.Date).ToList();
                return new ObjectResult(activities);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]ActivityViewModel activity)
        {
            var user = _context.Users
                .Include(x => x.Activities)
                .FirstOrDefault(x => x.UserId == activity.UserId);
            if (user != null)
            {
                if (user.Activities == null)
                {
                    user.Activities = new List<Activity>();
                }

                FitnessType activityType;

                if(!string.IsNullOrEmpty(activity.Type)) //Old clients
                {
                    activityType = OldSupport.PatchOld(activity.Type);
                }
                else
                {
                    activityType = activity.FitnessType;
                }

                var existing = user.Activities.FirstOrDefault(x => x.Date.Date == activity.Date.Date && x.Type == activityType);
                if (existing == null)
                {
                    user.Activities.Add(new Activity {
                        Amount = activity.Amount,
                        Date = activity.Date,
                        Type = activityType,
                        UserId = activity.UserId
                    });
                }
                else
                {
                    existing.Date = activity.Date;
                    existing.Amount = activity.Amount;
                }
                
                user.LastRecordedDate = activity.Date.Date;
                await _context.SaveChangesAsync();
                return Ok();
            }
            {
                return NotFound();
            }
        }
    }
}