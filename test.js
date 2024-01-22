const start = async function() {
    const lib = require('./index.js');
    var res = await lib.handler({vid: "xxx", pid: "yyy"});
    console.log(res)
}

start()