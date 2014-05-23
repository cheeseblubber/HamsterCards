Trello.Models.Card = Backbone.Model.extend({


  url: function () {
    return "api/lists/" + this.attributes.list_id + "/cards"
  },

});
