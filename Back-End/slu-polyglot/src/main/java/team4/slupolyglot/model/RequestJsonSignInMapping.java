package team4.slupolyglot.model;

public class RequestJsonSignInMapping {

    private String userName;
    private String password;
    public String getUserName() {
        return userName;
    }
    public RequestJsonSignInMapping() {
    }
    public RequestJsonSignInMapping(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    

    
}
