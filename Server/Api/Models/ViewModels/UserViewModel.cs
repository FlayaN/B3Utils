using System;

namespace Api.Models.ViewModels
{
    public class UserViewModel
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public DateTime LastRecordedDate { get; set; }
        public string AvatarUrl { get; set; }
        public double Amount { get; set; }


        //Remove me when users have updated..
        [Obsolete]
        public double TotalDistance { get; set; }
        [Obsolete]
        public double TotalSteps { get; set; }
    }
}
