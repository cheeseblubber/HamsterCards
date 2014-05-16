Trello.Views.BoardsIndex = Backbone.View.extend({

  template: JST['boards/index'],

  initialize: function(){
    this.listenTo(this.collection, 'add sync', this.render)
  },

  events: {
    'submit form': 'add'
  },

  render: function(){
    var that = this;
    that.$el.html(that.template({
      boards: that.collection
    }));
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


});