using System;

namespace Api.Models.ViewModels
{
    public class ActivityViewModel
    {
        public string UserId { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Type { get; set; }
        public double Amount { get; set; }
    }
}
