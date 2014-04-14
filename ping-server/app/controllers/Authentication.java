package controllers;

import actions.FilterAction;
import actions.SecurityAction;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.User;
import play.data.Form;
import play.data.validation.Constraints;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.With;

/**
 * @author Nabil Adouani <nabil.adouani@gmail.com>
 * @created 15/04/2014 00:24
 */
@With(FilterAction.class)
public class Authentication extends Controller{

    // returns an authToken
    public static Result login() {
        Login login = Json.fromJson(request().body().asJson(), Login.class);
        Form<Login> loginForm = Form.form(Login.class).fill(login);

        if (loginForm.hasErrors()) {
            return badRequest(loginForm.errorsAsJson());
        }

        User user = User.findByEmailAddressAndPassword(login.emailAddress, login.password);

        if (user == null) {
            return unauthorized("Unknown user");
        }
        else {
            String authToken = user.createToken();
            ObjectNode authTokenJson = Json.newObject();
            authTokenJson.put(SecurityAction.AUTH_TOKEN, authToken);
            response().setCookie(SecurityAction.AUTH_TOKEN, authToken);
            return ok(authTokenJson);
        }
    }

    @With(SecurityAction.class)
    public static Result logout() {
        response().discardCookie(SecurityAction.AUTH_TOKEN);
        SecurityAction.getUser().deleteAuthToken();
        return redirect("/");
    }

    public static class Login {

        @Constraints.Required
        @Constraints.Email
        public String emailAddress;

        @Constraints.Required
        public String password;
    }
}
