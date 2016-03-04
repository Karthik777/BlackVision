if (Meteor.isClient) {

    // Create reactiveVar for storing base64 strings
    Template.index.created = function() {
        this.dataUrl = new ReactiveVar();
    };

    // Allow or disallow form submission based on file upload
    Template.index.helpers({
        submitDisabled : function() {
            var state = Template.instance().dataUrl.get();
            return (state) ? false : true;
        }
    });

    // Listen to page events
    Template.index.events({
        // on change of file input
        "change input[type='file']" : function(event, template) {
            var files=event.target.files;
            if ( files.length === 0){
                return;
            }
            var file = files[0];
            //
            console.log(file);
            console.log(template.dataUrl);
            var fileReader = new FileReader();
            fileReader.onload = function(event){
                var dataUrl = event.target.result;
                template.dataUrl.set(dataUrl);
            }
            $('#filename').text(file.name);
            fileReader.readAsDataURL(file);
        },
        // On form submit
        "submit" : function(event, template) {
            event.preventDefault();
            //the uploaded image in base64(meteor normally handles it automatically but see how it goes)
            var dataObject = template.dataUrl.get()
            console.log(dataObject);
            Meteor.call("categorizeImages", dataObject, function(error, result) {
                if(error){ console.log("error", error); }
                if(result){
                    console.log(result);
                    //display results
                }
            });
        },
        // Button events
        "click #upload-btn" : function(event,template) {
            console.log(this);
            // Open the 'upload' section and enable new button
            $('#main').removeClass('active');
            $('#upload').delay(800).queue(function (next) {
                $(this).addClass('active');
                next();
            });
        },
        "click #about-btn" : function (event,template) {
            // Close the 'about' section and disabled button
            $('#upload').removeClass('active');
            $('#main').delay(800).queue(function (next) {
                $(this).addClass('active');
                next();
            });
        }
    });

}
