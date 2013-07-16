$(function() {
	
	var PlayerModel = Backbone.Model.extend({
		url: function() {
            if(this.id === undefined) {
                //must be new
                return "/player";
            }
            else {
                //existing
                return "/player/" + this.id;
            }
        }
	});

	var PlayerModels = Backbone.Collection.extend({
		model: PlayerModel,
        url : "/players"
	});


	var Controller = Backbone.Router.extend({
		routes: {
			"!/player/:id" : "getPlayer",
			"!/players" : "getPlayers"
		},

		getPlayer: function(id) {
            window.playerModel.id = id;
			window.playerModel.fetch({
				success: function() {

					console.log("name: " + window.playerModel.get("name"));

					window.playerView.render();
				}
			})
		},

		getPlayers: function() {
			window.playerModels.fetch({
				success: function() {
                    var resultList = window.playerModels.toArray();
                    for(var i=0; i<resultList.length; i++) {
                        var result = resultList[i];
                        console.log((result.get("id")));
                        console.log((result.get("name")));
                    }

                    window.playersView.render();
				}
			})
		}

	});
	
	var PlayerView = Backbone.View.extend({
		el: "#main",

		events: {
			"click #save" : "save",
			"click #create" : "create",
			"click #destroy" : "destroy"
		},
		
		save: function() {
			
			var name  = $("#name").val();

			window.playerModel.set({"name" : name});

			window.playerModel.save();

			console.log("Saved " + window.playerModel.get("name") + " with an id of " + window.playerModel.get("id"));
		},

		create: function() {
			
			var name  = $("#name").val();
			
			var localPlayerModel = new PlayerModel();
			localPlayerModel.set({"name" : name});

			localPlayerModel.save();

			console.log("Create " + localPlayerModel.get("name"));
		},

		destroy: function() {

			window.playerModel.destroy();

			console.log("Destroy " + window.playerModel.get("name"));
		},


		render: function() {
			$("#renderdata").html(ich.viewplayer(window.playerModel.toJSON()));
		}
	});

	var PlayersView = Backbone.View.extend({
		el: "#main",

		render: function() {
            var map = {"players" : window.playerModels.toJSON()};
			$("#renderdata").html(ich.viewplayers(map));
		}
	});

	window.playerModel = new PlayerModel();
    window.playerModels = new PlayerModels();
	window.playerView = new PlayerView();
	window.playersView = new PlayersView();
	window.controller = new Controller();
	Backbone.history.start()
});
