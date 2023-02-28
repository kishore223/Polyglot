package team4.slupolyglot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import team4.slupolyglot.model.Authenticator;
import team4.slupolyglot.model.Languages;
import team4.slupolyglot.repositories.LanguagesRepository;
import team4.slupolyglot.repositories.ScoresRepository;
import team4.slupolyglot.services.PlayerService;
import team4.slupolyglot.controller.request.SignUpRequestJson;
import team4.slupolyglot.controller.request.SignInRequestJson;
import team4.slupolyglot.controller.request.PlayerLanguageRequestJson;
import team4.slupolyglot.model.Player;
import team4.slupolyglot.model.ResponseJson;
import team4.slupolyglot.model.Scores;
import team4.slupolyglot.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping(path="/polyglot")

public class Controller
{
    //Defining all response attributes
    private ResponseJson responseJson;
    public static final String SIGN_IN_SUCCESS_CODE = "10200";
    public static final String SIGN_IN_FAILURE_CODE = "10404";
    public static final String SIGN_UP_SUCCESS_CODE = "10201";
    public static final String SIGN_UP_FAILURE_CODE = "10409";
    public static final int BASE_LANGUAGE_CODE = 2000;
    public static final String SCORE = "Score";
    public static final String
    SIGN_IN_SUCCESS_DESCRIPTION = "Player sucessfully validated";
    public static final String
    SIGN_IN_FAILURE_DESCRIPTION = "Please check the login credentials";
    public static final String
    SIGN_UP_SUCCESS_DESCRIPTION = "User sucessfully Created";
    public static final String
    SIGN_UP_FAILURE_DESCRIPTION = "User already exsists";
    public static final String
    ASSIGN_PLAYER_SUCCESS_DESCRIPTION = "language Selected Successfully";
    public static final int DEFAULT_SCORE = 0;
    public static final String REGISTERED_LANGUAGES =
    "RegisteredLanguages";
    private Map<String, String> responseValuesMap = new HashMap<String, String>(){{
        put(SIGN_IN_SUCCESS_CODE, SIGN_IN_SUCCESS_DESCRIPTION);
        put(SIGN_IN_FAILURE_CODE, SIGN_IN_FAILURE_DESCRIPTION);
        put(SIGN_UP_SUCCESS_CODE, SIGN_UP_SUCCESS_DESCRIPTION);
        put(SIGN_UP_FAILURE_CODE, SIGN_UP_FAILURE_DESCRIPTION);
    }};

    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private LanguagesRepository languagesRepository;
    @Autowired
    private PlayerService playerService;
    @Autowired
    private ScoresRepository scoresRepository;

    @PostMapping(path="/player/signIn")
    public @ResponseBody ResponseJson signInPlayer
    (@RequestBody SignInRequestJson signInRequestJson){
        try{
            Player player;
            player = playerRepository.findByEmail(signInRequestJson.getUserName());
            responseJson = new ResponseJson
            (SIGN_IN_FAILURE_CODE,
            responseValuesMap.get(SIGN_IN_FAILURE_CODE));
            Authenticator authenticator = new Authenticator();
            // Validating user details in Authenticator class
            if(player != null && authenticator.playerDetailsValidator
            (signInRequestJson,player)){
                responseJson = new ResponseJson
                (SIGN_IN_SUCCESS_CODE,
                responseValuesMap.get(SIGN_IN_SUCCESS_CODE),
                player.getEmail(),
                player.getUserName(),
                player.getScore());
            }
            return responseJson;
        }
        catch(Exception e){
            ResponseJson responseJson = new ResponseJson
            (responseValuesMap.get(SIGN_IN_FAILURE_CODE),
            e.getMessage());
            return responseJson;
        }
    }

    @PostMapping(path = "/player/signUp")
    public @ResponseBody ResponseJson createUser
    (@RequestBody SignUpRequestJson signUpRequestJson){
        try{
            ResponseJson responseJson = new ResponseJson
            (SIGN_UP_FAILURE_CODE,
            responseValuesMap.get(SIGN_UP_FAILURE_CODE));
            if(playerRepository.findByEmail(signUpRequestJson.getEmail()) == null){
                //Creating a new user if the user details not available
                playerRepository.save(new Player(signUpRequestJson.getEmail(),
                signUpRequestJson.getName(),Integer.toString(DEFAULT_SCORE),
                signUpRequestJson.getPassword()));
                responseJson = new ResponseJson
                (SIGN_UP_SUCCESS_CODE,
                responseValuesMap.get(SIGN_UP_SUCCESS_CODE),
                signUpRequestJson.getEmail(),
                signUpRequestJson.getName(),
                Integer.toString(DEFAULT_SCORE)
                );
            }
            return responseJson;
        }
        catch (Exception e ){
            ResponseJson responseJson = new ResponseJson
            (responseValuesMap.get(SIGN_UP_FAILURE_CODE),
            e.getMessage());
            return responseJson;
        }
    }

