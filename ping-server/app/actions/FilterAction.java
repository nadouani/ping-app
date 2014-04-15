package actions;

import play.libs.F;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.SimpleResult;

import static play.mvc.Controller.request;
import static play.mvc.Controller.response;

/**
 * @author Nabil Adouani <nabil.adouani@gmail.com>
 * @created 15/04/2014 01:13
 */
public class FilterAction extends Action.Simple {
    @Override
    public F.Promise<SimpleResult> call(Http.Context context) throws Throwable {

        // Fake it: Allow all origins
        response().setHeader("Access-Control-Allow-Origin", "*");

        if(request().getHeader("Access-Control-Request-Headers") != null){
            response().setHeader("Access-Control-Allow-Headers", request().getHeader("Access-Control-Request-Headers"));
        }

        if(request().getHeader("Access-Control-Request-Method") != null){
            response().setHeader("Access-Control-Allow-Method", request().getHeader("Access-Control-Request-Method"));
        }

        return delegate.call(context);
    }
}
