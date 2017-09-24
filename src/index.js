// Just a little bit of javascript to create a little 
// showcase for all the demos in the repository

const $$ = (sel, con) => Array.prototype.slice.call((con || document).querySelectorAll(sel))

const render = data => {
  const container = $$('.container')[0]
  const demos = data
    .filter(item => item.name !== "index.pug" && 
                    item.name.slice(-4) === ".pug" &&
                    item.name.slice(0,4) !== "wip.")
    .map(item => item.name.replace(".pug", ""))
    .map(name => `
        <li class="hidden">
          <a href="${name}.html">
            <iframe src="${name}"></iframe>
            <div>${name}</div>
          </a>
        </li>`);
  container.innerHTML = `<ul>${demos.join('')}</ul>`
  setTimeout(() => $$('.hidden').map(el => el.classList.remove('hidden')), 5)
  
}

const http = (url, callback) => {
  const xhr = new XMLHttpRequest()
  callback = callback || console.log
  xhr.open('GET', url, true)
  xhr.send()
  xhr.onload = () => {
    const data = JSON.parse(xhr.responseText)
    sessionStorage.setItem("repository_content", xhr.responseText)
    callback(data)
  }
}

http('https://api.github.com/repos/terabaud/css-practise/contents/src', render)
if (! navigator.onLine) {
  const offlineData = JSON.parse(sessionStorage.getItem("repository_content"))
  render(offlineData)
}
