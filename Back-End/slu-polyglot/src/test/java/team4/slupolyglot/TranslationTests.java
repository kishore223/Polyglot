package team4.slupolyglot;

import org.junit.Test;
import team4.slupolyglot.model.EnglishItalianTranslation;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import static org.junit.Assert.assertEquals;
public class TranslationTests {

    @Test
    public void testTranslationItalianPresenteIndicativo() throws Exception {
        File projectDir = new File(System.getProperty("user.dir"));
        File file = new File(projectDir, "./test_presenteIndicativo.tsv");

        BufferedReader reader =
                new BufferedReader(new FileReader(file));
        String line;
        while ((line = reader.readLine()) != null) {
            String[] values = line.split("\t");

            String feature =  values[0];
            String enVerb = values[1];
            String itVerb = values[2];
            System.out.println(feature+ " " + enVerb + " "+ itVerb);


/*            EnglishItalianTranslation englishItalianTranslation = new EnglishItalianTranslation();
            String result = englishItalianTranslation.translateTest(itVerb,feature);
            System.out.println(feature+ " " + itVerb + " "+ result);
            assertEquals(itVerb, result);*/
        }
        reader.close();

    }
}
