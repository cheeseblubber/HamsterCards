Trello.Models.Card = Backbone.Model.extend({

  url: function () {
		// return "api/cards/" + this.attributes.id
		if(!this.attributes.card){
			return "api/lists/" +
			this.attributes.list_id +
			"/cards/" +
			this.attributes.id
		} else {
			return "api/lists/" +
			this.attributes.card.list_id +
			"/cards"
		}

  },

	parse: function (resp) {
		if(resp.comments) {
			this.lists().set(resp.comments, {parse: true });
			delete resp.comments;
		}
		return resp;
	},

	comments: function () {
		if(!this._comments){
			this._comments = new Trello.Collections.Comments([], { card: this });
		};
		return this._comments;
	},

});
