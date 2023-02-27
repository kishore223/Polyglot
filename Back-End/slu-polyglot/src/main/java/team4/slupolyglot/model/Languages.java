package team4.slupolyglot.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Languages {
    @Id
    private int  id;
    private String name;

    public Languages() {
    }
    public Languages(int id,String name) {
        this.id = id;
        this.name = name;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }
}
