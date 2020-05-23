const { shell } = require('electron');

console.log('olá');

document.querySelectorAll('a').forEach(elm => {
  elm.addEventListener('click', (event) => {
    event.preventDefault();
    shell.openExternal(event.target.href);
  });
});