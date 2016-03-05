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
            fileReader.readAsDataURL(file);
        },
        // On form submit
        "submit" : function(event,template) {
            event.preventDefault();
            //the uploaded image in base64(meteor normally handles it automatically but see how it goes)
            var dataObject = template.dataUrl.get()
            Meteor.call("categorizeImages", dataObject, function(error, result) {
                if(error){ console.log("error", error); }
                if(result){
                    console.log(result);
                    //display results
                }
            });
           template.dataUrl.set(null);
        }
    });

}
