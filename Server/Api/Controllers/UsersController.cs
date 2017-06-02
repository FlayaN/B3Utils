using Api.Infrastructure;
using Api.Models.Database;
using Api.Models.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/v1/[controller]")]
    public class UsersController : Controller
    {
        private AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public IActionResult Get(string userId)
        {
            var user = _context.Users.Select(Mapper.Map<UserViewModel>).FirstOrDefault(x => x.UserId == userId);
            return new ObjectResult(user);
        }

        /// <summary>
        /// REMOVE ME SOON
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        [HttpGet("{userId}/activities/{type}")]
        public IActionResult Activities(string userId, string type = "getDailyDistanceSamples")
        {
            return RedirectToAction("Activities", "Activity", new { userId, type = OldSupport.PatchOld(type), filter = FilterType.All });
        }

        [HttpGet("{type}/{filter}")]
        public IActionResult GetUsers(FitnessType type, FilterType filter)
        {
            var result = new List<UserViewModel>();
            var users = _context.Users
                .Include(x => x.Activities).ToList();

            foreach(var user in users)
            {
                var vmUser = Mapper.Map<UserViewModel>(user);
                switch (filter)
                {
                    case FilterType.All:
                        vmUser.Amount = user.Activities?.Where(x => x.Type == type).Sum(x => x.Amount) ?? 0;
                        break;
                    case FilterType.Month:
                        vmUser.Amount = user.Activities?.Where(x => x.Type == type && x.Date.Month == DateTime.UtcNow.Month).Sum(x => x.Amount) ?? 0;
                        break;
                    case FilterType.Week:
                        vmUser.Amount = user.Activities?.Where(x => x.Type == type && DateHelper.GetIso8601WeekOfYear(x.Date.Date) == DateHelper.GetIso8601WeekOfYear(DateTime.UtcNow)).Sum(x => x.Amount) ?? 0;
                        break;
                }

                //Temp patch old clients
                vmUser.TotalDistance = vmUser.Amount;
                vmUser.TotalSteps = vmUser.Amount;

                result.Add(vmUser);
            }

            return new ObjectResult(result.OrderByDescending(x => x.Amount).ToList());
        }

        /// <summary>
        /// REMOVE ME SOON
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        [HttpGet("all/{type}")]
        public IActionResult GetUsers(string type)
        {
            return GetUsers(OldSupport.PatchOld(type), FilterType.All);
        }

        /// <summary>
        /// REMOVE ME SOON
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        [HttpGet("")]
        public IActionResult GetUsers()
        {
            return GetUsers("getDailyDistanceSamples");
        }

        [HttpPost("")]
        public async Task<IActionResult> Add([FromBody]UserViewModel user)
        {
            var existing = await _context.Users.FirstOrDefaultAsync(x => x.UserId == user.UserId);
            if (existing == null)
            {
                await _context.Users.AddAsync(Mapper.Map<User>(user));
                await _context.SaveChangesAsync();
                return Ok();
            }
            return Ok("User already exists");
        }

        [HttpPut("")]
        public async Task<IActionResult> Update([FromBody]UserViewModel user)
        {
            var existingUser = _context.Users.FirstOrDefault(x => x.UserId == user.UserId);
            if (existingUser != null)
            {
                existingUser.AvatarUrl = user.AvatarUrl;
                existingUser.Name = user.Name;
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
