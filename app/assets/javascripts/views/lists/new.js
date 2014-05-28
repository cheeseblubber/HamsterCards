Trello.Views.newList = Backbone.CompositeView.extend({
  template: JST["lists/new"],

	tagName: "li",

  events: {
    // "submit form": "submit",
  	"submit": "save",
		"click .cancel": "cancel",
	},

  render: function (){
		// $('body').on('click', this.remove);
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },

	// remove: function () {
	// 	$('body').off('click', this.remove);
	//
	// 	this.$el.remove();
	// 	return this;
	// },

  save: function (event) {
    var view = this;
    event.preventDefault();
			var data = {
			title: this.$('#title').val(),
			rank: (this.model.lists().length + 1),
			board_id: this.model.id,
		};
		var list = new Trello.Models.List(data)
		this.model.lists().create(list, {
			success: function () {
			},
			wait: true
		});
  },

});