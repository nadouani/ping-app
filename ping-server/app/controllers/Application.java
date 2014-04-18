package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;
import actions.FilterAction;

@With(FilterAction.class)
public class Application extends Controller {

    public static Result options(String action){
        return ok();
    }

    public static Result ping(){
        return ok("pong");
    }

}
