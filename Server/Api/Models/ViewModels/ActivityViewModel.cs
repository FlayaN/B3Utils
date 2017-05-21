using System;

namespace Api.Models.ViewModels
{
    public class ActivityViewModel
    {
        public Guid ActivityId { get; set; }
        public string UserId { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public double Amount { get; set; }
    }
}
