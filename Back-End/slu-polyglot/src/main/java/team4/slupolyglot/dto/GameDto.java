package team4.slupolyglot.dto;

import team4.slupolyglot.repositories.Translation;

public class GameDto {

    private int id;
    private String englishVerb;
    private String translatedVerb;

    private String urlImage;

    private String features;
    private String verb;
    private String conjugateEnglishVerb;
//module two
    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private Character answer;

    public GameDto(int id, String englishVerb, String translatedVerb,
                   String urlImage) {
        this.id = id;
        this.englishVerb = englishVerb;
        this.translatedVerb = translatedVerb;
        this.urlImage = urlImage;
    }
    public GameDto(String englishVerb,String translatedVerb,
                   String features,int id, String urlImage, String conjugateEnglishVerb,String verb) {
        this.id = id;
        this.englishVerb = englishVerb;
        this.translatedVerb = translatedVerb;
        this.features = features;
        this.urlImage = urlImage;
        this.conjugateEnglishVerb = conjugateEnglishVerb;
        this.verb = verb;
    }
    public GameDto(String englishVerb,String translatedVerb,
                   String features,int id, String urlImage) {
        this.id = id;
        this.englishVerb = englishVerb;
        this.translatedVerb = translatedVerb;
        this.features = features;
        this.urlImage = urlImage;
    }
    public GameDto(int id, String question, String optionA,
    String optionB,String optionC, String optionD,Character answer,String urlImage) {
        this.id = id;
        this.question = question;
        this.optionA = optionA;
        this.optionB = optionB;   
        this.optionC = optionC;
        this.optionD = optionD;  
        this.answer = answer;
        this.urlImage = urlImage;
    }
    public int getId() {
        return id;
    }

    public String getFeatures() {
        return features;
    }

    public String getEnglishVerb() {
        return englishVerb;
    }

    public String getTranslatedVerb() {
        return translatedVerb;
    }
    public String getUrlImage(){
        return urlImage;
    }

    public String getConjugateEnglishVerb() {
        return conjugateEnglishVerb;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getOptionA() {
        return optionA;
    }

    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }

    public String getOptionB() {
        return optionB;
    }

    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }

    public String getOptionC() {
        return optionC;
    }

    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }

    public String getOptionD() {
        return optionD;
    }

    public void setOptionD(String optionD) {
        this.optionD = optionD;
    }

    public Character getAnswer() {
        return answer;
    }

    public void setAnswer(Character answer) {
        this.answer = answer;
    }

    public String getVerb() {
        return verb;
    }

}
