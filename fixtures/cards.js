/*
 *  File: cards.js
 *  Type: DataFixture
 *  Generated by: Mongoose-Fixture (v0.3.0)
 *
 */

var fs = require('fs'),
    _ = require('underscore'),
    path = require('path');

module.exports = function(mongoose, conn, callback) {

    var initCards = JSON.parse(fs.readFileSync(path.resolve(__dirname, './total_cards_v1.json'), 'UTF-8'));

    // standard callback error
    var error = null;

    // create your data documents using object-literals
    var fixture = [];

    _.each(initCards.cards, function(jcard) {

        fixture.push({
            card_name: jcard.card_name,
            card_type: jcard.card_type,
            occupation: jcard.occupation,
            rarity: jcard.rarity,
            race: jcard.race,
            cost: jcard.cost,
            attack: jcard.attack,
            health_power: jcard.health_power,
            content: jcard.content,
            abilities: jcard.abilities,
            artist_name: jcard.artist_name,
            flavor_text: jcard.flavor_text,
            big_icon: jcard.big_icon,
            small_icon: jcard.small_icon,
            premium_icon: jcard.premium_icon,
            evaluation: jcard.evaluation
        });
    });

    return callback(error, fixture);
};
