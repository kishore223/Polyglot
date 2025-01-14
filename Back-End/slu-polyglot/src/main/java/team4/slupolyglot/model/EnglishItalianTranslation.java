package team4.slupolyglot.model;

import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import team4.slupolyglot.repositories.Translation;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import static team4.slupolyglot.MyConstants.*;

public class EnglishItalianTranslation implements Translation {

    private final String[] ITALIAN_PRONOUNS = {"Io","Tu","Lui/Lei","Noi","Voi","Loro"};
    private final static String PRIMA_CONIUGAZIONE = "are";
    private final static String SECONDA_CONIUGAZIONE = "ere";
    private final static String TERZA_CONIUGAZIONE = "ire";

    private boolean isCareGare = false;
    private boolean  isCiareGiare = false;
    private boolean isNegative = false;

    private static final String IRE_PRESENTE_INDICATIVO = "IRE_PRESENTE_INDICATIVO";
    private static final String ESSERE_PASSATO_PROSSIMO = "ESSERE_PASSATO_PROSSIMO";


    Map<String, String> pronouns = new HashMap(){{
        put(GENERAL_PRONOUNS[0],ITALIAN_PRONOUNS[0]);
        put(GENERAL_PRONOUNS[1],ITALIAN_PRONOUNS[1]);
        put(GENERAL_PRONOUNS[2],ITALIAN_PRONOUNS[2]);
        put(GENERAL_PRONOUNS[3],ITALIAN_PRONOUNS[3]);
        put(GENERAL_PRONOUNS[4],ITALIAN_PRONOUNS[4]);
        put(GENERAL_PRONOUNS[5],ITALIAN_PRONOUNS[5]);
    }};

    private void checkIrregularities(String verb) {
        int verbLen = verb.length();
        if(verbLen > 5 && ( verb.substring(verbLen-5).equals("giare") ||
                verb.substring(verbLen-5).equals("ciare")))
            isCiareGiare = true;
        else if(verbLen > 4 && ( verb.substring(verbLen-4).equals("care") ||
                verb.substring(verbLen-4).equals("gare")))
            isCareGare = true;
    }

