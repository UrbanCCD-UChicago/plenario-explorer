import Ember from 'ember';
import LeafletBase from './leaflet-base';
/* global L */

export default LeafletBase.extend({

  classNames: ['leaflet-nodes'],

  // Alternate icon color to signal selection
  SelectedIcon: L.Icon.extend({
    options: {
      iconUrl: '/assets/images/marker-red.png',
      iconRetinaUrl: '/assets/images/marker-red-2x.png'
    }
  }),

  DefaultIcon: L.Icon.extend({
    options: {
      iconUrl: '/assets/images/marker-icon.png',
      iconRetinaUrl: '/assets/images/marker-icon-2x.png'
    }
  }),

  selectionChanged: Ember.observer('selectedNode', function() {
    this.updateHighlight();
  }),

  setUpMap() {
    this._super(...arguments);
    const SelectedIcon = this.get('SelectedIcon');
    const selIcon = new SelectedIcon();
    this.set('selectedIcon', selIcon);
    const DefaultIcon = this.get('DefaultIcon');
    const defaultIcon = new DefaultIcon();
    this.set('defaultIcon', defaultIcon);
    this.updateHighlight();
  },

  updateHighlight() {
    const selected = this.get('selectedNode');
    console.log(selected);
    if (!selected) {return;}

    // Clear highlight from previously selected node
    const lastSelected = this.get('lastSelected');
    if (lastSelected) {
      this.setHighlight(this.get('lastSelected'), this.get('defaultIcon'));
    }

    // Highlight the selected node
    this.setHighlight(selected, this.get('selectedIcon'));

    // Remember which node was just selected, so we can clear it later
    this.set('lastSelected', selected);
  },

  setHighlight(nodeId, icon) {
    const marker = this.get('nodeIdToMarker').get(nodeId);
    marker.setIcon(icon);
  },

  addLayer() {
    const selectionAction = this.get('selectionAction');
    const nodeIdToMarker = new Map();
    const addSelectionListeners = function(feature, marker) {
      const nodeId = feature.properties.id;
      nodeIdToMarker.set(nodeId, marker);
      marker.on(
        {
          click: () => {selectionAction(nodeId);}
        });
    };

    this.set('nodeIdToMarker', nodeIdToMarker);
    const layer = L.geoJson(
      this.get('geoJSON'), {onEachFeature: addSelectionListeners}
    );
    this.set('layer', layer);
  }

});
