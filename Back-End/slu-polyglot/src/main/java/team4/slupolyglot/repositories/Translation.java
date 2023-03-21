package team4.slupolyglot.repositories;

import org.springframework.stereotype.Component;
import team4.slupolyglot.model.Verb;

@Component
public interface Translation {
    String translate(Verb verb, String features);
}

