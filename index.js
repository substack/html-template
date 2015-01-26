var trumpet = require('trumpet');
var inherits = require('inherits');
var concat = require('concat-stream');
var through = require('through2');
var Duplex = require('readable-stream').Duplex;
var hyperglue = require('hyperglue');
var isbuffer = require('buffer').Buffer.isBuffer;
var copy = require('shallow-copy');
var hyperstream = require('hyperstream');

module.exports = Templates;
inherits(Templates, Duplex);

function Templates () {
    if (!(this instanceof Templates)) return new Templates;
    var self = this;
    Duplex.call(this);
    this._trumpet = trumpet();
    this._trumpet.on('readable', function () {
        self._read();
    });
    this.on('finish', function () {
        self._trumpet.end();
    });
    this._trumpet.on('end', function () {
        self.push(null);
    });
}

Templates.prototype._write = function (buf, enc, next) {
    this._trumpet._write(buf, enc, next);
};

Templates.prototype._read = function () {
    var buf;
    while ((buf = this._trumpet.read()) !== null) {
        this.push(buf);
    }
};

Templates.prototype.template = function (name, opts) {
    if (!opts) opts = {};
    var key = '[template="' + name + '"]';
    var s = this._trumpet.createStream(key, { outer: true });

    var html = null, pending = 2;
    s.pipe(concat(function (body) {
        if (opts.include !== false) {
            s.write(body.toString('utf8')
                .replace(/>/, ' style="display:none">')
            );
        }
        var h = hyperstream({ '*:first': { template: undefined } });
        h.pipe(concat(function (hbody) {
            html = hbody;
            if (row_) write(row_, null, next_);
        }));
        h.end(body);
        end();
    }));
    var row_, next_;
    return through.obj(write, end);

    function write (row, enc, next) {
        if (html === null) {
            row_ = row;
            next_ = next;
            return;
        }
        var params = copy(row);
        var hs = hyperstream(params);
        hs.pipe(s, { end: false });
        hs.once('end', next);
        hs.end(html);
    }
    function end () { if (-- pending === 0) s.end() }
};

function isstream (stream) {
    return stream && typeof stream === 'object'
        && typeof stream.pipe === 'function'
    ;
}
