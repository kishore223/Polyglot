package team4.slupolyglot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import team4.slupolyglot.model.Authenticator;
import team4.slupolyglot.model.RequestJsonSignUpMapping;
import team4.slupolyglot.model.RequestJsonSignInMapping;
import team4.slupolyglot.model.ResponseJson;
import team4.slupolyglot.model.Player;
import team4.slupolyglot.model.PlayerRepository; 
import org.springframework.beans.factory.annotation.Autowired;

@CrossOrigin
@RestController
@RequestMapping(path="/polyglot/player")
public class Controller {
    @Autowired 
    private PlayerRepository userRepository;
    
@PostMapping(path="/signIn")
public @ResponseBody ResponseJson signInPlayer(@RequestBody RequestJsonSignInMapping requestJsonSignIntMapping) 
{
    try{
            Player player;
            ResponseJson responseJson = new ResponseJson("10404","please check the login credentials" );
            player = userRepository.findByEmail(requestJsonSignIntMapping.getUserName());

            if(player != null)
            {
                Authenticator authenticator = new Authenticator();        
                if(authenticator.playerDetailsValidator(requestJsonSignIntMapping,player))
                {
                    responseJson = new ResponseJson("10200","Player sucessfully validated",player.getEmail(), player.getUserName(), player.getScore());
                }
            }
            return responseJson;
        }
    catch(Exception e)
        {
            ResponseJson responseJson = new ResponseJson("10404",e.getMessage());
            return responseJson;
        }
}
  
@PostMapping(path = "/signUp")
public @ResponseBody ResponseJson createUser(@RequestBody RequestJsonSignUpMapping requestJsonSignUpMapping)
{
    try{
            ResponseJson responseJson = new ResponseJson("10404","user already exsists" );
            if(userRepository.findByEmail(requestJsonSignUpMapping.getEmail()) == null)
            {
                userRepository.save(new Player(requestJsonSignUpMapping.getEmail(),requestJsonSignUpMapping.getName(),"0",requestJsonSignUpMapping.getPassword()));
                responseJson = new ResponseJson("10200","User sucessfully created",requestJsonSignUpMapping.getEmail(),requestJsonSignUpMapping.getName(),"0");
            }
            return responseJson;
        }
    catch (Exception e )
        {
            ResponseJson responseJson = new ResponseJson("10404",e.getMessage());
            return responseJson;
        }
}
}
