package team4.slupolyglot.dto;

public class GameDto {

    private int id;
    private String englishVerb;
    private String translatedVerb;

    private String urlImage;

    public GameDto(int id, String englishVerb, String translatedVerb,
                   String urlImage) {
        this.id = id;
        this.englishVerb = englishVerb;
        this.translatedVerb = translatedVerb;
        this.urlImage = urlImage;
    }

    public int getId() {
        return id;
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
