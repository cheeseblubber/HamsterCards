Trello.Views.Board = Backbone.View.extend({
  template: JST['boards/show'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
  },

  render: function(){
    var that = this;
    that.$el.html(that.template({
      board: that.model,
      lists: that.list
    }));
    return this
  },

})