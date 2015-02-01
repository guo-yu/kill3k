var exeq = require('exeq');

module.exports = kill;

function kill(port) {
  var p = port || 3000;
  var killInMacOSX = "lsof -i tcp:" + p + " | grep LISTEN | awk '{print $2}' | xargs kill -9 ";

  exeq(killInMacOSX)
  .then(function(){
    goodbye(p);
  }).catch(function(err){
    throw err;
  });
}

function goodbye(p) {
  console.log(
    '  Process running on port %s have been killed, \n  Have a nice day :D\n', 
    p
  );
}
