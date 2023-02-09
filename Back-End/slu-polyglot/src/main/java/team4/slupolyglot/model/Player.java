package team4.slupolyglot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Player {

  public Player() {
  }

  @Id
  private String email;

  public Player(String email, String userName,String score, String password) {
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

  public void setScore(String score) {
    this.score = score;
  }

  public String getPassWord() {
    return password;
  }

  public void setPassWord(String password) {
    this.password = password;
  }

  public String getUserName() {
    return name;
  }

  public void setUserName(String userName) {
    this.name = userName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}