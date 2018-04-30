'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCSS = exports.tokenize = exports.getStyleTag = exports.makeStyleTag = undefined;

var _index = require('./index');

var _id = require('../utilities/id');

/**
 * Creates the <style> tag, and adds it to the <head>.
 *
 * @returns {NodeElement} <style>
 */
var makeStyleTag = exports.makeStyleTag = function makeStyleTag() {
  var tag = document.createElement('style');
  tag.id = _index.ID;
  tag.type = 'text/css';

  var head = document.getElementsByTagName('head')[0];
  if (head) head.append(tag);

  return tag;
};

/**
 * Retrieves the withStyle <style> tag.
 *
 * @returns {NodeElement} <style>
 */
var getStyleTag = exports.getStyleTag = function getStyleTag() {
  var tag = document.getElementById(_index.ID);
  if (tag) return tag;
  return makeStyleTag();
};

/**
 * Renders the CSSRule with tokenized with the unique ID.
 *
 * @param   {string} id
 * @param   {string} CSSRules
 * @returns {string}
 */
var tokenize = exports.tokenize = function tokenize(id, CSSRules) {
  return '/* ' + id + ' */\n' + CSSRules.trim() + '\n';
};

/**
 * Generates the styleProps with uniqueID for withStyles to consume.
 *
 * @param   {string} CSSRules
 * @returns {object}
 */
var makeCSS = exports.makeCSS = function makeCSS(CSSRules) {
  return {
    id: (0, _id.uuid)(),
    CSSRules: CSSRules
  };
};