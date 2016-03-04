// routes.js

Router.configure({
	layoutTemplate : "ApplicationLayout",
	loadingTemplate: "loading"
});

Router.map(function(){
    this.route('/api', function(){
    	this.render('api');
    });

    this.route('/',function(){
    	this.render('index');
    });
});
