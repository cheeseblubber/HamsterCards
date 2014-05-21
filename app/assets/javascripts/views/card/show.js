Trello.Views.CardItem = Backbone.View.extend({

  template: JST["cards/show"],

  // initialize: function () {
  //   this.listenTo(this.model, "sync", this.render);
  //   this.listenTo(
  //     this.model.cards(), "add", this.a
  //   );
  // },

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  }

  // render: function () {
  //   var view = this;
  //   var renderContent = this.template({
  //     card: this.collection
  //   });
  //
  //   this.$el.html(renderedContent);
  //   this.attachSubviews();
  // }
})