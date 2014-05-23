Trello.Views.CardForm = Backbone.View.extend({

  template: JST["cards/new"],

  events: {
    "submit form": "submit",
  },

	initialize: function(options){
		this.list = options.list
	},

  render: function () {
    var content = this.template({ list: this.list });
    this.$el.html(content);
    return this;
  },

	submit: function(event) {
		var view = this;
		event.preventDefault();
		var params = $(event.currentTarget).serializeJSON();
		// var card = new Trello.Models.Card(params);
		// card.save({},params);
		this.list.cards().create(params, {
			success: function() {
			}
		})
	}
})