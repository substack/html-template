var template = require('../');
var http = require('http');
var fs = require('fs');
var st = require('ecstatic')(__dirname + '/static');

var server = http.createServer(function (req, res) {
    if (req.url !== '/') return st(req, res);
    
    var html = template();
    var skills = html.template('skill');
    fs.createReadStream(__dirname + '/static/index.html')
        .pipe(html)
        .pipe(res)
    ;
    skills.write({
        '[key=name]': 'macaroni pictures',
        '[key=level]': '40%'
    });
    skills.write({
        '[key=name]': 'quilting',
        '[key=level]': '5000%'
    });
    skills.write({
        '[key=name]': 'blinky lights',
        '[key=level]': '50%'
    });
    skills.end();
});
server.listen(5000);
