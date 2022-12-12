import checklist from './images/format-list-checks.svg';

function loadHeader() {
    const header = document.getElementById('header');

    const logo = document.createElement('div');
    logo.className = "logo";
    const img = new Image();
    img.src = checklist;
    logo.appendChild(img);
    const h1 = document.createElement('h1');
    h1.textContent = "TodoList";
    logo.appendChild(h1);
    header.appendChild(logo);
}
 export {loadHeader}