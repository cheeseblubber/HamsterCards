Trello.Views.Board = Backbone.View.extend({
  tagName: 'ol',

  template: JST['boards/show'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render)
    this.subViews = [];
  },

  render: function () {
    var that = this
    var content = that.template({
      board: that.model
    });
    that.$el.html(content);
    _.each(that.collection, function (list) {
      var view = new Trello.Views.ListItem({ model: list });
      that.subViews.push(view);
      that.$el.append(view.render().$el);
    })
    return this;
  },
})