// routes.js

Router.configure({
	layoutTemplate : "ApplicationLayout",
	loadingTemplate: "loading"
});

Router.map(function(){
    this.route('/api', {
        data: function(){ return Session.get('resultset'); }
    });

    this.route('/',function(){
    	this.render('index');
    });

});
