import Ember from 'ember';

const SearchParamsBreadcrumbs = Ember.Component.extend({
});

SearchParamsBreadcrumbs.reopenClass({
  positionalParams: ['searchQueryParams'],
});

export default SearchParamsBreadcrumbs;
