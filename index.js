var fs = require('fs');
var http = require('http');
var request = require('request');

function getPct () {
  var object = JSON.parse(fs.readFileSync('./coverage/coverage-summary.json', 'utf8'));
  return object.total.lines.pct;
}

function badgeColour (pct) {
  if (pct >= 80) {
    return 'green';
  } else if (pct < 80  && pct >= 60) {
    return 'yellow';
  } else {
    return 'red';
  }
}

function returnSVGLink (colour, pct) {
  return 'https://img.shields.io/badge/Coverage-' + pct + '-' + colour + '.png';
}

var badgeLink = returnSVGLink(badgeColour(getPct()), getPct());

var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download(badgeLink, 'coverage.png', function() {
  console.log(badgeLink);
  console.log('done');
});
