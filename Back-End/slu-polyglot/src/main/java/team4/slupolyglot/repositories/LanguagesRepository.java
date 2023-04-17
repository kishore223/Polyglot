package team4.slupolyglot.repositories;

import org.springframework.data.repository.CrudRepository;

import team4.slupolyglot.model.Languages;

public interface LanguagesRepository extends
CrudRepository<Languages, Integer> {
    Languages findById(int id);
}
