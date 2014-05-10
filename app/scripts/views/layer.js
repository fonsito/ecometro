'use strict';

define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var LayerView = Backbone.View.extend({

    options: {
      user_name: 'ecometro',
      type: 'cartodb'
    },

    setLayer: function(map, sublayerOptions) {
      var self = this;
      var options = _.extend(this.options, {
        sublayers: [sublayerOptions]
      });

      this.map = map;

      cartodb.createLayer(map, options).on('done', function(layer) {
        self.layer = layer;
      }).addTo(map);
    },

    removeLayer: function() {
      this.map.removeLayer(this.layer);
      this.layer = null;
    }

  });

  return LayerView;

});
