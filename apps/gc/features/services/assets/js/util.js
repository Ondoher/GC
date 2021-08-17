/**
 * @file Implements some useful utilities
 */

/**
 * Call this method to clone a value
 *
 * @param value This is any javascript value that can be JSON stringified
 *
 * @returns a copy of the passed value, or undefined if it could not be cloned
 */

var _ = require('underscore');

exports.clone = function(value) {
    try {
        return JSON.parse(JSON.stringify(value));
    } catch (e) {
        console.log(e.stack);
        return undefined;
    }
};

/**
 * Call this method to parse a url into it's various pieces.
 *
 * @param {String} url The url to be parsed
 */
exports.parseUrl = function(url) {
    var parser = document.createElement('a');
    var qs;

    parser.href = url;

// create object from search
    qs = parser.search;

    if (!qs) {
        parser.parts = {};
    } else {
        parser.parts = _.object(_.compact(_.map(qs.slice(1).split('&'), function(item) {
            if (item) {
                return item.split('=');
            }
        })));
    }

    return parser;
};

