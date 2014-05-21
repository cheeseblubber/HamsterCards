Trello.Models.Card = Backbone.Model.extend({
  url: function () {
    return "api/boards/" + this.attributes.list_id + "/lists"
  },
});