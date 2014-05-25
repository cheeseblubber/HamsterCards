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
		var data = { card: {
			title: this.$('.title').val(),
			description: this.$('.description').val(),
			rank: (this.list.cards().length + 1),
			list_id: this.list.id,
		}}
		this.list.cards().create(data, {
			// without wait true card will not initially render
			wait: true,
			success: function (view) {
				$('textarea').val('')
				//clears the textarea out
			}
		})
	}
})

// save: function (event) {
//   var view = this;
//   event.preventDefault();
// 		var data = {
// 		title: this.$('#title').val(),
// 		rank: (this.model.lists().length + 1),
// 		board_id: this.model.id,
// 	};
// 	var list = new Trello.Models.List(data)
// 	this.model.lists().create(list, {
// 		success: function () {
// 		},
// 		wait: true
// 	});
// },