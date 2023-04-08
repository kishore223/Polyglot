package team4.slupolyglot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team4.slupolyglot.MyConstants;
import team4.slupolyglot.controller.request.GameRequest;
import team4.slupolyglot.dto.GameDto;
import team4.slupolyglot.model.EnglishItalianTranslation;
import team4.slupolyglot.model.EnglishSwahiliTranslation;
import team4.slupolyglot.model.EnglishVerbs;
import team4.slupolyglot.model.Verb;
import team4.slupolyglot.repositories.VerbRepository;

import java.util.*;

import static team4.slupolyglot.MyConstants.*;

@Service
public class GameService {

    @Autowired
    private VerbRepository verbRepository;
    private String[] tenses = {PRESENT, FUTURE, PAST}; // todo tecnical debt
    public static char[] optionsArray = {'A', 'B', 'C', 'D'};
    public static int numberOfLearningActivities = 3;
    public int numberOfOptions = 3;
    public List<GameDto> createGame(GameRequest gameRequest) {

        String languageId = gameRequest.getLanguageId();
        int moduleId = gameRequest.getModuleId();
        List<GameDto> gameDto = new ArrayList<>();
        List<Verb> verbs = verbRepository.findAll();
        Collections.shuffle(verbs);

        List<Verb> learningActivityOneList = verbs.subList(0, verbs.size()-1);
    
        switch(languageId){
            case MyConstants.ITALIAN :
                switch (moduleId) {
                    case MODULE_LEARNING_1-> {
                        learningOne(learningActivityOneList, gameDto,MyConstants.ITALIAN);
                    }
                    case MODULE_LEARNING_2->{
                        gameOne(learningActivityOneList, gameDto,MyConstants.ITALIAN);
                    }
                    case MODULE_LEARNING_3 -> {
                        learningTenses(verbs, gameDto, false, MODULE_LEARNING_3,MyConstants.ITALIAN);
                    }
                    case MODULE_LEARNING_4 -> {
                        gameTwo(verbs,gameDto,MyConstants.ITALIAN);
                    }
                    case MODULE_LEARNING_5 -> {
                        learningTenses(verbs, gameDto, true, MODULE_LEARNING_5,MyConstants.ITALIAN);
                    }
                }
                break;
            case MyConstants.SPANISH :
                break;
            case MyConstants.SWAHILI :
                switch (moduleId) {
                    case MODULE_LEARNING_1-> {
                        learningOne(learningActivityOneList, gameDto,MyConstants.SWAHILI);
                    }
                    case MODULE_LEARNING_2->{
                        gameOne(learningActivityOneList, gameDto,MyConstants.SWAHILI);
                    }
                    case MODULE_LEARNING_3 -> {
                        learningTenses(verbs, gameDto, false, MODULE_LEARNING_3,MyConstants.SWAHILI);
                    }
                    case MODULE_LEARNING_4 -> {
                        gameTwo(verbs,gameDto,MyConstants.SWAHILI);
                    }
                }        
        }
        return gameDto;
    }

    private List<GameDto> learningOne(List<Verb> verbs, List<GameDto> gameDtoFirst, String languageId) {
        for (Verb verb : verbs) {
            String translatedVerb = "";
            if (languageId.equals(MyConstants.ITALIAN)) {
                translatedVerb = verb.getItalianVerb();
            } else if (languageId.equals(MyConstants.SWAHILI)) {
                translatedVerb = verb.getSwahiliVerb();
            }
            GameDto gameDtoEntry = new GameDto(verb.getId(), 
            verb.getEnglishVerb(), translatedVerb, verb.getUrlImage());
            gameDtoFirst.add(gameDtoEntry);
        }
        return gameDtoFirst;
    }
    
    
    
    private List<GameDto> gameOne(List<Verb> verbs, List<GameDto> gameDtoFirst,String languageId){
        for (Verb verb : verbs) {
            String question = "";
            String answerString = "";
            if (languageId.equals(MyConstants.ITALIAN)) {
                question = "What is the Italian translation for " + verb.getEnglishVerb();
                answerString = verb.getItalianVerb();
            } else if (languageId.equals(MyConstants.SWAHILI)) {
                question = "What is the Swahili translation for " + verb.getEnglishVerb();
                answerString = verb.getSwahiliVerb();
            }
            List<String> responseList = this.randomOptions(verbs,answerString,languageId);
            responseList.add(answerString);
            Collections.shuffle(responseList);
            int answerIndex = responseList.indexOf(answerString);
            GameDto gameDtoEntry=  
            new GameDto(verb.getId(),question,responseList.get(0),responseList.get(1),
            responseList.get(2),responseList.get(3),optionsArray[answerIndex],verb.getUrlImage());                           
            gameDtoFirst.add(gameDtoEntry);
        }
    return gameDtoFirst; 
    } 
    

