using System.Numerics;

namespace Wordle.Data.Game {
    public class GameData {
        public string Room { get; set; } = string.Empty;
        public string Wordle { get; set; } = string.Empty;
        public Player? Host { get; set; }
        public Player? Guest { get; set; }

        public GameData(string room, string wordle, Player? host) {
            Room = room;
            Wordle = wordle;
            Host = host;
        }
    }
}
