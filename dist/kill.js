'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = kill;

var _Promise = require('bluebird');

var _Promise2 = _interopRequireWildcard(_Promise);

var _exeq = require('exeq');

var _exeq2 = _interopRequireWildcard(_exeq);

function kill() {
  var port = arguments[0] === undefined ? 3000 : arguments[0];

  _exeq2['default']('lsof -i tcp:' + port + ' | grep LISTEN | awk \'{print $2}\' | xargs kill -9 ').then(function () {
    if (!module.parent) return goodbye(port);

    return _Promise2['default'].resolve(true);
  })['catch'](function (err) {
    if (!module.parent) throw err;

    return _Promise2['default'].reject(err);
  });
}

function goodbye(p) {
  console.log('\n  Process running on port %s have been killed, \n  Have a nice day :D\n', p);
}
module.exports = exports['default'];
//# sourceMappingURL=kill.js.map