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

import static team4.slupolyglot.MyConstants.*;

@RestController
@RequestMapping(path="/polyglot")
@CrossOrigin

public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/getGame")
    public ResponseEntity<Object> getGame(@RequestBody GameRequest gameRequest) {
        List<GameDto>  gameDto = gameService.createGame(gameRequest);

        Map<String, Object> response = new HashMap<>();

        switch(gameRequest.getModuleId()) {
            case MODULE_LEARNING_1, MODULE_LEARNING_2 ->
                    response.put("game_first", gameDto);
            case MODULE_LEARNING_3, MODULE_LEARNING_4 ->
                    response.put("game_second", gameDto);
            case MODULE_LEARNING_5, MODULE_LEARNING_6 ->
                    response.put("game_third", gameDto);
        }

        return ResponseEntity.ok(response);
    }
}
