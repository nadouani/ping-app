package controllers;

import actions.FilterAction;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;

@With(FilterAction.class)
public class Application extends Controller {

    public static Result options(String action){
        return ok();
    }

    public static Result ping(){
        return ok("pong");
    }

}
