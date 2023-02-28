package team4.slupolyglot.controller.request;

public class GameRequest {

    private String languageId;
    private int moduleId;

    public GameRequest(String languageId, int moduleId) {
        this.languageId = languageId;
        this.moduleId = moduleId;
    }

    public GameRequest(){

    }
    public String getLanguageId() {
        return languageId;
    }

    public int getModuleId() {
        return moduleId;
    }
}
