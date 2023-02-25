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
    public static final String signInSuccessCode = "10200";
    public static final String signInFailureCode = "10404";
    public static final String signUpSuccessCode = "10201";
    public static final String signUpFailureCode = "10409";
    public static final String languageCodePrefix = "200";
    public static final String 
    signInSuccessDescription = "Player sucessfully validated";
    public static final String 
    signInFailureDescription = "Please check the login credentials";
    public static final String 
    signUpSuccessDescription = "User sucessfully Created";
    public static final String 
    signUpFailureDescription = "User already exsists";
    public static final String defaultScore = "0";
    private Map<String, String> responseValuesMap = new HashMap<String, String>(){{
        put(signInSuccessCode, signInSuccessDescription);
        put(signInFailureCode, signInFailureDescription);
        put(signUpSuccessCode, signUpSuccessDescription);
        put(signUpFailureCode, signUpFailureDescription);
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
            (signInFailureCode,
            responseValuesMap.get(signInFailureCode)); 
            Authenticator authenticator = new Authenticator();
            // Validating user details in Authenticator class
            if(player != null && authenticator.playerDetailsValidator
            (signInRequestJson,player)){               
                responseJson = new ResponseJson
                (signInSuccessCode,
                responseValuesMap.get(signInSuccessCode),
                player.getEmail(),
                player.getUserName(),
                player.getScore());
            }
            return responseJson;
        }
        catch(Exception e){   
            ResponseJson responseJson = new ResponseJson
            (responseValuesMap.get(signInFailureCode),
            e.getMessage());
            return responseJson;
        }
    }

    @PostMapping(path = "/player/signUp")
    public @ResponseBody ResponseJson createUser
    (@RequestBody SignUpRequestJson signUpRequestJson){
        try{     
            ResponseJson responseJson = new ResponseJson
            (signUpFailureCode,
            responseValuesMap.get(signUpFailureCode));       
            if(userRepo.findByEmail(signUpRequestJson.getEmail()) == null){
                //Creating a new user if the user details not available
                userRepo.save(new Player(signUpRequestJson.getEmail(),
                signUpRequestJson.getName(),"0",
                signUpRequestJson.getPassword()));
                responseJson = new ResponseJson
                (signUpSuccessCode,
                responseValuesMap.get(signUpSuccessCode),
                signUpRequestJson.getEmail(),
                signUpRequestJson.getName(),
                defaultScore
                );
            }
            return responseJson;
        }
        catch (Exception e ){   
            ResponseJson responseJson = new ResponseJson
            (responseValuesMap.get(signUpFailureCode),
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
                 languageCodePrefix + language.getId());
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