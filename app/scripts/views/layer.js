'use strict';

define([
  'underscore',
  'backbone',
  'handlebars',
  'cartodb',
  'text!../../templates/infowindow.handlebars'
], function(_, Backbone, Handlebars, cartodbLib, tpl) {

  var LayerView = Backbone.View.extend({

    options: {
      user_name: 'ecometro',
      type: 'cartodb'
    },

    template: tpl,

    setLayer: function(map, sublayerOptions) {
      var self = this;

      this.options = _.extend(this.options, {
        sublayers: [sublayerOptions]
      });

      this.map = map;

      cartodb.createLayer(map, this.options).on('done', function(layer) {
        self.layer = layer;
        self.setInfowindow();
      }).addTo(map);
    },

    removeLayer: function() {
      this.map.removeLayer(this.layer);
      this.layer = null;
    },

    setInfowindow: function() {
      if (this.infowindow) {
        this.infowindow.remove();
      }

      this.infowindow = cdb.vis.Vis.addInfowindow(this.map, this.layer.getSubLayer(0), this.options.sublayers[0].interactivity, {
        infowindowTemplate: this.template,
        templateType: 'handlebars'
      });
    },

  });

  return LayerView;

});
