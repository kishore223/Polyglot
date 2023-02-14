package team4.slupolyglot.model;

public class Authenticator {


    public boolean playerDetailsValidator(RequestJsonGetMapping requestJsonGetMapping, Player player)
    {
        boolean flag = false;

        if(requestJsonGetMapping.getUserName().equals(player.getEmail()) && requestJsonGetMapping.getPassword().equals(player.getPassWord()))
        {
            flag = true;
        }

        return flag;
    }

    



}
