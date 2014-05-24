Trello.Views.Board = Backbone.CompositeView.extend({

	className: 'board',

  template: JST['boards/show'],

	events: {
		"mouseover": "showDeleteList",
		"click .show-form": "showForm",
		"click .hide-form": "hideForm",
	},

  initialize: function() {
    this.listenTo(
      this.model.lists(), "add", this.addList
    );
		this.listenTo(this.model, "change", this.render);

		this.model.lists().each(this.addList.bind(this));
  },

	showForm: function () {
		$(".add-list-form").show()
	},

	hideForm: function () {
		$(".add-list-form").hide()
	},


	// called at initialization
	addListForm: function () {
		var listFormView = new Trello.Views.newList({ model: this.model });
    this.addSubview(".add-list-form", listFormView);
	},

  addList: function (list) {
		//the list might be a board actually it probably is
    var listView = new Trello.Views.ListItem({ model: list })
    this.addSubview(".lists", listView);
  },


  listSortable: function(){
    var that = this;
    this.$el.find('.cards').sortable({
      axis: 'x,y',
      // placeholder: 'ui-sortable-placeholder',
      forcePlaceholderSize: true,
      start: function(event, ui){
        $(ui.item).toggleClass('dragged');
      },
      stop: function(event, ui){
        $(ui.item).toggleClass('dragged');
      },
      // update: function (event) {
      //   var ids = $(event.target).sortable('toArray', { attribute: "data-id" });
      //   that.updateListRanks(ids);
      // },
    })
  },

  render: function () {
    var view = this;
    var renderedContent = this.template({
      board: this.model
    });
		this.addListForm();
    this.$el.html(renderedContent);
    this.attachSubviews();
		this.listSortable()
    return this;
  },

  addMember: function (event) {
    event.preventDefault();
    var $form = $(event.target).serializeJSON()
    var that = this;
		//refactor ajax request use BackBone
    $.ajax({
      url: "api/boards/" + this.model.id,
      method: 'PATCH',
      data: $form,
      success: function() {
        Backbone.history.navigate('#/board/' + that.model.id, true)
      }
    })
  },

  deleteBoard: function () {
    this.model.destroy();
    Backbone.history.navigate('/#', true)
  },

})
