var template = require('../');
var fs = require('fs');
var test = require('tape');
var concat = require('concat-stream');
var expected = fs.readFileSync(__dirname + '/animals/expected.html', 'utf8');

test('animals', function (t) {
    t.plan(1);
    
    var html = template();
    var animals = html.template('animal');
    fs.createReadStream(__dirname + '/animals/index.html')
        .pipe(html)
        .pipe(concat(function (body) {
            t.equal(body.toString('utf8'), expected);
        }))
    ;
    animals.write({
        '[key=picture] img': {
            src: 'https://i.imgur.com/bDuXnL7.jpg'
        },
        '[key=name]': 'Husky',
        '[key=favoriteColor]': {
            _text: 'Blue',
            style: 'background:blue'
        }
    });
    animals.write({
        '[key=picture] img': {
            src: 'https://i.imgur.com/ksHrrso.jpg'
        },
        '[key=name]': 'Polar Bear',
        '[key=favoriteColor]': {
            _text: 'Snow',
            style: 'background:#fafdff'
        }
    });
    animals.end();
});
