package team4.slupolyglot.model;

public class SignInRequestJson {

    private String userName;
    private String password;
    
    public String getUserName() {
        return userName;
    }
    
    public SignInRequestJson() {
    }
    
    public SignInRequestJson(String userName, String password) {
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
