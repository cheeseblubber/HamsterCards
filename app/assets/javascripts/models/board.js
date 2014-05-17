Trello.Models.Board = Backbone.Model.extend({
  urlRoot: 'api/boards',

  parse: function (response) {
    if(response.lists) {
      this.lists().set(response.lists);
      delete(response.lists);
    }
    return response
  },

  lists: function () {
    if(!this.get('lists')) {
      var collection = new Trello.Collections.Lists([], { board: this });
      this.set("lists", collection)
    }
    return this.get("lists")
  },

})