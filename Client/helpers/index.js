if (Meteor.isClient) {
    Template.index.helpers({
        isTrue: function() {
            return true;
        }
    });

    Template.index.events({
        "click #upload-submit": function(event, template){
            event.preventDefault();
            var dataObject = //the uploaded image in base64(meteor normally handles it automatically but see how it goes)
            Meteor.call("categorizeImages", dataObject, function(error, result) {
                if(error){ console.log("error", error); }
                if(result){
                //display results
                }
            });
        },

        'click #upload-btn' : function(){
            var about = document.getElementById('main');
            var upload = document.getElementById('upload');
            about.className = 'inactive';
            upload.className = 'active';
        },

        'click #about-btn' : function(){
            var about = document.getElementById('main');
            var upload = document.getElementById('upload');
            about.className = '';
            upload.className = '';
        }
    });
}
