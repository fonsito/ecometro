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
      var options = _.extend(this.options, {
        sublayers: [sublayerOptions]
      });

      this.map = map;

      this.layer = cartodb.createLayer(map, options);

      this.layer.addTo(map);
    }

  });

  return LayerView;

});
