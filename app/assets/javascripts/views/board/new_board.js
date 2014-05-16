Trello.Views.NewBoard = Backbone.View.extend({

  template: JST['boards/new'],

  initialize: function() {
    this.listenTo(this.collection, "add", this.redirect)
  },

  events: {
    'submit form': 'add'
  },

  render: function () {
    var that = this;
    that.$el.html(that.template())
    return this;
  },

  add: function(event){
    event.preventDefault();
    var $form = $('.form').serializeJSON()
    var title = $form.board.title
    this.collection.create({
      title: title
    })
  },

  redirect: function () {
    Backbone.history.navigate('/#', true)
  },
})