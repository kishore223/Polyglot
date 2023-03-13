package team4.slupolyglot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team4.slupolyglot.MyConstants;
import team4.slupolyglot.controller.request.GameRequest;
import team4.slupolyglot.dto.GameDto;
import team4.slupolyglot.model.EnglishItalianTranslation;
import team4.slupolyglot.model.Verb;
import team4.slupolyglot.repositories.VerbRepository;
import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {

    @Autowired
    private VerbRepository verbRepository;

    public List<GameDto> createGame(GameRequest gameRequest) {

        String languageId = gameRequest.getLanguageId();
        int moduleId = gameRequest.getModuleId();
        List<GameDto> gameDtoFirst = new ArrayList<>();
        List<Verb> verbs = verbRepository.findAll();

        switch(languageId){

            case MyConstants.ITALIAN :
                if (moduleId == MyConstants.MODULE_LEARNING_1){
                    for (Verb verb : verbs) {
                        GameDto gameDtoEntry = new GameDto(verb.getId(),verb.getEnglishVerb()
                                ,verb.getItalianVerb(), verb.getUrlImage());
                        gameDtoFirst.add(gameDtoEntry);
                    }

                    return gameDtoFirst;
                } else if (moduleId == MyConstants.MODULE_LEARNING_2) {

                    for (Verb verb : verbs) {
                        String features = MyConstants.GENERAL_PRONOUNS[0] + "+" + MyConstants.PRESENT; //todo function to randomly pick pronouns and tense
                        String translated = verb.getTranslatedVerb(new EnglishItalianTranslation(),features);
                        GameDto gameDtoEntry = new GameDto(verb.getEnglishVerb()
                                ,translated,features,verb.getId());
                        gameDtoFirst.add(gameDtoEntry);
                    }

                    return gameDtoFirst;
                }
                break;
            case MyConstants.SPANISH :
                break;
        }
        return gameDtoFirst;
    }

}
