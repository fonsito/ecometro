'use strict';

define([
  'backbone',
  'backboneModal',
  'handlebars',
  'text!../../templates/about-us-modal.handlebars'
], function(Backbone, backboneModal, handlebars, aboutUsModalTpl) {

  var DashboardView = Backbone.View.extend({

    el: '#dashboardView',

    events: {
      'click #aboutUs': '_onClickAboutUs'
    },

    initialize: function() {
      // Modals
      this.AboutUsModal = Backbone.Modal.extend({
        template: Handlebars.compile(aboutUsModalTpl),
        cancelEl: '.bbm-button'
      });
    },

    _onClickAboutUs: function() {
      this.aboutUsView = new this.AboutUsModal();
      console.log(this.aboutUsView.render().el)
      $('body').append(this.aboutUsView.render().el);
    }

  });

  return DashboardView;

});
