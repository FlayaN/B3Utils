using Api.Models.Database;
using Api.Models.ViewModels;
using AutoMapper;

namespace Api.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserViewModel>();
            CreateMap<UserViewModel, User>();
            CreateMap<Activity, ActivityViewModel>();
            CreateMap<ActivityViewModel, Activity>();
        }
    }
}
