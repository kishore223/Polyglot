package team4.slupolyglot;
import org.junit.Test;

import team4.slupolyglot.model.EnglishSwahiliTranslation;
import team4.slupolyglot.model.Verb;


import static org.junit.Assert.assertEquals;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class SwahiliTests {
    @Test
    public void testSwahiliTranslation() throws IOException {
    BufferedReader reader = new BufferedReader(new FileReader("C:\\Users\\sande\\Desktop\\PSD\\git_ultra_pro\\Polyglot\\Back-End\\slu-polyglot\\src\\test\\java\\team4\\slupolyglot\\resources\\testdist.tsv"));
    String line;
    while ((line = reader.readLine()) != null) {
        String[] columns = line.split("\t");
        String features = columns[0];
        //String englishTranslation = columns[1];
        String translatedSwahiliVerb = columns[2];
        String unTransulatedSwahiliVerb = features.substring(features.lastIndexOf("+") + 1);
        String featuresExtracted = features.substring(0, features.lastIndexOf("+"));
        Verb verb = new Verb(); 
        verb.setSwahiliVerb(unTransulatedSwahiliVerb);
        EnglishSwahiliTranslation e = new EnglishSwahiliTranslation();
        String result = e.translate(verb, featuresExtracted);
        result = result.split(" ")[1];
        assertEquals(translatedSwahiliVerb,result);
    }
    reader.close();
    }
}
