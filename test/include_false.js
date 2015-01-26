var template = require('../');
var fs = require('fs');
var test = require('tape');
var concat = require('concat-stream');
var expected = fs.readFileSync(
    __dirname + '/include_false/expected.html', 'utf8'
);

test('include: false', function (t) {
    t.plan(1);
    
    var html = template();
    var skills = html.template('skill', { include: false });
    fs.createReadStream(__dirname + '/include_false/index.html')
        .pipe(html)
        .pipe(concat(function (body) {
            t.equal(body.toString('utf8'), expected);
        }))
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
