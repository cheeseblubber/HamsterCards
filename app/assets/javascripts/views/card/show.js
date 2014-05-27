Trello.Views.CardItem = Backbone.CompositeView.extend({

	tagName: 'li',

  template: JST["cards/show"],

	className: 'card',

	id: function () {
		return this.model.id
	},

	events: {
		"mouseover": "showFeatures",
		"mouseleave": "hideFeatures",
		"click": "showModal",
	},


	// dragCard: function () {
	// 	this.$el.draggable({
	// 		revert: "invalid",
	// 		start: function () {
	// 			$.notify('Dragging')
	// 			Trello.drag = this.model;
	// 		},
	// 		// zIndex: 1000,
	// 		stack: ".cards-list",
	// 	})
	// },

	render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
		// this.dragCard();
		// this.addModal
    return this;
  },

	showFeatures: function () {
		$(".close").removeClass('hidden')
	},

	hideFeatures: function () {
		$(".close").addClass('hidden')
	},

	addModal: function () {
		var that = this
		// debugger
		var modalView = new Trello.Views.ModalItem({ model: that.model})
		// that.addSubview(".add-modal", modalView)
		$('body').append(modalView.render().$el)
		this.modal = modalView
	},



	showModal: function () {
		this.addModal()
		this.model.comments().fetch()
		this.modal.show()
		// this.modal.teardown();
		// $('#cardDetails').modal('show');
	},

	// Moved this out to list
	// deleteCard: function () {
	// 	//hacked because of routes are different for different Create and delete
	//     $.ajax({
	//       url: "api/cards/" + this.model.id,
	//       method: 'DELETE',
	//     })
	// 	// debugger
	// 	// this.model.destroy()
	// },



})