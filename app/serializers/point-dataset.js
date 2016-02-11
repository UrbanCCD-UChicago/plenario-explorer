import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    payload.data.attributes.amount = payload.data.attributes.cost.amount;
    payload.data.attributes.currency = payload.data.attributes.cost.currency;

    delete payload.data.attributes.cost;

    return this._super(...arguments);
  },
});
