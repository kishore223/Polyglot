package team4.slupolyglot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Player {

  public Player() {
  }
  @Id
  private String email;

  public Player(String email, String userName,
  String score,String password) {
    this.email = email;
    this.name = userName;
    this.password = password;
    this.score = score;
  }

  private String name;
  private String score;
  private String password;

  public String getScore() {
    return score;
  }

  public String getPassWord() {
    return password;
  }

  public String getUserName() {
    return name;
  }

  public String getEmail() {
    return email;
  }
}