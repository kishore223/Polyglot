package team4.slupolyglot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team4.slupolyglot.MyConstants;
import team4.slupolyglot.controller.request.GameRequest;
import team4.slupolyglot.dto.GameDto;
import team4.slupolyglot.model.EnglishItalianTranslation;
import team4.slupolyglot.model.EnglishVerbs;
import team4.slupolyglot.model.Verb;
import team4.slupolyglot.repositories.VerbRepository;
import java.util.ArrayList;
import java.util.List;

import static team4.slupolyglot.MyConstants.*;

@Service
public class GameService {

    @Autowired
    private VerbRepository verbRepository;
    private final String[] tenses = {PRESENT, FUTURE, PAST}; // todo tecnical debt

    public List<GameDto> createGame(GameRequest gameRequest) {

        String languageId = gameRequest.getLanguageId();
        int moduleId = gameRequest.getModuleId();
        List<GameDto> gameDto = new ArrayList<>();
        List<Verb> verbs = verbRepository.findAll();

        switch(languageId){
            case MyConstants.ITALIAN :
                switch (moduleId) {
                    case MODULE_LEARNING_1,MODULE_LEARNING_2-> {
                        GameLearningOne(verbs, gameDto);
                    }
                    case MODULE_LEARNING_3 -> {
                        LearningTwo(verbs, gameDto);
                    }
                    case MODULE_LEARNING_4 -> {
                        GameTwo(verbs,gameDto);
                    }
                }
                break;
            case MyConstants.SPANISH :
                break;
        }
        return gameDto;
    }

    private List<GameDto> GameLearningOne(List<Verb> verbs, List<GameDto> gameDtoFirst){
        for (Verb verb : verbs) {
            GameDto gameDtoEntry = new GameDto(verb.getId(),verb.getEnglishVerb()
                    ,verb.getItalianVerb(), verb.getUrlImage());
            gameDtoFirst.add(gameDtoEntry);
        }
        return gameDtoFirst;
    }
    private List<GameDto> LearningTwo(List<Verb> verbs, List<GameDto> gameDtoSecond) {
        for (Verb verb : verbs) {
            if(verb.getEnglishVerb().equals("jump")
                    || verb.getEnglishVerb().equals("exist")
                    || verb.getEnglishVerb().equals("open")) {
                for (String tens : tenses) {
                    for (String generalPronoun : GENERAL_PRONOUNS) {
                        EnglishVerbs englishVerbs =
                                new EnglishVerbs(verb.getEnglishVerb(), tens, generalPronoun);
                        String features = generalPronoun + "+" + tens;
                        String translated = verb.getTranslatedVerb(new EnglishItalianTranslation(), features);
                        GameDto gameDtoEntry = new GameDto(verb.getEnglishVerb()
                                , translated, features, verb.getId(), verb.getUrlImage(),
                                englishVerbs.getConjugatedVerb());
                        gameDtoSecond.add(gameDtoEntry);
                    }
                }
            }
        }
        return gameDtoSecond;
    }
    private List<GameDto> GameTwo(List<Verb> verbs, List<GameDto> gameDtoThird) {
        for (Verb verb : verbs) {
            for (String generalPronoun : GENERAL_PRONOUNS) {
                for (String tens : tenses) {
                    String features = generalPronoun + "+" + tens;
                    String translated = verb.getTranslatedVerb(new EnglishItalianTranslation(), features);
                    GameDto gameDtoEntry = new GameDto(verb.getEnglishVerb()
                            , translated, features, verb.getId(), verb.getUrlImage());
                    gameDtoThird.add(gameDtoEntry);
                }

            }
        }
        return gameDtoThird;
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
