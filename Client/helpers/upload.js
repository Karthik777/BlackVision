if (Meteor.isClient) {
    // Create reactiveVar for storing base64 strings
    Template.Upload.created = function() {
        this.dataUrl = new ReactiveVar();
        this.loading = new ReactiveVar();
    };

    // Allow or disallow form submission based on file upload
    Template.Upload.helpers({
        submitDisabled : function() {
            var state = Template.instance().dataUrl.get();
            return (state) ? false : true;
        },
        submitReady : function() {
            var state = Template.instance().dataUrl.get();
            return (state) ? 'ready' : '';
        },
        isLoading : function() {
            var isloading = Template.instance().loading.get();
            return (isloading) ? true : false;
        }
    });

    Template.Upload.events({
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
            template.loading.set(true);
            var dataObject = template.dataUrl.get()
            console.log(dataObject);
            var result = Meteor.call("categorizeImages", dataObject, function (error, result) {
                console.log('data returned. Result:');
                console.log(result);
                if (error) {
                    console.log("error", error);
                }
                if (result) {
                    var data = {'image' : dataObject, 'results' : result};
                    Session.set('result', data);
                    template.loading.set(false);
                }
            });




        },
        // Button events
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
