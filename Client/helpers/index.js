if (Meteor.isClient) {
    Template.index.helpers({
        isTrue: function() {
            return true;
        }
    });
    Template.index.events({
      "click #event": function(event, template){
        event.preventDefault();
        var dataObject = //the uploaded image in base64(meteor normally handles it automatically but see how it goes)
        Meteor.call("categorizeImages", dataObject, function(error, result){
          if(error){
            console.log("error", error);
          }
          if(result){
             //display results
          }
        });
      }
    });
}
