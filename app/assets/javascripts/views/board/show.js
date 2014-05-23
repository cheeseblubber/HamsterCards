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
    var listView = new Trello.Views.ListItem({ model: list })
    this.addSubview(".lists", listView);
  },


  render: function () {
    var view = this;
    var renderedContent = this.template({
      board: this.model
    });
		this.addListForm();
    this.$el.html(renderedContent);
    this.attachSubviews();
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
