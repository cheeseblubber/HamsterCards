Trello.Views.CardIndex = Backbone.View.extend({
  template: JST['cards/index'],

  initialize: function (attribute) {
    this.listenTo(this.collection, 'sync', this.render)
    this.subViews = [];
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    var that = this;
    this.collection.each(function (card) {
      var view = new Trello.Views.CardItem({ model: card });
      that.subViews.push(view);
      that.$el.append(view.render().$el);
    });
    return this;
  },
})