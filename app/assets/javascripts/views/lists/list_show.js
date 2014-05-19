Trello.Views.ListItem = Backbone.View.extend({
  tagName: 'li',

  template: JST["lists/show"],

  render: function () {
    // debugger
    var content = this.template({
      list: this.model
    });
    this.$el.html(content);
    return this
  },

  leave: function(){
    this.remove();
  }

});