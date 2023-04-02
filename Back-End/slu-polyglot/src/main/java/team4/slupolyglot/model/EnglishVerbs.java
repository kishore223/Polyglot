package team4.slupolyglot.model;

import java.util.HashMap;
import java.util.Map;

import static team4.slupolyglot.MyConstants.*;

public class EnglishVerbs {

    private String verb;
    private String conjugatedVerb;
    private String pronoun;

    private String tense;
    public final static String[] ENGLISH_PRONOUNS = {"I","You","(s)he","We","You","They"};
    Map<String, String> pronouns = new HashMap(){{
        put(GENERAL_PRONOUNS[0],ENGLISH_PRONOUNS[0]);
        put(GENERAL_PRONOUNS[1],ENGLISH_PRONOUNS[1]);
        put(GENERAL_PRONOUNS[2],ENGLISH_PRONOUNS[2]);
        put(GENERAL_PRONOUNS[3],ENGLISH_PRONOUNS[3]);
        put(GENERAL_PRONOUNS[4],ENGLISH_PRONOUNS[4]);
        put(GENERAL_PRONOUNS[5],ENGLISH_PRONOUNS[5]);
    }};

    public EnglishVerbs(String verb, String tense, String pronoun) {
        this.verb = verb;
        this.tense = tense;
        this.pronoun = pronoun;
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
        }
        return null;
    }

    private String present() {
        if (pronouns.get(pronoun).equals(ENGLISH_PRONOUNS[2]))
            return (ENGLISH_PRONOUNS[2] + " " + this.verb+"s");

        for (String englishPronoun : ENGLISH_PRONOUNS) {
            if (pronouns.get(pronoun).equals(englishPronoun))
                return (englishPronoun + " " + this.verb);
        }

        return null;
    }
    private String past(){
        for (String englishPronoun : ENGLISH_PRONOUNS) {
            if (pronouns.get(pronoun).equals(englishPronoun))
                return (englishPronoun + " " + this.verb+"ed");
        }
        return null;
    }
    private String future(){
        for (String englishPronoun : ENGLISH_PRONOUNS) {
            if (pronouns.get(pronoun).equals(englishPronoun))
                return (englishPronoun + " will "+ this.verb);
        }
        return null;
    }

    public String getConjugatedVerb() {
        return conjugatedVerb;
    }
}
