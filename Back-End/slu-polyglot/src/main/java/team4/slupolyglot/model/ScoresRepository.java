package team4.slupolyglot.model;
import java.util.List;
import org.springframework.data.repository.CrudRepository;


public interface ScoresRepository extends 
CrudRepository<Scores, Integer> {
    List<Scores> findByPlayerAndLanguage
    (Player player, Languages language);
    Scores findByPlayerAndLanguageAndModule
    (Player player, Languages language, Module module);
}
