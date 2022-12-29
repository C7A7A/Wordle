using Microsoft.AspNetCore.Mvc;
using Wordle.Common;
using Wordle.Data.Game;
using Wordle.Hubs;
using Wordle.Services;

namespace Wordle.Controllers; 

[Route("api/v1/[controller]")]
public class WordleController : Controller {

    private readonly IWordleService _wordleService;
    private readonly WordleHub _wordleHub;

    public WordleController(IWordleService wordleService, WordleHub wordleHub) {
        _wordleService = wordleService;
        _wordleHub = wordleHub;
    }

    [HttpGet("words")]
    public string[] GetWords() {
        return WordsUtils.words;
    }

    [HttpGet]
    public string StartWordle() {
        return _wordleService.getRoom();
    }

    [HttpGet("gameData")]
    public GameData GetGameData(string room) {
        return _wordleHub.GetGameData(room); 
    }
}
