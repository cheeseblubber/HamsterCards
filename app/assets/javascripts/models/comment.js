Trello.Models.Comment = Backbone.Model.extend({
	url: function () {
		if(!this.attributes.card){
			return "api/cards/" + this.attributes.card_id + "/comments"
		} else {
			return "api/cards/" + this.attributes.card.id + "/comments"
		}
	},
})