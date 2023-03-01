package team4.slupolyglot.repositories;

import org.springframework.data.repository.CrudRepository;
import team4.slupolyglot.model.Player;

public interface PlayerRepository extends
CrudRepository<Player, Integer> {
    Player findByEmail(String email);
}
