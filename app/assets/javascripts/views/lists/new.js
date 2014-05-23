Trello.Views.newList = Backbone.CompositeView.extend({
  template: JST["lists/new"],

  events: {
    // "submit form": "submit",
  	"click .save": "save",
		"click .cancel": "cancel",
	},

	cancel: function () {

	},

  render: function (){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  save: function (event) {
    var view = this;
		// debugger
    event.preventDefault();
		//     var params = $(event.currentTarget).serializeJSON();
		// console.log(params)
			var data = {
			title: this.$('#title').val(),
			rank: (this.model.lists().length + 1),
			board_id: this.model.id,
		};
		var list = new Trello.Models.List(data)
		this.model.lists().create(list,{
			success: function () {
				$(event.target).find("input[type=text]").val("")
			}
		});
    //
    // var list = new Trello.Models.List(params)

    // list.save({}, {
    //   success: function() {
    //     view.model.lists().add(list);
    // 				//refactor this to clear out previously filled info another way
    //     $(event.target).find("input[type=text]").val("")
    //   }
    // });
  },

});