    private String presenteIndicativo(String root, String infinito, String pronoun) throws IOException {

        if(findIrregularities(root+infinito,IRE_PRESENTE_INDICATIVO))
            root = root+"isc";

        switch (infinito) {
            case PRIMA_CONIUGAZIONE -> {
                if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[0]))
                    return(ITALIAN_PRONOUNS[0] + " " + root + "o");

                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[1])){
                    if(!isCiareGiare && !isCareGare)
                        return(ITALIAN_PRONOUNS[1] + " " + root + "i");
                    else if(isCiareGiare)
                        return(ITALIAN_PRONOUNS[1] + " " + root);
                    else
                        return(ITALIAN_PRONOUNS[1] + " " + root + "hi");
                }
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[2])) {
                    return(ITALIAN_PRONOUNS[2] + " " + root + "a");
                }
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[3])) {
                    if(!isCiareGiare && !isCareGare)
                        return(ITALIAN_PRONOUNS[3] + " " + root + "iamo");
                    else if(isCiareGiare)
                        return(ITALIAN_PRONOUNS[3] + " " + root + "amo");
                    else
                        return(ITALIAN_PRONOUNS[3] + " " + root + "hiamo");
                }
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[4])) {
                    return(ITALIAN_PRONOUNS[4] + " " + root + "ate");
                }
                else
                    return(ITALIAN_PRONOUNS[5] + " " + root + "ano");
            }
            case SECONDA_CONIUGAZIONE -> {
                if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[0]))
                    return(ITALIAN_PRONOUNS[0] + " " + root + "o");
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[1]))
                    return(ITALIAN_PRONOUNS[1] + " " + root + "i");
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[2]))
                    return(ITALIAN_PRONOUNS[2] + " " + root + "e");
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[3]))
                    return(ITALIAN_PRONOUNS[3] + " " + root + "iamo");
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[4]))
                    return(ITALIAN_PRONOUNS[4] + " " + root + "ete");
                else
                    return(ITALIAN_PRONOUNS[5] + " " + root + "ono");
            }
            case TERZA_CONIUGAZIONE -> {
                if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[0]))
                    return(ITALIAN_PRONOUNS[0] + " " + root + "o");
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[1]))
                    return(ITALIAN_PRONOUNS[1] + " " + root + "i");
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[2]))
                    return(ITALIAN_PRONOUNS[2] + " " + root + "e");
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[3]))
                    return(ITALIAN_PRONOUNS[3] + " " + root + "iamo");
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[4]))
                    return(ITALIAN_PRONOUNS[4] + " " + root + "ite");
                else
                    return(ITALIAN_PRONOUNS[5] + " " + root + "ono");
            }
            default -> {
                return null;
            }
        }
    }

    @PostConstruct
    private boolean findIrregularities(String verb, String kindOfIrregularity) throws IOException {
        ClassPathResource resource = null;

        if(kindOfIrregularity.equals(IRE_PRESENTE_INDICATIVO))
            resource = new ClassPathResource("irregular_ire.txt");
        else if(kindOfIrregularity.equals(ESSERE_PASSATO_PROSSIMO))
            resource = new ClassPathResource("verb_ausiliare_essere.txt");


        BufferedReader reader =
                new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
        String line;

        while ((line = reader.readLine()) != null) {
            if(line.equals(verb))
                return true;
        }

        return false;
    }
    private String passatoProssimo(String root, String infinito, String pronoun) throws IOException {
        String passatoProssimo = null;
        String[] essere = {"sono","sei","è","siamo", "siete","sono"};
        String[] avere = {"ho","hai","ha","abbiamo","avete","hanno"};
        String[] avereEssere = findIrregularities(root+infinito,ESSERE_PASSATO_PROSSIMO) ? essere : avere;

        switch (infinito) {
            case PRIMA_CONIUGAZIONE ->
                    passatoProssimo = root + "ato";

            case SECONDA_CONIUGAZIONE ->
                    passatoProssimo = root + "uto";

            case TERZA_CONIUGAZIONE ->
                    passatoProssimo = root + "ito";
        }

        for(int i = 0; i < ITALIAN_PRONOUNS.length; i++){
            if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[i]))
                return(ITALIAN_PRONOUNS[i] + " " + avereEssere[i] + " " + passatoProssimo);
        }

        return null;
    }

    private String futuroSemplice(String root, String infinito, String pronoun) {
        String futuro = null;
        switch (infinito) {
            case PRIMA_CONIUGAZIONE, SECONDA_CONIUGAZIONE -> {
                if(isCiareGiare)
                    root = root.substring(0,root.length()-1);
                else if(isCareGare)
                    root = root + "h";
                futuro = root + "erò";
                if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[0]))
                    return(ITALIAN_PRONOUNS[0] + " " + futuro);
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[1]))
                    return(ITALIAN_PRONOUNS[1] + " " + root + "erai");
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[2]))
                    return(ITALIAN_PRONOUNS[2] + " " + root + "erà");
            }

            case TERZA_CONIUGAZIONE -> {
                futuro = root + "irò";
                if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[0]))
                    return(ITALIAN_PRONOUNS[0] + " " + futuro);
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[1]))
                    return(ITALIAN_PRONOUNS[1] + " " + root + "irai");
                else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[2]))
                    return(ITALIAN_PRONOUNS[2] + " " + root + "irà");
            }
        }

        String subFuturo = futuro.substring(0,futuro.length()-1);

        if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[3]))
            return(ITALIAN_PRONOUNS[3] + " " + subFuturo + "emo");
        else if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[4]))
            return(ITALIAN_PRONOUNS[4] + " " + subFuturo + "ete");
        else
            return(ITALIAN_PRONOUNS[5] + " " + subFuturo + "anno");
    }
    public String imperfettoIndicativo(String root, String infinito, String pronoun) {
        String root_desinenza = root+infinito.charAt(0);

        String[] coniugazioni = {"vo", "vi", "va", "vamo", "vate", "vano"};

        for(int i = 0; i < ITALIAN_PRONOUNS.length; i++) {
            if(pronouns.get(pronoun).equals(ITALIAN_PRONOUNS[i]))
                return(ITALIAN_PRONOUNS[i] + " " + root_desinenza + coniugazioni[i]);
        }
        return null;
    }

    private static String[] takeRootAndInfinito(String verb) {
        int strLen = verb.length();
        String root = verb.toLowerCase().substring(0, strLen - 3);
        String infinito = verb.toLowerCase().substring(strLen - 3, strLen);

        String[] rootAndInfinito = {root,infinito};

        return rootAndInfinito;
    }
    private boolean validateVerb(String verb) {

        String lowerVerb = verb.toLowerCase(Locale.ROOT);
        int strLen = lowerVerb.length();
        if(strLen <= 3)
            throw new IllegalArgumentException("This verb is an invalid one : too short");

        String coniugazione = lowerVerb.substring(strLen - 3);
        if(coniugazione.equals(PRIMA_CONIUGAZIONE) || coniugazione.equals(SECONDA_CONIUGAZIONE)
                || coniugazione.equals(TERZA_CONIUGAZIONE)) {
            checkIrregularities(verb);
            return true;
        } else
            throw new IllegalArgumentException("This verb is an invalid one : does not contains coniugazione");
    }
    private boolean validateFeatures(String features){
        String[] splitFeature = features.split("\\+");
        int featuresLen = splitFeature.length;

        return featuresLen == 3 || featuresLen == 4;
    }
    @Override
    public String translate(Verb verb, String features) {
        validateVerb(verb.getItalianVerb());
        features = features + "+" + verb.getEnglishVerb();

        if(!validateFeatures(features))
            throw new  IllegalArgumentException("error features");

        String[] splitFeature = features.split("\\+");
        int featuresLen = splitFeature.length;

        int index = featuresLen == 3 ? 0 : 1;
        isNegative = featuresLen != 3;
        String pronoun = splitFeature[index];
        String tense = splitFeature[index+1];
        String enVerb = splitFeature[index+2];

        String infinito = takeRootAndInfinito(verb.getItalianVerb())[1];
        String root = takeRootAndInfinito(verb.getItalianVerb())[0];

        switch (tense){
            case PRESENT -> {
                try {
                    return presenteIndicativo(root,infinito,pronoun);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            case FUTURE -> {
                return futuroSemplice(root,infinito,pronoun);
            }
            case PREFECT -> {
                try {
                    return passatoProssimo(root,infinito,pronoun);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            case PAST -> {
                return imperfettoIndicativo(root,infinito,pronoun);
            }
        }

        return null;
    }
}
