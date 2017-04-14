// Just a little bit of javascript to create a little 
// showcase for all the demos in the repository

const render = data => {
  const container = document.querySelector('.container')
  const demos = data
    .filter(item => item.name !== "index.pug" && 
                    item.name.slice(-4) === ".pug" &&
                    item.name.slice(0,4) !== "wip.")
    .map(item => item.name.replace(".pug", ""))
    .map(name => `<li><a href="${name}.html">${name}</a></li>`);
  container.innerHTML = `<nav><ul>${demos.join('')}</ul></nav>`;
}

const http = (url, callback) => {
  const xhr = new XMLHttpRequest()
  callback = callback || console.log
  xhr.open('GET', url, true)
  xhr.send()
  xhr.onload = () => {
    const data = JSON.parse(xhr.responseText)
    callback(data)
  }
}

http('https://api.github.com/repos/terabaud/css-practise/contents/src', render)
