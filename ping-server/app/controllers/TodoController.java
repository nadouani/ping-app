package controllers;

import actions.FilterAction;
import actions.SecurityAction;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;

import static play.libs.Json.toJson;

/**
 * A simple controller secured using {@see SecurityController}
 */
@With({FilterAction.class, SecurityAction.class})
public class TodoController extends Controller {

    /**
     * Lists all the todos of the authenticated user
     *
     * @return
     */
    public static Result getAllTodos() {
        return ok(toJson(models.Todo.findByUser(SecurityAction.getUser())));
    }

}
