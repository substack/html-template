var template = require('../');
var fs = require('fs');
var path = require('path');

var html = read('skills.html').pipe(template());
var skills = html.template('skill');
html.pipe(process.stdout);

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

function read (file) {
    return fs.createReadStream(path.join(__dirname, file));
}
