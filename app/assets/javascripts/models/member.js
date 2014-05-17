Trello.Models.Member = Backbone.Model.extend({
  urlRoot: function () {
    var url = "api/boards/" +
    this.attributes.list.board_id +
    "/lists/" +
    this.attributes.lists.list_id
    return url;
  },
});

//this model might be unnesssiary-refactor