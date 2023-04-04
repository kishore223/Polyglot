package team4.slupolyglot.model;

public class SyllableCounter {
    public static int countSyllables(String word) {
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
        return syllables;
    }
    
    private static boolean isVowel(char c) {
        return "aeiouAEIOU".indexOf(c) != -1;
    }
    
}
