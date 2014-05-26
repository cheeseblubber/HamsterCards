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

	comments: function () {
		if(!this._comments){
			this._comments = new Trello.Collections.Comments([], { model: this })
		}
		return this._comments
	},

});
