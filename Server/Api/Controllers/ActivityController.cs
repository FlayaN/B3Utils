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
            var user = _context.Users
                .Include(x => x.Activities)
                .FirstOrDefault(x => x.UserId == activity.UserId);
            if(user != null)
            {
                user.LastRecordedDate = activity.EndDate;
                user.TotalDistance += activity.Amount;
                if(user.Activities == null)
                {
                    user.Activities = new List<Activity>();
                }

                var existing = user.Activities.FirstOrDefault(x => x.StartDate == activity.StartDate && x.EndDate == x.EndDate);
                if(existing == null)
                {
                    user.Activities.Add(Mapper.Map<Activity>(activity));
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                return BadRequest("Already added that entry");
            }
            {
                return NotFound();
            }
        }
    }
}