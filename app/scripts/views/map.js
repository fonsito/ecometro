'use strict';

define([
  'backbone',
  'cartodb',
  'views/layer',

  'text!../../queries/transports/metro.pgsql',
  'text!../../queries/transports/buses.pgsql',
  'text!../../queries/transports/trains.pgsql',
  'text!../../queries/transports/airports.pgsql',

  'text!../../queries/climatology/flood-zones.pgsql',
  'text!../../queries/climatology/pluviometry.pgsql',

  'text!../../queries/waste-management/green-points.pgsql',
  'text!../../queries/waste-management/landfills.pgsql',
  'text!../../queries/waste-management/sewage-plants.pgsql',

  'text!../../queries/contamination/nitrogen.pgsql',
  'text!../../queries/contamination/phosphorous.pgsql',
  'text!../../queries/contamination/potasium.pgsql'
], function(Backbone, cartodbLib, LayerView) {

  var queries = {
    metro: arguments[3],
    buses: arguments[4],
    trains: arguments[5],
    airports: arguments[6],
    floodZones: arguments[7],
    pluviometry: arguments[8],
    greenPoints: arguments[9],
    landFills: arguments[10],
    sewagePlants: arguments[11]
  };

  var MapView = Backbone.View.extend({

    el: '#mapView',

    options: {
      tiles: 'https://cartocdn_c.global.ssl.fastly.net/base-dark/{z}/{x}/{y}.png',
      center: [40.384212768155045, -3.6529541015625],
      zoom: 11
    },

    initialize: function() {
      var self = this;

      this.createMap();
      this.setTiles();

      this.metroLayer = new LayerView({el: this.el});
      this.busesLayer = new LayerView();
      this.trainsLayer = new LayerView();
      this.airportsLayer = new LayerView();

      this.greenPointsLayer = new LayerView();
      this.landFillsLayer = new LayerView();
      this.sewagePlantsLayer = new LayerView();

      this.floodZonesLayer = new LayerView();
      this.pluviometryLayer = new LayerView();

      Backbone.Events.on('layer:metro', this.setMetroLayer, this);
      Backbone.Events.on('layer:buses', this.setBusesLayer, this);
      Backbone.Events.on('layer:trains', this.setTrainsLayer, this);
      Backbone.Events.on('layer:airports', this.setAirportsLayer, this);

      Backbone.Events.on('layer:greenpoints', this.setGreenPointsLayer, this);
      Backbone.Events.on('layer:landfills', this.setLandfillsLayer, this);
      Backbone.Events.on('layer:sewageplants', this.setSewagePlantsLayer, this);

      Backbone.Events.on('layer:floodzones', this.setFloodZonesLayer, this);
      Backbone.Events.on('layer:pluviometry', this.setPluviometryLayer, this);

      Backbone.Events.on('location', this.setMarker, this);
    },

    createMap: function() {
      this.map = L.map(this.el).setView(this.options.center, this.options.zoom);
    },

    setTiles: function() {
      this.tiles = L.tileLayer(this.options.tiles).addTo(this.map);
    },

    setMetroLayer: function() {
      if (this.metroLayer.layer) {
        this.metroLayer.removeLayer();
      } else {
        this.metroLayer.setLayer(this.map, {
          sql: queries.metro,
          cartocss: '#metro {marker-fill: #ff0000;}',
          interactivity: 'name'
        });
      }
    },

    setBusesLayer: function() {
      if (this.busesLayer.layer) {
        this.busesLayer.removeLayer();
      } else {
        this.busesLayer.setLayer(this.map, {
          sql: queries.buses,
          cartocss: '#autobuses_urbanos {marker-fill: #ffff00;}',
          interactivity: 'name'
        });
      }
    },

    setTrainsLayer: function() {
      if (this.trainsLayer.layer) {
        this.trainsLayer.removeLayer();
      } else {
        this.trainsLayer.setLayer(this.map, {
          sql: queries.trains,
          cartocss: '#tren_cercanias {marker-fill: #00ff00;}',
          interactivity: 'name'
        });
      }
    },

    setAirportsLayer: function() {
      if (this.airportsLayer.layer) {
        this.airportsLayer.removeLayer();
      } else {
        this.airportsLayer.setLayer(this.map, {
          sql: queries.airports,
          cartocss: '#airports {marker-fill: #0000ff;}',
          interactivity: 'name'
        });
      }
    },

    setGreenPointsLayer: function() {
      if (this.greenPointsLayer.layer) {
        this.greenPointsLayer.removeLayer();
      } else {
        this.greenPointsLayer.setLayer(this.map, {
          sql: queries.greenPoints,
          cartocss: '#green_points {marker-fill: #00ff00;}',
          interactivity: 'name'
        });
      }
    },

    setLandfillsLayer: function() {
      if (this.landFillsLayer.layer) {
        this.landFillsLayer.removeLayer();
      } else {
        this.landFillsLayer.setLayer(this.map, {
          sql: queries.landFills,
          cartocss: '#landfills {marker-fill: #0000ff;}',
          interactivity: 'name'
        });
      }
    },

    setSewagePlantsLayer: function() {
      if (this.sewagePlantsLayer.layer) {
        this.sewagePlantsLayer.removeLayer();
      } else {
        this.sewagePlantsLayer.setLayer(this.map, {
          sql: queries.sewagePlants,
          cartocss: '#sewage_plants {marker-fill: #0000ff;}',
          interactivity: 'name'
        });
      }
    },

    setFloodZonesLayer: function() {
      if (this.floodZonesLayer.layer) {
        this.floodZonesLayer.removeLayer();
      } else {
        this.floodZonesLayer.setLayer(this.map, {
          sql: queries.floodZones,
          cartocss: '#zonas_inundables {marker-fill: #0000ff;}',
          interactivity: 'name'
        });
      }
    },

    setPluviometryLayer: function() {
      if (this.pluviometryLayer.layer) {
        this.pluviometryLayer.removeLayer();
      } else {
        this.pluviometryLayer.setLayer(this.map, {
          sql: queries.pluviometry,
          cartocss: '#pluviometry {marker-fill: #3333cc;}',
          interactivity: 'name'
        });
      }
    },

    setNitrogenLayer: function() {
      if (this.pluviometryLayer.layer) {
        this.pluviometryLayer.removeLayer();
      } else {
        this.pluviometryLayer.setLayer(this.map, {
          sql: queries.pluviometry,
          cartocss: '#nitrogen_contamination {marker-fill: #3333cc; poligon-fill: #330000;}',
          interactivity: 'name'
        });
      }
    },

    setPhosphorousLayer: function() {
      if (this.pluviometryLayer.layer) {
        this.pluviometryLayer.removeLayer();
      } else {
        this.pluviometryLayer.setLayer(this.map, {
          sql: queries.phosphorous,
          cartocss: '#phosphorus_contamination {marker-fill: #3333cc;}',
          interactivity: 'name'
        });
      }
    },

    setPotasiumLayer: function() {
      if (this.pluviometryLayer.layer) {
        this.pluviometryLayer.removeLayer();
      } else {
        this.pluviometryLayer.setLayer(this.map, {
          sql: queries.potasium,
          cartocss: '#potasium_contamination {marker-fill: #3333cc;}',
          interactivity: 'name'
        });
      }
    },

    setMarker: function(project) {
      var icon = L.icon({
        iconUrl: 'images/marker.png',
        iconSize: [40, 53]
      });

      var geolatlng = JSON.parse(project.get('latlng')).coordinates;

      var latlng = [geolatlng[1], geolatlng[0]];

      if (this.location) {
        this.map.removeLayer(this.location);
      }

      this.location = L.marker(latlng, {
        icon: icon
      });
      this.location.bindPopup(project.get('name_project'));
      this.location.addTo(this.map);
      this.map.setView(latlng, this.options.zoom);
    }

  });

  return MapView;

});
