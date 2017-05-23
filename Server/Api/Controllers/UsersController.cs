using Api.Models.Database;
using Api.Models.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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

        [HttpGet("{userId}/activities/{type?}")]
        public IActionResult Activities(string userId, string type = "getDailyDistanceSamples")
        {
            var user = _context.Users
                .Include(x => x.Activities)
                .FirstOrDefault(x => x.UserId == userId);
            if (user != null)
            {
                var activities = user.Activities.Where(x => x.Type == type).Select(Mapper.Map<ActivityViewModel>).OrderByDescending(x => x.Date).ToList();
                return new ObjectResult(activities);
            }
            return NotFound();
        }

        [HttpGet("all/{type}")]
        public IActionResult GetUsers(string type)
        {
            List<UserViewModel> users;
            var usersQuery = _context.Users.Select(Mapper.Map<UserViewModel>);
            if (type == "getDailyDistanceSamples")
            {
                users = usersQuery.OrderByDescending(x => x.TotalDistance).ToList();
            }
            else
            {
                users = usersQuery.OrderByDescending(x => x.TotalSteps).ToList();
            }
            return new ObjectResult(users);
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
            var existing = _context.Users.FirstOrDefaultAsync(x => x.UserId == user.UserId);
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
