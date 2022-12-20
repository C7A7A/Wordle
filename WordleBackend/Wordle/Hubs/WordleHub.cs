using Microsoft.AspNetCore.SignalR;
using Wordle.Data.Connections;

namespace Wordle.Hubs {
    public class WordleHub : Hub {
        private readonly string _botUser;
        public WordleHub() {
            _botUser = "Bot ;]";
        }

        public async Task JoinRoom(UserConnection connection) {
            string room = connection.Room;
            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await Clients.Group(room).SendAsync("ReceiveMessage", _botUser, $"{connection.UserName} has joined room {connection.Room}");
        }

        public async Task SendMessage(UserConnection connection, string message) {
            await Clients.Group(connection.Room).SendAsync("ReceiveMessage", connection.UserName, message);
        }
    }
}
