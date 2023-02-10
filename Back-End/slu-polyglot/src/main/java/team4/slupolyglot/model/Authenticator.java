package team4.slupolyglot.model;

public class Authenticator {


    public boolean playerDetailsValidator(RequestJson requestJson, Player player)
    {
        boolean flag = false;

        if(requestJson.getName().equals(player.getEmail()) && requestJson.getPassword().equals(player.getPassWord()))
        {
            flag = true;
        }

        return flag;
    }

    



}
