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
import team4.slupolyglot.model.PlayerRepository; 
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping(path="/polyglot/player")

public class Controller 
{
    //Defining all response attributes
    private String failureCode = "10404";
    private String successCode = "10200";
    private String signInFailureMsg = "please check the login credentials";
    private String signUpFailureMsg = "user already exsists";
    private String signInSuccessMsg = "Player sucessfully validated";
    private String signUpSuccessMsg = "User sucessfully created";
    private Map<String, String> response;

    @Autowired
    private PlayerRepository userRepo;
    
    @PostMapping(path="/signIn")
    public @ResponseBody Map<String, String> signInPlayer
    (@RequestBody SignInRequestJson signInRequestJson){
        try{
            Player player;
            player = userRepo.findByEmail(signInRequestJson.getUserName());
            Authenticator authenticator = new Authenticator();
            // Validating user details in Authenticator class
            if(player != null && authenticator.playerDetailsValidator
            (signInRequestJson,player)){
                //Json structure mapping
                response = new HashMap<>();
                response.put("errorCode",successCode);
                response.put("errorMessage",signInSuccessMsg);
                response.put("email",player.getEmail());
                response.put("name",player.getUserName());
                response.put("score",player.getScore());
            }
            else{
                response = new HashMap<>();
                response.put("errorCode",failureCode);
                response.put("errorMessage",signInFailureMsg);
            }
            return response;
        }
        catch(Exception e)
        {   
            response = new HashMap<>();
            response.put("errorCode",failureCode);
            response.put("errorMessage",e.getMessage());
            return response;
        }
    }
  
    @PostMapping(path = "/signUp")
    public @ResponseBody Map<String, String> createUser
    (@RequestBody SignUpRequestJson signUpRequestJson){
        try{            
            if(userRepo.findByEmail(signUpRequestJson.getEmail()) == null){
                //Creating a new user if the user details not available
                userRepo.save(new Player(signUpRequestJson.getEmail(),
                signUpRequestJson.getName(),"0",
                signUpRequestJson.getPassword()));
                //Json structure mapping
                response = new HashMap<>();
                response.put("errorCode",successCode);
                response.put("errorMessage",signUpSuccessMsg);
                response.put("email",signUpRequestJson.getEmail());
                response.put("name",signUpRequestJson.getName());
                response.put("score","0");
            }
            else{
                response = new HashMap<>();
                response.put("errorCode",failureCode);
                response.put("errorMessage",signUpFailureMsg);
            }
            return response;
        }
        catch (Exception e )
        {   
            response = new HashMap<>();
            response.put("errorCode",failureCode);
            response.put("errorMessage",e.getMessage());
            return response;
        }
    }
}