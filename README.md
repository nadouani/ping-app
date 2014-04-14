PING - Play2 + Ionic + AngularJS
===============================

This is a sample project that aims ot demonstrate the use of a common server application shared between a Web Application and a Mobile Application.

The Server side app provides a list of REST APIs that both, the Web and Mobile apps use.

This sample is based on the following stack:
- Play 2 for the server side application
- A Single Page App based on Yeoman + Grunt + Bower + AngularJS + Twitter Bootstrap
- A Ionic Framework mobile App

Server side app
---------------
This application is inspired from the great article written by [James Ward](https://twitter.com/_JamesWard) about [Securing Single Page Apps and REST services](http://www.jamesward.com/2013/05/13/securing-single-page-apps-and-rest-services).
It provides:
- an authentication API
- and one secured API to get a list of todos

Web Application
---------------
This part is a simple AngularJS SPA, including an authentication form and a secured list of todos.
It has been generated using the [Official Yeoman Angular generator](https://github.com/yeoman/generator-angular)

Mobile Application
------------------
Same as the Web Application, the goal of this component is to show how to share the same server APIs between Web and Mobile apps
It has been generated using the [Yeoman Ionic generator](https://github.com/diegonetto/generator-ionic) written by [Diego Netto](https://github.com/diegonetto)
