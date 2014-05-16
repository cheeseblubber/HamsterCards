Trello.Models.List = Backbone.Model.extend({

  url: function () {
    return "api/board/" + this.board.id + "/lists"
  }
});