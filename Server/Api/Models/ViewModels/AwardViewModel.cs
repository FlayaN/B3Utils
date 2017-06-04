using System;

namespace Api.Models.ViewModels
{
    public class AwardViewModel
    {
        public Guid AwardId { get; set; }
        public string Description { get; set; }
        public string Value { get; set; }
        public string UserId { get; set; }
        public DateTimeOffset Date { get; set; }
        public AwardType Type { get; set; }
        public int Placement { get; set; }
    }

    public enum AwardType
    {
        Other = 0,
        MonthSteps = 1,
        WeekSteps = 2,
        MonthDistance = 3,
        WeekDistance = 4
    }
}