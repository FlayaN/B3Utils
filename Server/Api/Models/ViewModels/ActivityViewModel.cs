using Api.Models.Database;
using Newtonsoft.Json;
using System;

namespace Api.Models.ViewModels
{
    public class ActivityViewModel
    {
        public Guid ActivityId { get; set; }
        public string UserId { get; set; }
        public DateTimeOffset Date { get; set; }
        public FitnessType FitnessType { get; set; }
        public double Amount { get; set; }
        [Obsolete]
        public string Type { get; set; }
    }

    public enum FilterType
    {
        All = 0,
        Month = 1,
        Week = 2
    }
}
