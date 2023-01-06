using Azure;
using Microsoft.AspNetCore.SignalR;
using System.Collections;
using Wordle.Common;
using Wordle.Data.Connections;
using Wordle.Data.Game;
using Wordle.Services;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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

            // if given room already exist
            if (_gameData.ContainsKey(room)) {
                return;

            }
            string wordle = WordsUtils.GetRandomWord();
            Console.WriteLine(wordle);

            Player player = new(connection.UserName, Context.ConnectionId, room);
            _gameData[room] = new GameData(room, wordle, player);
            _players.Add(player);

            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await SendResponse("StartGame", connection);
        }

        public async Task JoinRoom(UserConnection connection) {
            string room = connection.Room;

            // if given room does not exist
            if (!_gameData.ContainsKey(room)) {
                return;
            }

            // if there are 2 players in room
            if (_gameData[room].Host != null && _gameData[room].Guest != null) {
                return;
            }

            Player player = new(connection.UserName, Context.ConnectionId, room);
            _gameData[room].Guest = player;
            _players.Add(player);

            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await SendResponse("JoinRoom", connection);
        }

        public async Task CheckAnswer(UserConnection connection, string answer) {
            string room = connection.Room;

            if (!ValidateCheckAnswer(room, answer)) {
                return;
            }

            string[] response = _wordleService.checkAnswer(_gameData[room].Wordle, answer);

            if (response.All(x => x.Equals("CORRECT"))) {
                await SendResponse("CorrectAnswer", connection, response);
            } else {
                await SendResponse("CheckAnswer", connection, response);
            }
        }

        public async Task LastAnswer(UserConnection connection, string answer) {
            string room = connection.Room;

            if (!ValidateCheckAnswer(room, answer)) {
                return;
            }

            string[] response = _wordleService.checkAnswer(_gameData[room].Wordle, answer);

            if (response.All(x => x.Equals("CORRECT"))) {
                await SendResponse("CorrectAnswer", connection, response);
            } else {
                await SendResponse("LastAnswer", connection, response);
            }
        }

        public async Task PlayAgain(UserConnection connection) {
            string room = connection.Room;

            // if given room does not exist
            if (!_gameData.ContainsKey(room)) {
                return;
            }

            string wordle = WordsUtils.GetRandomWord();
            Console.WriteLine(wordle);
            
            _gameData[room].Wordle = wordle;

            await SendResponse("PlayAgain", connection);
        }

        public override async Task<Task> OnDisconnectedAsync(Exception? exception) {
            var player = _players.FirstOrDefault(p => p.ConnectionId == Context.ConnectionId);
            if (player != null) {
                _players.Remove(player);
                GameData gameData = _gameData[player.Room];

                await Clients.Group(gameData.Room).SendAsync("GameOver", _botUser, player.Name,  " left the game", gameData.Wordle);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public GameData GetGameData(string room) {
            return _gameData[room];
        }

        private bool ValidateCheckAnswer(string room, string answer) {
            if (room == null) { 
                return false; 
            }

            // if answer length is not correct
            if (answer.Length != 5) {
                return false;
            }

            // if there are no 2 players in room
            if (_gameData[room].Host == null || _gameData[room].Guest == null) {
                return false;
            }

            // if given room does not exist
            if (!_gameData.ContainsKey(room)) {
                return false;
            }

            return true;
        }

        private async Task SendResponse(string responseType, UserConnection connection, string[]? responseMessage = null) {
            switch (responseType) {
                case "StartGame":
                    await Clients.Group(connection.Room).SendAsync(
                        "StartGame",
                        _botUser,
                        $"room {connection.Room} was created by {connection.UserName}, waiting for opponent..."
                    );
                    break;

                case "JoinRoom":
                    await Clients.Group(connection.Room).SendAsync(
                        "JoinRoom",
                        _botUser,
                        connection.UserName, $"joined room {connection.Room} hosted by", _gameData[connection.Room].Host.Name
                    );
                    break;

                case "CorrectAnswer":
                    await Clients.Group(connection.Room).SendAsync(
                        "CorrectAnswer",
                        connection.UserName,
                        responseMessage,
                        _gameData[connection.Room].Wordle
                    );
                    break;

                case "CheckAnswer":
                    await Clients.Group(connection.Room).SendAsync(
                        "CheckAnswer",
                        connection.UserName,
                        responseMessage
                    );
                    break;

                case "PlayAgain":
                    await Clients.Group(connection.Room).SendAsync(
                        "PlayAgain",
                        _botUser, 
                        $"New word was generated in room {connection.Room}"
                    );
                    break;

                case "LastAnswer":
                    await Clients.Group(connection.Room).SendAsync(
                        "LastAnswer",
                        connection.UserName,
                        responseMessage,
                        _gameData[connection.Room].Wordle
                    );
                    break;

                default:
                    break;
            }
        }

    }
}
