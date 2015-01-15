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
            var self = this;
            var src = Buffer.concat(bufs);
            var rep = templates[key];
            if (isarray(rep)) {
                for (var i = 0; i < rep.length; i++) {
                    this.push(hyperglue(src, rep[i]).outerHTML);
                }
                this.push(null);
            }
            else if (isstream(rep)) {
                rep.pipe(through.obj(
                    function (row, enc, next) {
                        self.push(hyperglue(src, row).outerHTML);
                        next();
                    },
                    function () {
                        self.push(null);
                    }
                ));
            }
            else if (typeof rep === 'object') {
                self.push(hyperglue(src, rep).outerHTML);
                self.push(null);
            }
            else {
                // ...
            }
        }
    });
    return tr;
};

function isstream (stream) {
    return stream && typeof stream === 'object'
        && typeof stream.pipe === 'function'
    ;
}
