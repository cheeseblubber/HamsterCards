Trello.Models.Comment = Backbone.Model.extend({
	url: function () {
		return "api/cards/" + this.attributes.card.id + "/comments"
	},
})