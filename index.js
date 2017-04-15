"use strict";

// Just a little bit of javascript to create a little 
// showcase for all the demos in the repository

var render = function render(data) {
  var container = document.querySelector('.container');
  var demos = data.filter(function (item) {
    return item.name !== "index.pug" && item.name.slice(-4) === ".pug" && item.name.slice(0, 4) !== "wip.";
  }).map(function (item) {
    return item.name.replace(".pug", "");
  }).map(function (name) {
    return "\n        <li>\n          <a href=\"" + name + ".html\">\n            <iframe src=\"" + name + "\"></iframe>\n            <div>" + name + "</div>\n          </a>\n        </li>";
  });
  container.innerHTML = "<nav><ul>" + demos.join('') + "</ul></nav>";
};

var http = function http(url, callback) {
  var xhr = new XMLHttpRequest();
  callback = callback || console.log;
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onload = function () {
    var data = JSON.parse(xhr.responseText);
    callback(data);
  };
};

http('https://api.github.com/repos/terabaud/css-practise/contents/src', render);