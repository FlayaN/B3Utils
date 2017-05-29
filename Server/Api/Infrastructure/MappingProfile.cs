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

            CreateMap<IdeaViewModel, Idea>();
            CreateMap<Idea, IdeaViewModel>()
                .ForMember(dest => dest.MessageCount, opts => opts.MapFrom(src => src.Messages.Count))
                .ForMember(dest => dest.UserName, opts => opts.MapFrom(src => src.User.Name));

            CreateMap<MessageViewModel, Message>();
            CreateMap<Message, MessageViewModel>()
                .ForMember(dest => dest.UserName, opts => opts.MapFrom(src => src.User.Name));
        }
    }
}
