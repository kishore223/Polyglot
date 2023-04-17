package team4.slupolyglot.model;

import java.util.Arrays;

public class SyllableCounter {    
     public static int countSyllables(String word) {
        //These verbs are basically 3 syllables not 2
        String[] specialVerbs = {
            "kuanza", "kuomba", "kuitwa", "kuishi", "kukaa",
            "kutoa", "kuuza", "kuosha", "kuacha", "kuanda",
            "kujua", "kuzoea", "kuamka", "kuvaa", "kuimba",
            "kuumwa", "kulia", "kuiba", "kuamua", "kuongea",
            "kuonja", "kuli","kuandika","kujibu"
        };
        int syllables = 0;
        boolean prevVowel = false;
        for (int i = 0; i < word.length(); i++) {
            boolean isVowel = isVowel(word.charAt(i));
            if (isVowel && !prevVowel) {
                syllables++;
            }
            prevVowel = isVowel;
        }
        if (word.endsWith("e")) {
            syllables--;
        }
        if (syllables == 0) {
            syllables = 1;
        }
        if (Arrays.asList(specialVerbs).contains(word)) {
            //If a verb is from special verbs it has 3 syllables
            syllables = 3;
        }
            return syllables;
        } 
        
        private static boolean isVowel(char c) {
            return "aeiouAEIOU".indexOf(c) != -1;
        }
    }
