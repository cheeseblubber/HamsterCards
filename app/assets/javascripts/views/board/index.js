Trello.Views.BoardsIndex = Backbone.View.extend({

  template: JST['boards/index'],

  initialize: function() {
    this.listenTo(this.collection, 'add sync', this.render)
  },

  events: {
    'submit form': 'add',
		'click .show-board-form': 'showBoardForm'
  },

  render: function () {
    var that = this;
    this.$el.html(that.template({
      boards: that.collection
    }));
		this.$el.find('.new-board-form').hide()

    return this;
  },

	showBoardForm: function (){
		$('.new-board-form').show('fast')
		$('.show-board-form').hide('fast')

	},

  add: function (event) {
    event.preventDefault();
    var $form = $(event.target).serializeJSON()
    var title = $form.board.title
    this.collection.create({
      title: title
    })
  },


});