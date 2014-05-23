Trello.Views.CardItem = Backbone.View.extend({

	tagName: 'li',

  template: JST["cards/show"],

	className: 'card',

	events: {
		"mouseover": "showFeatures",
		"mouseleave": "hideFeatures",
		"click .float-right-button": "deleteCard",
	},

	render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  },

	showFeatures: function () {
		//this is a view and has
		//this.model which is the card and has the attribute list_id'
		$('#'+ this.model.id).removeClass('hidden')
	},

	hideFeatures: function () {
		$('#'+ this.model.id).addClass('hidden')
	},

	deleteCard: function () {
		//hacked because of routes are different for different Create and delete
    $.ajax({
      url: "api/cards/" + this.model.id,
      method: 'DELETE',
    })
		this.model.destroy()
	},

})