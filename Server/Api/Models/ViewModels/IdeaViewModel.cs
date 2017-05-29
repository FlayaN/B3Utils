using System;

namespace Api.Models.ViewModels
{
    public class IdeaViewModel
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Header { get; set; }
        public string Detail { get; set; }
        public int MessageCount { get; set; }
        public DateTimeOffset TimeStamp { get; set; }
    }
}
