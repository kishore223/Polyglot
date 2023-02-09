package team4.slupolyglot.model;


import org.springframework.data.repository.CrudRepository;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface PlayerRepository extends CrudRepository<Player, Integer> {

    Player findByEmail(String email);
}