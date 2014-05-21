Trello.Views.newList = Backbone.View.extend({
  template: JST["lists/new"],

  events: {
    "submit form": "submit",
  },

  render: function (){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (event) {
    var view = this;
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var list = new Trello.Models.List(params)
    list.save({}, {
      success: function() {
        view.model.lists().add(list);
				//refactor this to clear out previously filled info another way
        $(event.target).find("input[type=text]").val("")
      }
    });
  },

});