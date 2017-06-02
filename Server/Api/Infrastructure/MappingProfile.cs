using Api.Models.Database;
using Api.Models.ViewModels;
using AutoMapper;
using System.Linq;

namespace Api.Infrastructure
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserViewModel>();
            CreateMap<UserViewModel, User>();

            CreateMap<Activity, ActivityViewModel>()
                .ForMember(dest => dest.FitnessType, opts => opts.MapFrom(src => src.Type))
                .ForMember(dest => dest.Type, opts => opts.MapFrom(src => OldSupport.PatchOld(src.Type)));

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
