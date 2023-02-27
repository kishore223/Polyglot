package team4.slupolyglot.model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PlayerService {

    public static final 
    String ASSIGN_LANGUAGE_TO_PLAYER_EXCEPTION_MESSAGE = 
    "Invalid email or languageId, Please check";
    public static final 
    String UPDATE_SCORE_OF_MODULE_EXCEPTION_MESSAGE =
    "Invalid email, languageId or moduleId, Please check";

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private LanguagesRepository languagesRepository;

    @Autowired
    private ScoresRepository scoresRepository;

    @Autowired
    private ModulesRepository modulesRepository;

    public void assignLanguageToPlayer
    (String email, int languageId) {
        Player player = 
        playerRepository.findByEmail(email);
        Languages language = 
        languagesRepository.findById(languageId);
        if (player == null || language == null) {
            throw new 
            RuntimeException(
            ASSIGN_LANGUAGE_TO_PLAYER_EXCEPTION_MESSAGE);
        }
        Iterable<Module>  modules = 
        modulesRepository.findAll();
        for (Module module : modules) {
            Scores score = new Scores();
            score.setPlayer(player);
            score.setLanguage(language);
            score.setModule(module);
            score.setScore(0);
            scoresRepository.save(score);
        }
    }
    
    public void updateScoreOfModule
    (String email,int languageId,int moduleId,int newScore) {
        Player player = 
        playerRepository.findByEmail(email);
        Languages language = 
        languagesRepository.findById(languageId);
        Module module =
        modulesRepository.findById(moduleId);
        Scores score = scoresRepository.
        findByPlayerAndLanguageAndModule(player,language,module);
        if (score == null) {
            throw new 
            RuntimeException(
            UPDATE_SCORE_OF_MODULE_EXCEPTION_MESSAGE);
        }
        score.setScore(newScore);
        scoresRepository.save(score);
    }
}
