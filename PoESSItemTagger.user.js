// ==UserScript==
// @name        PoESmartShopperItemTagger
// @namespace   https://github.com/concacid
// @include     http://poe.trade/search/*
// @version     1.0
// @license     MIT License
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);


insertStyles();
insertTags();
attachItemTaggerEvents();
var taggedItems = [];


function attachItemTaggerEvents() {
  $('.item-tagger-control>.tagger-switch>input').change(function() {
    updateItemVis();
  });

  $('.item-tagger>.tagger-switch>input').change(function() {
    var thisItemId = $(this).closest('.item').prop('id');
    if ($(this).is(':checked')) {
      taggedItems.push(thisItemId);
      console.log(taggedItems);
    } else {
      var i = taggedItems.indexOf(thisItemId);
      if (i > -1) {
        taggedItems.splice(i, 1);
        console.log(taggedItems);
      }
    }

    updateItemVis();
  });

  $('#item-tagger-top-bar-reset').click(function() {
    $('.item-tagger>.tagger-switch>input').prop('checked', false);
    $('.item-tagger-control>.tagger-switch>input').prop('checked', false);
    resetAll();
  });

  $('#item-tagger-top-bar-tagall').click(function() {
    $('.item-tagger>.tagger-switch>input').prop('checked', true);
    $('.item-tagger>.tagger-switch>input').trigger('change');
  });
}

function updateItemVis() {
  if ($('.item-tagger-control>.tagger-switch>input').is(':checked')) {
    $('.item').addClass('tagger-hide-item');
    for (var i = 0; i < taggedItems.length; i++) {
      $('#' + taggedItems[i]).removeClass('tagger-hide-item');
    }
  } else {
    $('.item').removeClass('tagger-hide-item');
  }
}

function resetAll() {
  $('.item-tagger-control>.tagger-switch>input').prop('checked', false);
  taggedItems = [];
  updateItemVis();
}

