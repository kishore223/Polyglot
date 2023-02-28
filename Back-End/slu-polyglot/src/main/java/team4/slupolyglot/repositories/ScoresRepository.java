package team4.slupolyglot.repositories;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import team4.slupolyglot.model.Languages;
import team4.slupolyglot.model.Module;
import team4.slupolyglot.model.Player;
import team4.slupolyglot.model.Scores;


public interface ScoresRepository extends
CrudRepository<Scores, Integer> {
    List<Scores> findByPlayerAndLanguage
    (Player player, Languages language);
    Scores findByPlayerAndLanguageAndModule
    (Player player, Languages language, Module module);
    List<Scores> findByPlayer
    (Player player);
}
