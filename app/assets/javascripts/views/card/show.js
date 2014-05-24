Trello.Views.CardItem = Backbone.View.extend({

	tagName: 'li',

  template: JST["cards/show"],

	className: 'card',

	id: function () {
		return this.model.id
	},

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
		$(".close").removeClass('hidden')
	},

	hideFeatures: function () {
		$(".close").addClass('hidden')
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