package team4.slupolyglot.model;

import team4.slupolyglot.controller.request.SignInRequestJson;

public class Authenticator {

    public boolean playerDetailsValidator
    (SignInRequestJson signInRequestJson, Player player){
        boolean flag = false;
        if(signInRequestJson.getUserName().equals(player.getEmail()) &&
         signInRequestJson.getPassword().equals(player.getPassWord())){
            flag = true;
        }
        return flag;
    }
}
