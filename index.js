var trumpet = require('trumpet');
var inherits = require('inherits');
var concat = require('concat-stream');
var through = require('through2');
var Duplex = require('readable-stream').Duplex;
var fs = require('fs');

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

Templates.prototype.template = function (name) {
    var key = '[template="' + name + '"]';
    var s = this._trumpet.createStream(key, { outer: true });
    
    var html = null;
    s.pipe(concat(function (body) {
        html = body;
        s.write(body.toString('utf8')
            .replace(/>/, ' style="display:none">')
        );
        if (row_) write(row_, null, next_);
    }));
    var row_, next_;
    return through.obj(write, end);
    
    function write (row, enc, next) {
        if (html === null) {
            row_ = row;
            next_ = next;
            return;
        }
        var tr = trumpet();
        tr.select('*', function (elem) {
            elem.removeAttribute('template');
        });
        Object.keys(row).forEach(function (key) {
            tr.createWriteStream(key).end(row[key]);
        });
        tr.pipe(s, { end: false });
        tr.once('end', next);
        tr.end(html);
    }
    function end () { s.end() }
};

function isstream (stream) {
    return stream && typeof stream === 'object'
        && typeof stream.pipe === 'function'
    ;
}
