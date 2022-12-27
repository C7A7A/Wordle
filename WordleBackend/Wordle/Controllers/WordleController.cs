using Microsoft.AspNetCore.Mvc;
using Wordle.Common;
using Wordle.Services;

namespace Wordle.Controllers; 

[Route("api/v1/[controller]")]
public class WordleController : Controller {

    private readonly IWordleService _wordleService;

    public WordleController(IWordleService wordleService) {
        _wordleService = wordleService;
    }

    [HttpGet("words")]
    public string[] GetWords() {
        return WordsUtils.words;
    }

    [HttpGet]
    public string StartWordle() {
        return _wordleService.getRoom();
    }
}
