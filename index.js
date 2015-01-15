var trumpet = require('trumpet');
var hyperglue = require('hyperglue');
var through = require('through2');
var isarray = require('isarray');

module.exports = function (templates) {
    var tr = trumpet();
    var src = {};
    Object.keys(templates).forEach(function (key) {
        var r = tr.createStream(key, { outer: true });
        var bufs = [];
        r.pipe(through(write, end)).pipe(r);
        
        function write (buf, enc, next) {
            bufs.push(buf);
            next();
        }
        function end () {
            var src = Buffer.concat(bufs);
            var rep = templates[key];
            if (isarray(rep)) {
                for (var i = 0; i < rep.length; i++) {
                    this.push(hyperglue(src, rep[i]).outerHTML);
                }
            }
            else if (typeof rep === 'object') {
                this.push(hyperglue(src, rep).outerHTML);
            }
            this.push(null);
        }
    });
    return tr;
};

function isstream (stream) {
    return stream && typeof stream === 'object'
        && typeof stream.pipe === 'function'
    ;
}
