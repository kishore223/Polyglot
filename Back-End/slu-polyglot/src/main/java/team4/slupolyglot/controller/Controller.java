package team4.slupolyglot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import team4.slupolyglot.model.Authenticator;
import team4.slupolyglot.model.RequestJsonPostMapping;
import team4.slupolyglot.model.RequestJsonGetMapping;
import team4.slupolyglot.model.ResponseJson;
import team4.slupolyglot.model.Player;
import team4.slupolyglot.model.PlayerRepository; 
import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping(path="/polyglot/player")
public class Controller {
    @Autowired 
    private PlayerRepository userRepository;
    
@GetMapping(path="/signIn")
public @ResponseBody ResponseJson signInPlayer(@RequestBody RequestJsonGetMapping requestJsonGetMapping) 
{
    try{
            Player player;
            ResponseJson responseJson = new ResponseJson("10404","please check the login credentials" );
            player = userRepository.findByEmail(requestJsonGetMapping.getUserName());

            if(player != null)
            {
                Authenticator authenticator = new Authenticator();        
                if(authenticator.playerDetailsValidator(requestJsonGetMapping,player))
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
public @ResponseBody ResponseJson createUser(@RequestBody RequestJsonPostMapping requestJsonPostMapping)
{
    try{
            ResponseJson responseJson = new ResponseJson("10404","user already exsists" );
            if(userRepository.findByEmail(requestJsonPostMapping.getEmail()) == null)
            {
                userRepository.save(new Player(requestJsonPostMapping.getEmail(),requestJsonPostMapping.getName(),"0",requestJsonPostMapping.getPassword()));
                responseJson = new ResponseJson("10200","User sucessfully created",requestJsonPostMapping.getEmail(),requestJsonPostMapping.getName(),"0");
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
