Trello.Views.Board = Backbone.CompositeView.extend({
  tagName: 'ol',

  template: JST['boards/show'],

  initialize: function() {
    this.listenTo(
      this.model.lists(), "add", this.addList
    );
		//puts form add list form in initialization
		this.addListForm();
  },

	// moved this out of initialization
	addListForm: function () {
		//used to add the form for list creation at initialization
		var listNewView = new Trello.Views.ListItem({ model: this.model });
		var listFormView = new Trello.Views.newList({ model: this.model });
    this.addSubview(".add-list-form", listFormView);
    this.addSubview(".lists", listNewView);
    this.model.lists().each(this.addList.bind(this));
	},

  addList: function (list) {
    var listShow = new Trello.Views.ListItem({ model: list })
    this.addSubview(".lists", listShow);
  },



  render: function () {
    var view = this;
    var renderedContent = this.template({
      board: this.model
    });
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
