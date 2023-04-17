package team4.slupolyglot;

import org.junit.Test;
import org.springframework.core.io.ClassPathResource;
import team4.slupolyglot.model.EnglishItalianTranslation;
import team4.slupolyglot.model.Verb;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import static org.junit.Assert.assertEquals;

public class ItalianTranslationTests {

    @Test
    public void testTranslationItalianPresenteIndicativo() throws Exception {
        ClassPathResource resource = new ClassPathResource("test_presenteIndicativo.tsv");

        BufferedReader reader =
                new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
        String line;
        while ((line = reader.readLine()) != null) {
            String[] values = line.split("\t");

            String feature =  values[0];
            String itVerb = values[2];
            String itVerbInfinito = values[3];

            String[] splitFeature = feature.split("\\+");

            Verb verb = new Verb();
            verb.setItalianVerb(itVerbInfinito);
            verb.setEnglishVerb(splitFeature[2]);

            EnglishItalianTranslation englishItalianTranslation = new EnglishItalianTranslation();
            String result = englishItalianTranslation.translate(verb, feature);

            System.out.println(feature+ " " + itVerb + " "+ result);
            assertEquals(itVerb, result);
        }
        reader.close();

    }
    @Test
    public void testTranslationPassatoProssimo() throws Exception {
        ClassPathResource resource = new ClassPathResource("test_passatoProssimo.tsv");

        BufferedReader reader =
                new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
        String line;
        while ((line = reader.readLine()) != null) {
            String[] values = line.split("\t");

            String feature =  values[0];
            String itVerb = values[2];
            String itVerbInfinito = values[3];
            System.out.println("infinito "+ itVerbInfinito);

            String[] splitFeature = feature.split("\\+");

            Verb verb = new Verb();
            verb.setItalianVerb(itVerbInfinito);
            verb.setEnglishVerb(splitFeature[2]);

            EnglishItalianTranslation englishItalianTranslation = new EnglishItalianTranslation();
            String result = englishItalianTranslation.translate(verb, feature);

            System.out.println(feature+ " " + itVerb + " "+ result);
            assertEquals(itVerb, result);
        }
        reader.close();

    }
    @Test
    public void testTranslationItalianImperfetto() throws Exception {
        ClassPathResource resource = new ClassPathResource("test_imperfetto.tsv");

        BufferedReader reader =
                new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
        String line;
        while ((line = reader.readLine()) != null) {
            String[] values = line.split("\t");

            String feature =  values[0];
            String itVerb = values[2];
            String itVerbInfinito = values[3];

            String[] splitFeature = feature.split("\\+");

            Verb verb = new Verb();
            verb.setItalianVerb(itVerbInfinito);
            verb.setEnglishVerb(splitFeature[2]);

            EnglishItalianTranslation englishItalianTranslation = new EnglishItalianTranslation();
            String result = englishItalianTranslation.translate(verb, feature);

            System.out.println(feature+ " " + itVerb + " "+ result);
            assertEquals(itVerb, result);
        }
        reader.close();

    }
    @Test
    public void testTranslationItalianFuturo() throws Exception {
        ClassPathResource resource = new ClassPathResource("test_futuro.tsv");

        BufferedReader reader =
                new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
        String line;
        while ((line = reader.readLine()) != null) {
            String[] values = line.split("\t");

            String feature =  values[0];
            String itVerb = values[2];
            String itVerbInfinito = values[3];

            String[] splitFeature = feature.split("\\+");

            Verb verb = new Verb();
            verb.setItalianVerb(itVerbInfinito);
            verb.setEnglishVerb(splitFeature[2]);

            EnglishItalianTranslation englishItalianTranslation = new EnglishItalianTranslation();
            String result = englishItalianTranslation.translate(verb, feature);

            System.out.println(feature+ " " + itVerb + " "+ result);
            assertEquals(itVerb, result);
        }
        reader.close();

    }
}
