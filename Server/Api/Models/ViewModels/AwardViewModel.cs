using System;

namespace Api.Models.ViewModels
{
    public class AwardViewModel
    {
        public string Description { get; set; }
        public string Value { get; set; }
        public string UserId { get; set; }
        public DateTimeOffset Date { get; set; }
        public AwardType Type { get; set; }
    }

    public enum AwardType
    {
        Other = 0,
        TopMonthSteps = 1,
        TopWeekSteps = 2,
        TopMonthDistance = 3,
        TopWeekDistance = 4
    }
}