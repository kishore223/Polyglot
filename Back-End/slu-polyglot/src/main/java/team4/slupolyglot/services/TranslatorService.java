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
public class TranslatorService {
    @Autowired
    private VerbRepository verbRepository;

    @Autowired
    public TranslatorService() {
    }

    public List<GameDto> createGameTwo(GameRequest gameRequest){

        String languageId = gameRequest.getLanguageId();
        int moduleId = gameRequest.getModuleId();
        List<GameDto> gameDtoFirst = new ArrayList<>();

        switch(languageId){
            case MyConstants.ITALIAN :
                if (moduleId == MyConstants.MODULE_LEARNING_2){
                    List<Verb> verbs = verbRepository.findAll();

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
