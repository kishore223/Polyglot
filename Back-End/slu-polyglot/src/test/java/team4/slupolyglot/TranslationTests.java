package team4.slupolyglot;

import org.junit.Test;
import org.springframework.core.io.ClassPathResource;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class TranslationTests {

    @Test
    public void testTranslationItalianPresenteIndicativo() throws Exception {
        ClassPathResource resource = new ClassPathResource("test_presenteIndicativo.tsv");

        BufferedReader reader =
                new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
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
