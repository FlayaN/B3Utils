using Microsoft.AspNetCore.Mvc;
using Api.Models.Database;
using Api.Models.ViewModels;
using System.Threading.Tasks;
using AutoMapper;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/v1/[controller]")]
    public class IdeasController : Controller
    {
        private AppDbContext _context;

        public IdeasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostIdea([FromBody]IdeaViewModel idea)
        {
            await _context.Ideas.AddAsync(Mapper.Map<Idea>(idea));
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        public IActionResult GetIdeas()
        {
            var ideas = _context.Ideas
                .Include(x => x.Messages) //Needed for MessageCount
                .Include(x => x.User) //Needed for UserName
                .Select(Mapper.Map<IdeaViewModel>).OrderByDescending(x=> x.TimeStamp).ToList();
            return new OkObjectResult(ideas);
        }

        [HttpGet("{ideaId}")]
        public async Task<IActionResult> GetIdea(Guid ideaId)
        {
            var idea = await _context.Ideas
                .Include(x => x.Messages) //Needed for MessageCount
                .Include(x => x.User) //Needed for UserName
                .FirstOrDefaultAsync(x => x.Id == ideaId);
            return new OkObjectResult(idea);
        }

        [HttpGet("{ideaId}/Messages")]
        public async Task<IActionResult> GetMessages(Guid ideaId)
        {
            var idea = await _context.Ideas
                .Include(x => x.Messages)
                    .ThenInclude(y => y.User)
                .FirstOrDefaultAsync(x => x.Id == ideaId);
            if(idea != null)
            {
                var messages = idea.Messages.Select(Mapper.Map<MessageViewModel>).OrderByDescending(x => x.TimeStamp).ToList();
                return new OkObjectResult(messages);
            }
            return NotFound();
        }

        [HttpPost("{ideaId}/Messages")]
        public async Task<IActionResult> PostMessage([FromBody]MessageViewModel message)
        {
            await _context.Messages.AddAsync(Mapper.Map<Message>(message));
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
