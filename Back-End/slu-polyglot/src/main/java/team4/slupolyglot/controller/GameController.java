package team4.slupolyglot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import team4.slupolyglot.controller.request.GameRequest;
import team4.slupolyglot.dto.GameDto;
import team4.slupolyglot.services.GameService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="/polyglot")
@CrossOrigin

public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/getGame")
    public ResponseEntity<Object> getGame(@RequestBody GameRequest gameRequest) {

        List<GameDto> gameDtoFirst = gameService.createGameOne(gameRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("game_first", gameDtoFirst);

        return ResponseEntity.ok(response);
    }
}
