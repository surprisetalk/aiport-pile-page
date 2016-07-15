
var piler = require('../aiport-dev/dev.js').pile;

// TODO: can we get around this mongoose thing?
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// BUG: call stack exceeded when nesting > 1
// pagelets, with recursive pagelets
// var pagelet_schema = new Schema( { scrap: String, options: Schema.Types.Mixed } );
// pagelet_schema.add( { pagelets: [ pagelet_schema ] } );
// module.exports = piler( "page", { name: String, route: String, pagelets: [ pagelet_schema ] } );

// KLUDGE: we should use a recursive schema for pagelets 
module.exports = piler( "page", { name: String, route: String, pagelets: [ Schema.Types.Mixed ] } );
