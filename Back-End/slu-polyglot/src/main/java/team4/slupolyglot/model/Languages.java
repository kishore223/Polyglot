package team4.slupolyglot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class Languages {

    @Id
    private String  id;
    private String name;

    public Languages() {
    }
    public Languages(String id,String name) {
        this.id = id;
        this.name = name;
    }
    public void setId(String id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getId() {
        return id;
    }
    public String getName() {
        return name;
    }
}
