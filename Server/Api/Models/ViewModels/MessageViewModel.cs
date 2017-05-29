using System;

namespace Api.Models.ViewModels
{
    public class MessageViewModel
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string IdeaId { get; set; }
        public string Text { get; set; }
        public DateTimeOffset TimeStamp { get; set; }
    }
}
