package team4.slupolyglot.model;

import org.springframework.data.repository.CrudRepository;

public interface PlayerRepository extends CrudRepository<Player, Integer> {
    Player findByEmail(String email);
}