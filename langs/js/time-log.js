
function timeLog(msg) {
  var t = (new Date()).toISOString().replace(/[TZ\.]/g, ' ').split(' ').slice(0, 2).join('_').replace(/:/g, '-');
  console.log('QQ - [' + t + '] ' + msg);
}
