var template = require('../');
var fs = require('fs');
var path = require('path');

read('skills.html')
  .pipe(template({
    '[template=skill]': [
      {
        '[key=name]': 'macaroni pictures',
        '[key=level]': '40%'
      },
      {
        '[key=name]': 'quilting',
        '[key=level]': '5000%'
      },
      {
        '[key=name]': 'blinky lights',
        '[key=level]': '50%'
      }
    ]
  }))
  .pipe(process.stdout)
;

function read (file) {
  return fs.createReadStream(path.join(__dirname, file));
}
