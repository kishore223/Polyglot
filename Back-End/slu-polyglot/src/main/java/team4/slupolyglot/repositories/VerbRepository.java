package team4.slupolyglot.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import team4.slupolyglot.model.Verb;

import java.util.List;

@Repository
public interface VerbRepository extends CrudRepository<Verb, Long> {
    List<Verb> findAll();
}
