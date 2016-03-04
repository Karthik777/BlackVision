if (Meteor.isClient) {

    // Listen to page events
    Template.About.events({
        // Button events
        "click #upload-btn" : function(event,template) {
            console.log(this);
            // Open the 'upload' section and enable new button
            $('#main').removeClass('active');
            $('#upload').delay(800).queue(function (next) {
                $(this).addClass('active');
                next();
            });
        }
    });


}
