package team4.slupolyglot.model;

import org.springframework.data.repository.CrudRepository;

public interface ModulesRepository 
extends CrudRepository<Module, Integer> {
    Module findById(int moduleId);
}