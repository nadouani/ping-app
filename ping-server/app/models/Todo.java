package models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Nabil Adouani <nabil.adouani@gmail.com>
 * @created 15/04/2014 00:01
 */
@Entity
public class Todo extends Model {

    private static final long serialVersionUID = -7330211355182769295L;

    @Id
    public Long id;

    @Column(length = 1024, nullable = false)
    @Constraints.MaxLength(1024)
    @Constraints.Required
    public String value;

    @ManyToOne
    @JsonIgnore
    public User user;

    public Todo(User user, String value) {
        this.user = user;
        this.value = value;
    }

    public static List<Todo> findByUser(User user) {
        Finder<Long, Todo> finder = new Finder<Long, Todo>(Long.class, Todo.class);
        return finder.where().eq("user", user).findList();
    }
}
