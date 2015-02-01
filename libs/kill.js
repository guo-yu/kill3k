var exeq = require('exeq');

module.exports = kill;

function kill(port, callback) {
  var p = port || 3000;
  var killInMacOSX = "lsof -i tcp:" + p + " | grep LISTEN | awk '{print $2}' | xargs kill -9 ";

  exeq(killInMacOSX)
  .then(function(){
    if (!module.parent)
      return goodbye(p)

    if (callback && typeof(callback) === 'function')
      callback(null, true);
  }).catch(function(err){
    if (!module.parent)
      throw err;

    if (callback && typeof(callback) === 'function')
      callback(err);
  });
}

function goodbye(p) {
  console.log(
    '\n  Process running on port %s have been killed, \n  Have a nice day :D\n', 
    p
  );
}
