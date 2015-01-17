var html = require('../')();
var skills = html.template('skill');

skills.write({
    '[key=name]': 'tap dancing',
    '[key=level]': '15%'
});
skills.write({
    '[key=name]': 'baton twirling',
    '[key=level]': '95%'
});
