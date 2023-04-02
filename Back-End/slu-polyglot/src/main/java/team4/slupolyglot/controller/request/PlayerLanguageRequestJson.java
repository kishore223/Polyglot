package team4.slupolyglot.controller.request;

import java.math.BigDecimal;

public class PlayerLanguageRequestJson {
    private String email;
    private int languageId;
    private int moduleId;
    private BigDecimal newScore;

    public PlayerLanguageRequestJson() {
    }

    public PlayerLanguageRequestJson(String email, int languageId) {
        this.email = email;
        this.languageId = languageId;
    }

    public PlayerLanguageRequestJson
    (String email, int languageId,int moduleId,BigDecimal newScore) {
        this.email = email;
        this.languageId = languageId;
        this.moduleId = moduleId;
        this.newScore = newScore;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getLanguageId() {
        return languageId;
    }

    public void setLanguageId(int languageId) {
        this.languageId = languageId;
    }

    public int getModuleId() {
        return moduleId;
    }

    public void setModuleId(int moduleId) {
        this.moduleId = moduleId;
    }

    public BigDecimal getNewScore() {
        return newScore;
    }

    public void setNewScore(BigDecimal newScore) {
        this.newScore = newScore;
    }
}
