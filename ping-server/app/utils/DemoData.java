package utils;

import models.Todo;
import models.User;
import play.Logger;

public class DemoData {

    public static User user1;
    public static User user2;

    public static void loadDemoData() {
        
        Logger.info("Loading Demo Data");

        user1 = new User(1L, "user1@demo.com", "password", "John Doe");
        user1.save();
        
        new Todo(user1, "make it secure").save();
        new Todo(user1, "make it neat").save();

        user2 = new User(2L, "user2@demo.com", "password", "Jane Doe");
        user2.save();

        new Todo(user2, "make it pretty").save();
    }

}
