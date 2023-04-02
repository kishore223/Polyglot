package team4.slupolyglot.model;

import java.util.HashMap;
import java.util.Map;

import static team4.slupolyglot.MyConstants.*;

public class EnglishVerbs {

    private String verb;
    private String conjugatedVerb;
    private String pronoun;

    private String tense;
    private boolean isNegative = false;
    public final static String[] ENGLISH_PRONOUNS = {"I","You","(s)he","We","You","They"};
    HashMap<String, String> pronouns = new HashMap<>() {{
        put(GENERAL_PRONOUNS[0], ENGLISH_PRONOUNS[0]);
        put(GENERAL_PRONOUNS[1], ENGLISH_PRONOUNS[1]);
        put(GENERAL_PRONOUNS[2], ENGLISH_PRONOUNS[2]);
        put(GENERAL_PRONOUNS[3], ENGLISH_PRONOUNS[3]);
        put(GENERAL_PRONOUNS[4], ENGLISH_PRONOUNS[4]);
        put(GENERAL_PRONOUNS[5], ENGLISH_PRONOUNS[5]);
    }};

    public EnglishVerbs(String verb, String tense, String pronoun, boolean isNegative) {
        this.verb = verb;
        this.tense = tense;
        this.pronoun = pronoun;
        this.isNegative = isNegative;
        this.conjugatedVerb = setConjugatedVerbTense();
    }

    private String setConjugatedVerbTense() {
        switch (this.tense) {
            case PRESENT -> {
                return present();
            }
            case PAST -> {
                return past();
            }
            case FUTURE -> {
                return future();
            }
            case IMPERATIVE -> {
                return imperative();
            }
        }
        return null;
    }

    private String present() {
        String negation = isNegative ? " do not " : "";

        if (pronouns.get(pronoun).equals(ENGLISH_PRONOUNS[2]))
            return (ENGLISH_PRONOUNS[2] + negation + " " + this.verb+"s");

        for (String englishPronoun : ENGLISH_PRONOUNS) {
            if (pronouns.get(pronoun).equals(englishPronoun))
                return (englishPronoun + negation + " " + this.verb);
        }

        return null;
    }
    private String past(){
        String negation = isNegative ? " did not " : "";
        String pastEd = isNegative ? "" : "ed";

        for (String englishPronoun : ENGLISH_PRONOUNS) {
            if (pronouns.get(pronoun).equals(englishPronoun))
                return (englishPronoun  + negation + " " + this.verb+pastEd);
        }
        return null;
    }
    private String future(){
        String negation = isNegative ? " not " : "";

        for (String englishPronoun : ENGLISH_PRONOUNS) {
            if (pronouns.get(pronoun).equals(englishPronoun))
                return (englishPronoun  + " will "+ negation + this.verb);
        }
        return null;
    }
    private String imperative() { //todo complete
        String negation = isNegative ? " do not " : "";
        if(pronouns.get(pronoun).equals(ENGLISH_PRONOUNS[2]))
            throw new IllegalArgumentException("Invalid pronoun, cannot be 3s");

        for (String englishPronoun : ENGLISH_PRONOUNS) {
            if (pronouns.get(pronoun).equals(englishPronoun))
                return (englishPronoun + negation + " " + this.verb);
        }
        throw new IllegalArgumentException("Invalid pronoun");
    }

    public String getConjugatedVerb() {
        return conjugatedVerb;
    }
}
