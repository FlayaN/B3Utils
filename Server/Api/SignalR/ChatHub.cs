using Api.Models.ViewModels;
using Microsoft.AspNetCore.SignalR;

namespace Api.SignalR
{

    public interface Client
    {
        void Send(MessageViewModel message);
    }

    public class ChatHub: Hub<Client>
    {
        public void Send(MessageViewModel message)
        {
            Clients.All.Send(message);
        }
    }
}