function insertTags() {
  switchHtml_ = '<label class="tagger-switch">' +
                '  <input type="checkbox">' +
                '  <div class="tagger-slider"></div>' +
                '  </label>';

  resetHtml_ = '<button class="item-tagger-tob-bar-button">Reset Item Tags</button>';
  tagAllHtml_ = '<button class="item-tagger-tob-bar-button">Tag Everything</button>';

  $('<div class="item-tagger" title="Tag/Untag this item"></div>')
    .append(switchHtml_)
    .appendTo('.item>.bottom-row>.first-cell');

  var underCurBar = $('#currency-bar').next();
  if (underCurBar.prop('id') != 'item-tagger-top-bar') {
   underCurBar.css('height', '71px');
  }

  $('<div id="item-tagger-top-bar"></div>')
    .append('<div class="item-tagger-top-bar-left item-tagger-top-bar-right-sep">SS Item Tagger</div>')
    .append('<div class="item-tagger-top-bar-right" id="item-tagger-top-bar-control"></div>')
    .append('<div class="item-tagger-top-bar-right item-tagger-top-bar-left-sep">Show Only Tagged Items</div>')
    .append('<div class="item-tagger-top-bar-right" id="item-tagger-top-bar-reset"></div>')
    .append('<div class="item-tagger-top-bar-right" id="item-tagger-top-bar-tagall"></div>')
    .append('<div class="item-tagger-top-bar-right item-tagger-top-bar-left-sep">Tools</div>')
    .insertAfter('#currency-bar');

  $('<div class="item-tagger-control"></div>')
    .append(switchHtml_)
    .appendTo('#item-tagger-top-bar-control');

    $('#item-tagger-top-bar-reset').append(resetHtml_);
    $('#item-tagger-top-bar-tagall').append(tagAllHtml_);

}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function insertStyles() {
  addGlobalStyle('.tagger-switch {' +
                 '  position: relative;' +
                 '  display: inline-block;' +
                 '  width: 50px;' +
                 '  height: 16px;' +
                 '  border: 1px solid #9f9f9f;' +
                 '  color: #4E4E4E;' +
                 '  font-size: 10px;' +
                 '  font-weight: bold;' +
                 '  line-height: 14px;' +
                 '}');

  addGlobalStyle('.tagger-switch input {display:none;}');

  addGlobalStyle('.tagger-slider {' +
                 '  position: absolute;' +
                 '  cursor: pointer;' +
                 '  top: 0;' +
                 '  left: 0;' +
                 '  right: 0;' +
                 '  bottom: 0;' +
                 '  background-color: #333;' +
                 '  -webkit-transition: .3s;' +
                 '  transition: .3s;' +
                 '}');

  addGlobalStyle('.tagger-slider:before {' +
                 '  position: absolute;' +
                 '  content: "";' +
                 '  height: 10px;' +
                 '  width: 22px;' +
                 '  left: 2px;' +
                 '  bottom: 2px;' +
                 '  color: #a79070;' +
                 '  background-color: #9f9f9f;' +
                 '  -webkit-transition: .1s;' +
                 '  transition: .1s;' +
                 '}');

  addGlobalStyle('.tagger-slider:after {' +
                 '  height: 10px;' +
                 '  width: 22px;' +
                 '  text-align: center;' +
                 '  content: "Off";' +
                 '  float: right;' +
                 '}');

  addGlobalStyle('input:checked + .tagger-slider {' +
                 '  background-color: #325627;' +
                 '}');

  addGlobalStyle('input:focus + .slider {' +
                 '  box-shadow: 0 0 1px #2196F3;' +
                 '}');

  addGlobalStyle('input:checked + .tagger-slider:before {' +
                 '  -webkit-transform: translateX(22px);' +
                 '  -ms-transform: translateX(22px);' +
                 '  transform: translateX(22px);' +
                 '}');

  addGlobalStyle('input:checked + .tagger-slider:after {' +
                 '  content: "On";' +
                 '  float: left;' +
                 '  color: #56754C;' +
                 '}');

  addGlobalStyle('.tagger-hide-item {' +
                   '  display: none;' +
                   '}');

  addGlobalStyle('.item-tagger {' +
                 '  position: relative;' +
                 '  margin: auto;' +
                 '  width: 50px;' +
                 '}');

  addGlobalStyle('.item-tagger-control {' +
                 '  position: relative;' +
                 '  display: inline-block;' +
                 '}');

  addGlobalStyle('#item-tagger-top-bar {' +
                 '	 max-width: 100%;' +
                 '  width: 100%;' +
                 '  position: fixed;' +
                 '  top: 37px;' +
                 '  background-color:#0F0F0F;' +
                 '  border-bottom:1px solid #302E2E;' +
                 '  color:#DCD3C3;' +
                 '  z-index: 19999;' +
                 '}');

  addGlobalStyle('.item-tagger-top-bar-left {' +
                 '  float: left;' +
                 '  padding: 10px;' +
                 '  height: 36px;' +
                 '  background-color: #0F0F0F;' +
                 '}');

  addGlobalStyle('.item-tagger-top-bar-right {' +
                 '  float: right;' +
                 '  padding: 10px;' +
                 '  height: 36px;' +
                 '  background-color: #0F0F0F;' +
                 '}');

  addGlobalStyle('.item-tagger-top-bar-left-sep {' +
                 '  border-left:1px solid #302E2E;' +
                 '}');

  addGlobalStyle('.item-tagger-top-bar-right-sep {' +
                 '  border-right:1px solid #302E2E;' +
                 '}');

  addGlobalStyle('.item-tagger-tob-bar-button {' +
                 '  font-size: 0.7em;' +
                 '  height: 20px;' +
                 '  margin: 0;' +
                 '  overflow: hidden;' +
                 '  padding: 3px;' +
                 '}');
}


var domMutObserver = new MutationObserver(function(mutations) {
  insertTags();
  attachItemTaggerEvents();
  resetAll();
  mutations.forEach(function(mutation) {
	});
});

$.each($('.search-results-block'), function(i, node) {
  domMutObserver.observe(node, { attributes: true, childList: true, characterData: true });
});