    private List<GameDto> learningTenses(List<Verb> verbs, List<GameDto> gameDtoSecond, boolean isNegative,
                                         int moduleId,String languageId) {
        if (languageId.equals(MyConstants.ITALIAN)) {
            if (moduleId == MODULE_LEARNING_5) {
                tenses = new String[]{PERFECT};
            }
            for (Verb verb : verbs) {
                if(verb.getEnglishVerb().equals("jump")
                        || verb.getEnglishVerb().equals("exist")
                        || verb.getEnglishVerb().equals("open")) {
                    for (String tens : tenses) {
                        for (String generalPronoun : GENERAL_PRONOUNS) {
                            EnglishVerbs englishVerbs =
                                    new EnglishVerbs(verb.getEnglishVerb(), tens, generalPronoun,isNegative);
                            String features = getFeatures(isNegative, generalPronoun, tens);
                            String translated = verb.getTranslatedVerb(new EnglishItalianTranslation(), features);
                            GameDto gameDtoEntry = new GameDto(verb.getEnglishVerb()
                                    , translated, features, verb.getId(), verb.getUrlImage(),
                                    englishVerbs.getConjugatedVerb(),verb.getItalianVerb());
                            gameDtoSecond.add(gameDtoEntry);
                        }
                    }
                    if (moduleId == MODULE_LEARNING_5) {
                        String[] IMPERATIVE_PRONOUNS =  {"2s","1p","2p"};
                        for (String imperativePronoun : IMPERATIVE_PRONOUNS) {
                            EnglishVerbs englishVerbs =
                                    new EnglishVerbs(verb.getEnglishVerb(), IMPERATIVE, imperativePronoun,false);
                            String features = getFeatures(false, imperativePronoun, IMPERATIVE);
                            String translated = verb.getTranslatedVerb(new EnglishItalianTranslation(), features);
                            GameDto gameDtoEntry = new GameDto(verb.getEnglishVerb()
                                    , translated, features, verb.getId(), verb.getUrlImage(),
                                    englishVerbs.getConjugatedVerb(),verb.getItalianVerb());
                            gameDtoSecond.add(gameDtoEntry);
                        }
                    }
                }
            }

        }
        else if(languageId.equals(MyConstants.SWAHILI)){
            tenses = new String[]{PRESENT, FUTURE, PAST,PERFECT};
            for (Verb verb : verbs) {
                if(verb.getEnglishVerb().equals("give")
                        || verb.getEnglishVerb().equals("eat")
                        || verb.getEnglishVerb().equals("speak")) {
                    for (String tens : tenses) {
                        for (String generalPronoun : GENERAL_PRONOUNS) {
                            EnglishVerbs englishVerbs =
                            new EnglishVerbs(verb.getEnglishVerb(),
                            tens, generalPronoun,isNegative);
                            String features = 
                            getFeatures(isNegative, generalPronoun, tens);
                            String translated = 
                            verb.getTranslatedVerb
                            (new EnglishSwahiliTranslation(), features);
                            GameDto gameDtoEntry = 
                            new GameDto(verb.getEnglishVerb()
                            , translated, features, verb.getId(),
                            verb.getUrlImage(),
                            englishVerbs.getConjugatedVerb(),
                            verb.getSwahiliVerb());
                            gameDtoSecond.add(gameDtoEntry);
                        }
                    }

                }
  
            }
        }

        
        return gameDtoSecond;
    }
    private List<GameDto> gameTwo(List<Verb> verbs,
    List<GameDto> gameDtoThird,String languageId) {
        if (languageId.equals(MyConstants.ITALIAN)) {
            for (Verb verb : verbs) {
                for (String generalPronoun : GENERAL_PRONOUNS) {
                    for (String tens : tenses) {
                        String features = 
                        getFeatures(false, generalPronoun, tens);
                        String translated = 
                        verb.getTranslatedVerb
                        (new EnglishItalianTranslation(), features);
                        GameDto gameDtoEntry = 
                        new GameDto(verb.getEnglishVerb()
                        , translated, features, verb.getId(),
                        verb.getUrlImage());
                        gameDtoThird.add(gameDtoEntry);
                    }
    
                }
            }
        } else if (languageId.equals(MyConstants.SWAHILI)) {
            tenses = new String[]{PRESENT, FUTURE, PAST,PERFECT};
            for (Verb verb : verbs) {
                for (String generalPronoun : GENERAL_PRONOUNS) {
                    for (String tens : tenses) {
                        String features = getFeatures
                        (false, generalPronoun, tens);
                        String translated = verb.getTranslatedVerb
                        (new EnglishSwahiliTranslation(), features);
                        GameDto gameDtoEntry = 
                        new GameDto(verb.getEnglishVerb()
                        , translated, features, verb.getId(),
                        verb.getUrlImage());
                        gameDtoThird.add(gameDtoEntry);
                    }
                }
            }
        }
        return gameDtoThird;
    }

    public List<String> randomOptions(List<Verb> verbs,String answer){
        List<String> responseList = new ArrayList<String>();
        Random rand = new Random();
        for (int i = 0; i < this.numberOfOptions; i++) {
            int index = rand.nextInt(verbs.size());
            String verbItalian = verbs.get(index).getItalianVerb();
            if (!verbItalian.equals(answer) && 
            !responseList.contains(verbItalian)) {
                responseList.add(verbItalian);
            } else {
                i--;
            }
        }
        return responseList;
    }

    String getFeatures(boolean isNegative, String pronoun, String tense){
        return isNegative ? "NEG"+ "+" + pronoun + "+" + tense :
                pronoun + "+" + tense;
    }
    
    public List<String> randomOptions(List<Verb> verbs,
    String answer,String languageId){
        List<String> responseList = new ArrayList<String>();    
        Random rand = new Random();
        String verb = "";
        for (int i = 0; i < this.numberOfOptions; i++) {
            int index = rand.nextInt(verbs.size());
            if (languageId.equals(MyConstants.ITALIAN)) {
                verb = verbs.get(index).getItalianVerb();
            } else if (languageId.equals(MyConstants.SWAHILI)) {
                verb = verbs.get(index).getSwahiliVerb();
            }
            if (!verb.equals(answer) && !responseList.contains(verb)) {
                responseList.add(verb);
            } else {
                i--;
            }
        }
        return responseList;
    }


/*    private String getRandomTense() {
        String[] tenses = {PRESENT, FUTURE, PREFECT};
        Random random = new Random();
        int index = random.nextInt(tenses.length);
        return tenses[index];
    }
    private String getRandomPronoun() {
        Random random = new Random();
        int index = random.nextInt(GENERAL_PRONOUNS.length);
        return GENERAL_PRONOUNS[index];
    }*/

}