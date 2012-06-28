//     Backbone GetSet 0.0.1
//
//     by Ian Storm Taylor
//     https://github.com/ianstormtaylor/backbone-getset
;(function (_, Backbone) {
  if (_ === undefined) throw new Error('Couldn\'t find Underscore');
  if (Backbone === undefined) throw new Error('Couldn\'t find Backbone');

  Backbone.mixin || (Backbone.mixin = {});
  Backbone.mixin.getset = function (store) {
    store || (store = 'options');

    // Augment `_configure` to set all options on configure, so that if
    // transformation is needed via a custom method that occurs.
    var _configure = this.prototype._configure;
    this.prototype._configure = function (options) {
      _configure.apply(this, arguments);
      _.each(this[store], function (value, key) {
        this.set(key, value);
      }, this);
    };

    // Simple getter that just grabs from the store. If a `getKey` function exists for a given key, we'll use that to get the key instead. This is helpful when you need a bit of customization.
    this.prototype.get = function (key) {
      var getKey = 'get' + key.charAt(0).toUpperCase() + key.slice(1);
      if (typeof this[getKey] === 'function') return this[getKey]();
      return this[store][key];
    };

    // Set function modeled after Backbone.Model that just sets things into the store but allows for events to be fired. Like the getter, if a helper function exists we'll set the value to whatever it returns instead, and pass the value they passed in to it.
    this.prototype.set = function (key, value, options) {
      options || (options = {});
      var setKey = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
      if (typeof this[setKey] === 'function') value = this[setKey](value);
      // Make sure there's actually a change.
      if (_.isEqual(value, this[store][key])) return this;
      this[store][key] = value;
      if (!options.silent) this.trigger('change:' + key, this, value);
    };

    // Helper to check whether an option is not defined or null, modeled after Backbone.Model.
    this.prototype.has = function (key) {
      return this.get(key) != null;
    };

  };
}(_, Backbone));