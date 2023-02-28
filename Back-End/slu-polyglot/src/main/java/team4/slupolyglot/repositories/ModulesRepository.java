package team4.slupolyglot.repositories;

import org.springframework.data.repository.CrudRepository;
import team4.slupolyglot.model.Module;

public interface ModulesRepository
extends CrudRepository<Module, Integer> {
    Module findById(int moduleId);
}
