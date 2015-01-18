var template = require('../');
var fs = require('fs');

var html = template();
var skills = html.template('skill');
fs.createReadStream(__dirname + '/skills.html')
    .pipe(html)
    .pipe(process.stdout)
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
