'use strict';

define([
  'backbone'
], function(Backbone) {

  var ToolbarView = Backbone.View.extend({

    el: '#toolbarView',

    events: {
      'change .mod-category-child input': '_setLayer',
    },

    _setLayer: function(e) {
      var element = $(e.currentTarget);
      Backbone.Events.trigger('layer:' + element.data('layer'));
    }

  });

  return ToolbarView;

});
