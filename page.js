
var _ = require('underscore');
var pile = require('../aiport-pile/pile.js');
var piler = require('../aiport-dev/dev.js').pile;
// TODO: add recursive population to pagelet

// TODO: can we get around this mongoose thing?
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var schema = { name: String, 
	       route: String, 
	       pagelets: [ { type: Schema.Types.ObjectId,
			     ref: "pagelet" } ] };

// TODO: this is slow
var populator = pagelet_id =>
    pile('pagelet').first({'_id':pagelet_id});

var populatorer = page =>
    Promise.all( page.pagelets.map( populator ) ).then( pagelets => _.extend( page, { pagelets: pagelets } ) );

var controllers = model => ({
    fetch: data => model.find( data ).then( pages => Promise.all( pages.map( populatorer ) ) )
});

// TODO: population
module.exports = piler( "page", schema, controllers );
