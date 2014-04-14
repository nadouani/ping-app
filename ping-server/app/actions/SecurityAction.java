package actions;

import models.User;
import play.libs.F;
import play.mvc.Action;
import play.mvc.Http;
import play.mvc.SimpleResult;

/**
 * This is an action composition class used to secure private controller methods.
 * It checks that the X-AUTH-TOKEN header is provided and belongs to a known user,
 * otherwise it rejects the request by returning a 401 response
 */
public class SecurityAction extends Action.Simple {

    public static final String AUTH_TOKEN_HEADER = "X-AUTH-TOKEN";
    public static final String AUTH_TOKEN = "XSRF-TOKEN";

    public play.libs.F.Promise<SimpleResult> call(Http.Context ctx) throws Throwable {
        User user = null;

        // get the authorization token from request header
        String[] authTokenHeaderValues = ctx.request().headers().get(AUTH_TOKEN_HEADER);

        // If the header is provided, then search for the user corresponding to the provided token
        if ((authTokenHeaderValues != null) && (authTokenHeaderValues.length == 1) && (authTokenHeaderValues[0] != null)) {
            user = models.User.findByAuthToken(authTokenHeaderValues[0]);

            // If the user exists then save it in the request context and call the action
            if (user != null) {
                ctx.args.put("user", user);
                return delegate.call(ctx);
            }
        }

        // Otherwise return a 401 response
        F.Promise<Boolean> promiseOfInt = F.Promise.promise(
            new F.Function0<Boolean>() {
                public Boolean apply() {
                    return true;
                }
            }
        );
        return promiseOfInt.map(
            new F.Function<Boolean, SimpleResult>() {
                public SimpleResult apply(Boolean i) {
                    return unauthorized("unauthorized");
                }
            }
        );

    }

    /**
     * Get the user from request's context
     * @return
     */
    public static User getUser() {
        return (User) Http.Context.current().args.get("user");
    }
}
