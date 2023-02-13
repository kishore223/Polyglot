package team4.slupolyglot.model;

public class Authenticator {


    public boolean playerDetailsValidator(RequestJsonSignInMapping requestJsonSignInMapping, Player player)
    {
        boolean flag = false;

        if(requestJsonSignInMapping.getUserName().equals(player.getEmail()) && requestJsonSignInMapping.getPassword().equals(player.getPassWord()))
        {
            flag = true;
        }

        return flag;
    }

    



}
