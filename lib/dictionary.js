
var util = require('./util');



// Dictionary
// ==================================
Dictionary = function( /*String|Object*/keyType, /*String|Object*/valType ) {
  if (keyType == null) throw new TypeError('Dictionary constructor requires `keyType` parameter');
  if (valType == null) throw new TypeError('Dictionary constructor requires `valType` parameter');

  Object.defineProperty(this, 'keyType', {
    value    : keyType,
    writable : false
  });

  Object.defineProperty(this, 'valType', {
    value    : valType,
    writable : false
  });
}

