// server.js
Meteor.startup(function () {

  Meteor.publish("Images",function(){
    return Images.find();
  });

  Meteor.publish("Data",function(){
    return Data.find();
  });

  Meteor.methods({
          insertImage: function(id,name,marker,result){
              Data.insert({
	            category: name[0],
	            name: name[1],
	            marker: marker,
	            _id: id,
                result: result,
	            createdAt: new Date(),            // current time
	            owner: Meteor.userId(),           // _id of logged in user
	            username: Meteor.user().username // username of logged in user
            });
        },
          deleteItem: function(id){
                        Data.remove({_id:id});
            },
          updateItem: function(id,category,species){
                        Data.update({_id : id},{
                          $set: {name: species, category: category}
                        });
          },
          encodeImageData: function(imageData) {
                          var buffer = new Buffer(imageData,'binary');
                          return buffer.toString('base64');
                        },
          categorizeImages: function(image){
                              var accessToken = Meteor.call("GetAccessToken", {});
                              console.log(Meteor.call("encodeImageData", image));
                              var dataObject = {
                                params: {
                                  model: "general-v1.3",
                                  encoded_data:{ value: Meteor.call("encodeImageData", image),
                                                options: { filename: { '0': {} }, contentType: null }
                                              }},
                                headers:{
                                  Authorization: "Bearer " + accessToken
                                        }
                              }
                            
                              HTTP.call('POST',"https://api.clarifai.com/v1/tag/", dataObject, function(error, result){
                                if(error){
                                  console.log("error", error);
                                }
                                if(result){
                                  console.log(result);
                                   var result_paresed = result["results"]["result"]["tag"]["classes"]
                                   console.log(result_paresed);
                                }
                              });
          },
          GetAccessToken: function(){
                            var dataObject = {
                              client_id:"EsYuml4p15UAGzDQw7-v4GFDlaPpbcDJqNhDvns1",
                              client_secret:"vETGZR7XNF0v78ztIfKPuWBDDm3mEeRfTkYloKYC",
                              grant_type:"client_credentials"
                            }
                            var result = HTTP.call('POST',"https://api.clarifai.com/v1/token/", {params:dataObject});
                            var result_parse = EJSON.parse(result["content"]);
                            return result_parse["access_token"]
          }
  		});

ServiceConfiguration.configurations.remove({ service: 'auth0' });
ServiceConfiguration.configurations.insert({
  service:      'auth0',
  domain:       'karthik.au.auth0.com',
  clientId:     'Qx0E3rVXe13dsYi6KeK2d9y0tjbZbEgC',
  clientSecret: 'BwP7X7fU2IyCDDt2rgI501UbsSOAQx5zKeU8wTZF8QgRySnoIA9GstfvhgdW1bt6',
  callbackURL:  '/',
  redirectURI:'https://karthik.au.auth0.com/login/callback'
});
  });
