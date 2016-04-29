var _html = require('./html/html.js');
var _notifier = require('./notifier/notifier.js');

var ISView = {
    html: _html,
    notifier: _notifier
};

global.ISView = ISView;