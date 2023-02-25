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
import team4.slupolyglot.model.LanguagesRepository;
import team4.slupolyglot.model.SignUpRequestJson;
import team4.slupolyglot.model.SignInRequestJson;
import team4.slupolyglot.model.Player;
import team4.slupolyglot.model.ResponseJson;
import team4.slupolyglot.model.PlayerRepository; 
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
    public static final String 
    SIGN_IN_SUCCESS_DESCRIPTION = "Player sucessfully validated";
    public static final String 
    SIGN_IN_FAILURE_DESCRIPTION = "Please check the login credentials";
    public static final String 
    SIGN_UP_SUCCESS_DESCRIPTION = "User sucessfully Created";
    public static final String 
    SIGN_UP_FAILURE_DESCRIPTION = "User already exsists";
    public static final int DEFAULT_SCORE = 0;
    private Map<String, String> responseValuesMap = new HashMap<String, String>(){{
        put(SIGN_IN_SUCCESS_CODE, SIGN_IN_SUCCESS_DESCRIPTION);
        put(SIGN_IN_FAILURE_CODE, SIGN_IN_FAILURE_DESCRIPTION);
        put(SIGN_UP_SUCCESS_CODE, SIGN_UP_SUCCESS_DESCRIPTION);
        put(SIGN_UP_FAILURE_CODE, SIGN_UP_FAILURE_DESCRIPTION);
    }};

    @Autowired
    private PlayerRepository userRepo;
    @Autowired
    private LanguagesRepository languagesRepository;
    
    @PostMapping(path="/player/signIn")
    public @ResponseBody ResponseJson signInPlayer
    (@RequestBody SignInRequestJson signInRequestJson){
        try{
            Player player;
            player = userRepo.findByEmail(signInRequestJson.getUserName());
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
            if(userRepo.findByEmail(signUpRequestJson.getEmail()) == null){
                //Creating a new user if the user details not available
                userRepo.save(new Player(signUpRequestJson.getEmail(),
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
    public Map<String,List<Map<String, String>>> getAllLanguages() {
        try {
            Iterable<Languages> languages = 
            languagesRepository.findAll();
            Map<String, List<Map<String, String>>> output = 
            new HashMap<String, List<Map<String, String>>>();
            List<Map<String, String>> languageResponseList = 
            new ArrayList<>();
            for (Languages language : languages) {
                Map<String, String> languageResponse = 
                new HashMap<String, String>();
                languageResponse.put
                ("languageName",language.getName());
                languageResponse.put("languageCode",
                Integer.toString(BASE_LANGUAGE_CODE + Integer.parseInt(language.getId())));
                languageResponseList.add(languageResponse);
            }
            output.put("languages", languageResponseList);
            return output;
            } catch (Exception e) {
            //returning empty response in case of error
            Map<String, List<Map<String, String>>> output =
            new HashMap<String, List<Map<String, String>>>();
            List<Map<String, String>> languageResponseList = 
            new ArrayList<>();
            output.put("languages", languageResponseList);
            return output;
        }
    }
}