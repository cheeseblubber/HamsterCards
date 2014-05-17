Trello.Models.List = Backbone.Model.extend({

  url: function () {
    return "api/boards/" + this.attributes.list.board_id + "/lists"
  }
});