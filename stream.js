var hyperglue = require('hyperglue');
var through = require('through2');

module.exports = function () {
    return { template: template };
    
    function template (name) {
        var t = document.querySelector('[template="' + name + '"]');
        var stream = through.obj(write);
        stream.create = create;
        return stream;
        
        function create (row) {
            var e = t.cloneNode(true);
            e.removeAttribute('template');
            e.removeAttribute('style');
            return hyperglue(e, row);
        }
        function write (row, enc, next) {
            var e = create(row);
            t.parentNode.appendChild(e);
            next();
        }
    }
};
