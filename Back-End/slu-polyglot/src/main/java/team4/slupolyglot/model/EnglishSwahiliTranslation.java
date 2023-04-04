package team4.slupolyglot.model;

import team4.slupolyglot.repositories.Translation;

import java.util.HashMap;
import java.util.Locale;

import static team4.slupolyglot.MyConstants.*;

public class EnglishSwahiliTranslation implements Translation {

    private final String[] SWAHILI_PRONOUNS = {"ni", "u", "a", "tu", "m", "wa"};
    private final static String PRESENT_TENSE_JOINER = "na";
    private final static String FUTURE_TENSE_JOINER = "ta";
    private final static String PAST_TENSE_JOINER = "li";

    public HashMap<String, String> getPronouns() {
        return pronouns;
    }
    public void setPronouns(HashMap<String, String> pronouns) {
        this.pronouns = pronouns;
    }
    private HashMap<String, String> pronouns = new HashMap<>() {{
        put(GENERAL_PRONOUNS[0], SWAHILI_PRONOUNS[0]);
        put(GENERAL_PRONOUNS[1], SWAHILI_PRONOUNS[1]);
        put(GENERAL_PRONOUNS[2], SWAHILI_PRONOUNS[2]);
        put(GENERAL_PRONOUNS[3], SWAHILI_PRONOUNS[3]);
        put(GENERAL_PRONOUNS[4], SWAHILI_PRONOUNS[4]);
        put(GENERAL_PRONOUNS[5], SWAHILI_PRONOUNS[5]);
    }};

    private boolean validateSwahiliVerb(String verb) {
        String lowerVerb = verb.toLowerCase(Locale.ROOT);
        int strLen = lowerVerb.length();
        if(strLen <= 2)
            throw new IllegalArgumentException("This verb is invalid: too short");
        return true;
    }

    private boolean checkDiSyllables(String verb){
        verb = verb.toLowerCase(Locale.ROOT);
        boolean flag = false;
        int syllableCount = SyllableCounter.countSyllables(verb);
        if (syllableCount == 2) {
            flag = true;
        }
        return flag;
    }
    
    private boolean validateFeatures(String features){
        String[] splitFeature = features.split("\\+");
        int featuresLen = splitFeature.length;
        return featuresLen == 3 || featuresLen == 4;
    }

    @Override
    public String translate(Verb verb, String features) {
        validateSwahiliVerb(verb.getSwahiliVerb());
        features = features + "+" + verb.getEnglishVerb();
        if(!validateFeatures(features)){
            throw new  IllegalArgumentException("error features");
        }
        String[] splitFeature = features.split("\\+");
        int featuresLen = splitFeature.length;
        int index = featuresLen == 3 ? 0 : 1;
        //isNegative = featuresLen != 3;
        String pronoun = splitFeature[index];
        String tense = splitFeature[index+1];
        return this.computeTenses(pronoun, verb.getSwahiliVerb(), tense);
    }
    public String computeTenses(String person, String verb, String tense) {
        String root = verb;
        if(!this.checkDiSyllables(verb)){
            root = verb.substring(2);
        }
        String teneString = this.tenseJoiner(root, tense);
        String personString = this.personJoiner(teneString, person);
        return personString;
    }

    public String tenseJoiner(String root, String tense) {
        switch(tense) {
            case PRESENT:
                root = PRESENT_TENSE_JOINER + root;
                break;
            case FUTURE:
                root = FUTURE_TENSE_JOINER + root;
                break;
            case PAST:
                root = PAST_TENSE_JOINER + root;
                break;
        }
        return root;
    }
    
    public String personJoiner(String tensRoot, String person) {
        for (int i = 0; i < GENERAL_PRONOUNS.length; i++) {
            if (person.equals(GENERAL_PRONOUNS[i])) {
                tensRoot = SWAHILI_PRONOUNS[i] + tensRoot;
                break;
            }
        }
        return tensRoot;
    }
    
}