    @GetMapping(path="/getLanguages")
    public Map<String,List<Map<String,Object>>> getAllLanguages() {
        try {
            Iterable<Languages> languages =
            languagesRepository.findAll();
            Map<String, List<Map<String, Object>>> output =
            new HashMap<String, List<Map<String, Object>>>();
            List<Map<String, Object>> languageResponseList =
            new ArrayList<>();
            for (Languages language : languages) {
                Map<String, Object> languageResponse =
                new HashMap<String, Object>();
                languageResponse.put
                ("languageName",language.getName());
                languageResponse.put("languageCode",
                language.getId());
                languageResponseList.add(languageResponse);
            }
            output.put("languages", languageResponseList);
            return output;
            } catch (Exception e) {
            //returning empty response in case of error
            Map<String, List<Map<String, Object>>> output =
            new HashMap<String, List<Map<String, Object>>>();
            List<Map<String, Object>> languageResponseList =
            new ArrayList<>();
            output.put("languages", languageResponseList);
            return output;
        }
    }

    @PostMapping("/player/assignLanguage")
    public @ResponseBody ResponseJson assignLanguageToPlayer
    (@RequestBody  PlayerLanguageRequestJson playerLanguageRequestJson) {
        try{
            playerService.assignLanguageToPlayer
            (playerLanguageRequestJson.getEmail(),
            playerLanguageRequestJson.getLanguageId());
            ResponseJson responseJson = new ResponseJson
            (SIGN_UP_SUCCESS_CODE,ASSIGN_PLAYER_SUCCESS_DESCRIPTION);
            return responseJson;
        }catch(Exception e )
        {
            ResponseJson responseJson = new ResponseJson
            (SIGN_UP_FAILURE_CODE,e.getMessage());
            return responseJson;
        }
    }

    @PostMapping("/player/getLanguageScores")
    public Map<String, Object>
    getLanguageScores(@RequestBody PlayerLanguageRequestJson
    playerLanguageRequestJson){
        try{
            Player player = playerRepository.
            findByEmail(playerLanguageRequestJson.getEmail());
            Languages language = languagesRepository.
            findById(playerLanguageRequestJson.getLanguageId());
            List<Scores> scoresList = scoresRepository.
            findByPlayerAndLanguage(player,language);
            Map<String, Object> responseMap =
            new HashMap<String,Object>();
            for(Scores scoresElement: scoresList)
            {
                Map<String, Object> scoreMap =
                new HashMap<String,Object>();
                scoreMap.put
                (SCORE,
                String.valueOf(scoresElement.getScore()));
                responseMap.
                put(scoresElement.getModule().getName(), scoreMap);
            }
            return responseMap;
        }catch(Exception e){
            //returning empty response in case of error
            Map<String, Object> responseMap =
            new HashMap<String,Object>();
            return responseMap;
        }
    }

    @PostMapping("/player/updateModuleScore")
    public Map<String, Object>
    updateModuleScore(@RequestBody PlayerLanguageRequestJson
    playerLanguageRequestJson){
        try{
            playerService.updateScoreOfModule
            (playerLanguageRequestJson.getEmail(),
            playerLanguageRequestJson.getLanguageId(),
            playerLanguageRequestJson.getModuleId(),
            playerLanguageRequestJson.getNewScore());
            return getLanguageScores(playerLanguageRequestJson);
        }catch(Exception e){
            //returning empty response in case of error
            Map<String, Object> responseMap =
            new HashMap<String,Object>();
            responseMap.put(SIGN_UP_FAILURE_CODE,
            e.getMessage());
            return responseMap;
        }
    }

    @PostMapping("/player/getRegisteredLanguages")
    public Map<String, Object>
    getAssignedLanguages(@RequestBody PlayerLanguageRequestJson
    playerLanguageRequestJson){
        try{
            Player player = playerRepository.
            findByEmail(playerLanguageRequestJson.getEmail());
            List<Scores> scoresList = scoresRepository.
            findByPlayer(player);
            Map<String, Object> responseMap =
            new HashMap<String,Object>();
            List<Map<String, Object>> languagesJsonList
             = new ArrayList<>();
            for(Scores scoresElement: scoresList)
            {
                Map<String, Object> languagesMap =
                new HashMap<String,Object>();
                Languages language = scoresElement.getLanguage();
                languagesMap.put
                ("languageCode",language.getId());
                languagesMap.put
                ("languageName",language.getName());
                languagesJsonList.add(languagesMap);
            }
            //removing duplicates by using set
            Set<Map<String, Object>> set =
            new HashSet<>(languagesJsonList);
            List<Map<String, Object>> uniqueLanguagesList
             = new ArrayList<>(set);
            responseMap.put(REGISTERED_LANGUAGES,uniqueLanguagesList);
            return responseMap;
        }catch(Exception e){
            //returning empty response in case of error
            Map<String, Object> responseMap =
            new HashMap<String,Object>();
            List<Map<String, Object>> emptyList
             = new ArrayList<>();
            responseMap.put(REGISTERED_LANGUAGES,emptyList);
            return responseMap;
        }
    }
}
