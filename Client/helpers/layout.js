if (Meteor.isClient) {
    Template.ApplicationLayout.helpers({
        isTrue: function() {
            return true;
        }
    });
}
