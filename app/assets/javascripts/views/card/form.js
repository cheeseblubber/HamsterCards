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
		var that = this;
		event.preventDefault();
		var data = { card: {
			title: this.$('.title').val(),
			// description: this.$('.description').val(),
			description: "",
			rank: (this.list.cards().length + 1),
			list_id: this.list.id,
		}}

		this.list.cards().create(data, {
			// without wait true card will not initially render
			wait: true,
			success: function (that) {
				$('textarea').val('')
				//clears the textarea out
			}
		})
	}
})
