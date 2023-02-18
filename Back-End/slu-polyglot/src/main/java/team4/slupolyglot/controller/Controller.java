package team4.slupolyglot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import team4.slupolyglot.model.Authenticator;
import team4.slupolyglot.model.SignUpRequestJson;
import team4.slupolyglot.model.SignInRequestJson;
import team4.slupolyglot.model.Player;
import team4.slupolyglot.model.ResponseJson;
import team4.slupolyglot.model.PlayerRepository; 
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping(path="/polyglot/player")

public class Controller 
{
    //Defining all response attributes
    private ResponseJson responseJson;
    private Map<String, String> responseValuesMap = new HashMap<String, String>(){{
        put("successCode", "10200");
        put("failureCode", "10404");
        put("signInFailureMsg", "please check the login credentials");
        put("signUpFailureMsg", "user already exsists");
        put("signInSuccessMsg", "Player sucessfully validated");
        put("signUpSuccessMsg", "User sucessfully created");
        put("DefaultScore","0");
    }};

    @Autowired
    private PlayerRepository userRepo;
    
    @PostMapping(path="/signIn")
    public @ResponseBody ResponseJson signInPlayer
    (@RequestBody SignInRequestJson signInRequestJson){
        try{
            Player player;
            player = userRepo.findByEmail(signInRequestJson.getUserName());
            responseJson = new ResponseJson
            (responseValuesMap.get("failureCode"),
            responseValuesMap.get("signInFailureMsg")); 
            Authenticator authenticator = new Authenticator();
            // Validating user details in Authenticator class
            if(player != null && authenticator.playerDetailsValidator
            (signInRequestJson,player)){               
                responseJson = new ResponseJson
                (responseValuesMap.get("successCode"),
                responseValuesMap.get("signInSuccessMsg"),
                player.getEmail(),
                player.getUserName(),
                player.getScore());
            }
            return responseJson;
        }
        catch(Exception e){   
            ResponseJson responseJson = new ResponseJson
            (responseValuesMap.get("failureCode"),
            e.getMessage());
            return responseJson;
        }
    }
  
    @PostMapping(path = "/signUp")
    public @ResponseBody ResponseJson createUser
    (@RequestBody SignUpRequestJson signUpRequestJson){
        try{     
            ResponseJson responseJson = new ResponseJson
            (responseValuesMap.get("failureCode"),
            responseValuesMap.get("signUpFailureMsg"));       
            if(userRepo.findByEmail(signUpRequestJson.getEmail()) == null){
                //Creating a new user if the user details not available
                userRepo.save(new Player(signUpRequestJson.getEmail(),
                signUpRequestJson.getName(),"0",
                signUpRequestJson.getPassword()));
                responseJson = new ResponseJson
                (responseValuesMap.get("successCode"),
                responseValuesMap.get("signUpSuccessMsg"),
                signUpRequestJson.getEmail(),
                signUpRequestJson.getName(),
                responseValuesMap.get("DefaultScore")
                );
            }
            return responseJson;
        }
        catch (Exception e )
        {   
            ResponseJson responseJson = new ResponseJson
            (responseValuesMap.get("failureCode"),
            e.getMessage());
            return responseJson;
        }
    }
}