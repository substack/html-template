var hyperglue = require('hyperglue');

module.exports = function () {
    return { template: template };
    
    function template (name) {
        var t = document.querySelector('[template="' + name + '"]');
        return { create: create, write: write, end: end };
        
        function create (row) {
            var e = t.cloneNode(true);
            e.removeAttribute('template');
            e.removeAttribute('style');
            return hyperglue(e, row);
        }
        function write (row) {
            var e = create(row);
            t.parentNode.appendChild(e);
        }
        function end () {}
    }
};
