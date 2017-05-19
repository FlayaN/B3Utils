using System;

namespace Api.Models.ViewModels
{
    public class UserViewModel
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string LastRecordedDate { get; set; }
        public string AvatarUrl { get; set; }
        public double TotalDistance { get; set; }
    }
}
