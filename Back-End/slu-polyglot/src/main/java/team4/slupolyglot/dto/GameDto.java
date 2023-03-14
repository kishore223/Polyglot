package team4.slupolyglot.dto;

import team4.slupolyglot.repositories.Translation;

public class GameDto {

    private int id;
    private String englishVerb;
    private String translatedVerb;

    private String urlImage;

    private String features;

    public GameDto(int id, String englishVerb, String translatedVerb,
                   String urlImage) {
        this.id = id;
        this.englishVerb = englishVerb;
        this.translatedVerb = translatedVerb;
        this.urlImage = urlImage;
    }
    public GameDto(String englishVerb,String translatedVerb,
                   String features,int id, String urlImage) {
        this.id = id;
        this.englishVerb = englishVerb;
        this.translatedVerb = translatedVerb;
        this.features = features;
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
}
