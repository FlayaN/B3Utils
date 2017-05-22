using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Api.Models.ViewModels;
using Api.Models.Database;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Collections.Generic;
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

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]ActivityViewModel activity)
        {
            //activity.Date.AddHours(2);
            var user = _context.Users
                .Include(x => x.Activities)
                .FirstOrDefault(x => x.UserId == activity.UserId);
            if (user != null)
            {
                if (user.Activities == null)
                {
                    user.Activities = new List<Activity>();
                }

                var existing = user.Activities.FirstOrDefault(x => x.Date.Date == activity.Date.Date);
                if (existing == null)
                {
                    user.Activities.Add(new Activity {
                        Amount = activity.Amount,
                        Date = activity.Date,
                        Type = activity.Type,
                        UserId = activity.UserId
                    });
                }
                else
                {
                    existing.Date = activity.Date;
                    existing.Amount = activity.Amount;
                }

                user.TotalDistance = user.Activities.Sum(x => x.Amount);
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