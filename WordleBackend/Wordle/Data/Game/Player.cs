namespace Wordle.Data.Game {
    public class Player {
        public string Name { get; set; } = string.Empty;
        public string ConnectionId { get; set; } = string.Empty;
        public string Room { get; set; } = string.Empty;

        public Player(string name, string connectionId, string room) {
            Name = name;
            ConnectionId = connectionId;
            Room = room;
        }
    }
}