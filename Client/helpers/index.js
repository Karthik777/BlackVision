if (Meteor.isClient) {
    Template.index.helpers({
        isTrue: function() {
            return true;
        }
    });
}
