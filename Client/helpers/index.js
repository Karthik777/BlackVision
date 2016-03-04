if (Meteor.isClient) {
    Template.index.helpers({
        isTrue: function() {
            return true;
        }
    });

    Template.index.events({
        'click #upload-btn' : function(){
            console.log(this);
            var about = document.getElementById('main');
            var upload = document.getElementById('upload');
            about.className = 'inactive';
            upload.className = 'active';
        },
        'click #about-btn' : function(){
            console.log(this);
            var about = document.getElementById('main');
            var upload = document.getElementById('upload');
            about.className = '';
            upload.className = '';
        }
    });
}
