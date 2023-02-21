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
        put("10200", "Player sucessfully validated");
        put("10404", "please check the login credentials");
        put("10409", "user already exsists");
        put("10201", "Player sucessfully validated");
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
            ("10404",
            responseValuesMap.get("10404")); 
            Authenticator authenticator = new Authenticator();
            // Validating user details in Authenticator class
            if(player != null && authenticator.playerDetailsValidator
            (signInRequestJson,player)){               
                responseJson = new ResponseJson
                ("10200",
                responseValuesMap.get("10200"),
                player.getEmail(),
                player.getUserName(),
                player.getScore());
            }
            return responseJson;
        }
        catch(Exception e){   
            ResponseJson responseJson = new ResponseJson
            (responseValuesMap.get("10404"),
            e.getMessage());
            return responseJson;
        }
    }
  
    @PostMapping(path = "/signUp")
    public @ResponseBody ResponseJson createUser
    (@RequestBody SignUpRequestJson signUpRequestJson){
        try{     
            ResponseJson responseJson = new ResponseJson
            ("10409",
            responseValuesMap.get("10409"));       
            if(userRepo.findByEmail(signUpRequestJson.getEmail()) == null){
                //Creating a new user if the user details not available
                userRepo.save(new Player(signUpRequestJson.getEmail(),
                signUpRequestJson.getName(),"0",
                signUpRequestJson.getPassword()));
                responseJson = new ResponseJson
                ("10201",
                responseValuesMap.get("10201"),
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
            (responseValuesMap.get("10404"),
            e.getMessage());
            return responseJson;
        }
    }
}