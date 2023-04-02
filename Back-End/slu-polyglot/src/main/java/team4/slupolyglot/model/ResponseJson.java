package team4.slupolyglot.model;

import java.math.BigDecimal;

public class ResponseJson 
{
    private String email;
    private String name;
    private BigDecimal score;
    private String errorCode;
    private String errorMessage;
    
    public ResponseJson(String errorCode,String errorMessage){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
    public ResponseJson(String errorCode,
    String errorMessage,String email, String name, BigDecimal score){
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.email = email;
        this.name = name;
        this.score = score;
    }
    public String getErrorCode() {
        return errorCode;
    }
    public String getErrorMessage() {
        return errorMessage;
    }
    public String getEmail() {
        return email;
    }
    public String getName() {
        return name;
    }
    public BigDecimal getScore() {
        return score;
    }
}