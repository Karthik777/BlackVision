if (Meteor.isClient) {
Template.index.helpers({
    isResultSet: function() {
        var data = Session.get('result');
        return (data) ? data : false;
    }
});
}
