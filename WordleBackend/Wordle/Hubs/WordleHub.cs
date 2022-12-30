using Microsoft.AspNetCore.SignalR;
using System.Collections;
using Wordle.Common;
using Wordle.Data.Connections;
using Wordle.Data.Game;
using Wordle.Services;

namespace Wordle.Hubs {
    public class WordleHub : Hub {
        private readonly string _botUser;
        private readonly IDictionary<string, GameData> _gameData;
        private readonly IWordleService _wordleService;
        private static List<Player> _players = new();

        public WordleHub(IDictionary<string, GameData> gameData, IWordleService wordleService) {
            _botUser = "gameBot:";
            _gameData = gameData;
            _wordleService = wordleService;
        }

        public async Task StartGame(UserConnection connection) {
            string room = connection.Room;

            string wordle = WordsUtils.GetRandomWord();

            Player player = new(connection.UserName, Context.ConnectionId, room);
            _gameData[room] = new GameData(room, wordle, player);
            _players.Add(player);

            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await Clients.Group(room).SendAsync("StartGame", _botUser, $"room {room} was created by {connection.UserName}, waiting for opponent...");
        }

        public async Task JoinRoom(UserConnection connection) {
            string room = connection.Room;

            if (!_gameData.ContainsKey(room)) {
                return;
            }

            Player player = new(connection.UserName, Context.ConnectionId, room);
            _gameData[room].Guest = player;
            _players.Add(player);

            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await Clients.Group(room).SendAsync("JoinRoom", _botUser, $"{connection.UserName} joined room {room}");
        }

        public async Task CheckAnswer(UserConnection connection, string answer) {
            string room = connection.Room;

            if (answer.Length != 5) {
                return;
            }

            if (!_gameData.ContainsKey(room)) {
                return;
            }

            string[] response = _wordleService.checkAnswer(_gameData[room].Wordle, answer);

            if (response.All(x => x.Equals("CORRECT"))) {
                await Clients.Group(room).SendAsync("CorrectAnswer", connection.UserName, answer);
            } else {
                await Clients.Group(room).SendAsync("CheckAnswer", connection.UserName, response[0], response[1], response[2], response[3], response[4]);
            }
        }

        public async Task StartAgain(UserConnection connection) {
            string room = connection.Room;

            if (!_gameData.ContainsKey(room)) {
                return;
            }

            _gameData[room].Wordle = WordsUtils.GetRandomWord();

            await Clients.Group(room).SendAsync("StartAgain", _botUser, $"New word was generated in room{room}");
        }

        public override async Task<Task> OnDisconnectedAsync(Exception? exception) {
            var player = _players.FirstOrDefault(p => p.ConnectionId == Context.ConnectionId);
            if (player != null) {
                _players.Remove(player);
                GameData gameData = _gameData[player.Room];

                await Clients.Group(gameData.Room).SendAsync("GameOver", _botUser, $"{player.Name} left the game");
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(UserConnection connection, string message) {
            await Clients.Group(connection.Room).SendAsync("ReceiveMessage", connection.UserName, message);
        }

        public GameData GetGameData(string room) {
            return _gameData[room];
        }
    }
}
