import { dataStorage } from './dataStorage';
import trash from './images/delete.svg';
import plus from './images/plus.svg';
import { compareAsc, format } from 'date-fns';

function loadContent(category = dataStorage.categories.getCategory('Today')) {
  //empties actual content
  const content = document.getElementById('content');
  content.innerHTML = '';
  //sorts by importance
  const list = document.createElement('ul');
  list.className = 'todos';
  const importance5 = document.createElement('div');
  const importance4 = document.createElement('div');
  const importance3 = document.createElement('div');
  const importance2 = document.createElement('div');
  const importance1 = document.createElement('div');
  const importance0 = document.createElement('div');
  let hasTodos = false;
  //imports todos
  category.todos.forEach((todo) => {
    //checks there are todos not done
    if (todo.priority.includes('done') === false) {
        hasTodos = true;
    }
    const tododiv = document.createElement('div');
    tododiv.className = 'todo';
    //left side of todo
    const left = document.createElement('div');
    left.className = 'left';
    const importance = document.createElement('div');
    importance.className = `importance ${todo.priority}`;
    left.appendChild(importance);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'isdone';
    if (todo.priority.includes('done') === true) {
      checkbox.checked = true;
    }
    //change priority value
    checkbox.addEventListener('click', () => {
      if (todo.priority.includes('done') === false) {
        todo.priority += ' done';
      } else {
        todo.priority = todo.priority.replace(' done','');
      }
      loadContent(category);
    });
    left.appendChild(checkbox);
    const name = document.createElement('h2');
    name.textContent = todo.name;
    left.appendChild(name);
    tododiv.appendChild(left);
    //right side of todo
    const right = document.createElement('div');
    right.className = 'right';
    const textDate = document.createElement('h2');
    textDate.textContent = todo.dueDate;
    const date = document.createElement('input');
    date.type = 'date';
    date.value = todo.dueDate;
    date.style.display = 'none';
    //changes due date value
    textDate.addEventListener('click', () => {
      right.removeChild(textDate);
      date.style.display = 'block';
      date.focus();
      date.addEventListener('change', () => {
        todo.dueDate = date.value;
        right.appendChild(date);
      })  
      date.addEventListener('blur', () => {
        loadContent(category);
      })
    })
    right.appendChild(date);
    right.appendChild(textDate);
    const deleteIcon = new Image();
    deleteIcon.src = trash;
    right.appendChild(deleteIcon);
    tododiv.appendChild(right);
    //deletes todo
    deleteIcon.addEventListener('click', () => {
        dataStorage.categories.removeTodo(category.name, todo.name);
        loadContent(category);
    })
    //orders by priority
    if (todo.priority.includes('done') === true) {
      importance0.appendChild(tododiv);
    } else {
      switch (todo.priority) {
        case 'one':
          importance1.appendChild(tododiv);
          break;
        case 'two':
          importance2.appendChild(tododiv);
          break;
        case 'three':
          importance3.appendChild(tododiv);
          break;
        case 'four':
          importance4.appendChild(tododiv);
          break;
        case 'five':
          importance5.appendChild(tododiv);
          break;           
      }
    }
  });
  list.appendChild(importance5);
  list.appendChild(importance4);
  list.appendChild(importance3);
  list.appendChild(importance2);
  list.appendChild(importance1);
  list.appendChild(importance0);
  //category = today
  if (category.name === 'Today') {
    const firstrow = document.createElement('div');
    const greeting = document.createElement('h1');
    greeting.textContent = 'Good Morning!';
    firstrow.appendChild(greeting);
    const settings = document.createElement('div');
    const add = new Image();
    add.src = plus;
    settings.appendChild(add);
    const remove = new Image();
    remove.src = trash;
    settings.appendChild(remove);
    firstrow.appendChild(settings);
    content.appendChild(firstrow);
    const text = document.createElement('h3');
    //verifies if theres a todo
    if (hasTodos === false) {
      text.textContent = 'Today you are free! There is nothing to do :D';
      content.appendChild(text);
    } else {
      text.textContent = 'Today, you have this things to do:';
      content.appendChild(text);
      content.appendChild(list);
    }
  } else { //category = another category
    const firstrow = document.createElement('div');
    const categoryName = document.createElement('h1');
    categoryName.textContent = category.name;
    firstrow.appendChild(categoryName);
    const settings = document.createElement('div');
    const add = new Image();
    add.src = plus;
    settings.appendChild(add);
    const remove = new Image();
    remove.src = trash;
    settings.appendChild(remove);
    firstrow.appendChild(settings);
    content.appendChild(firstrow);
    //initial message  
    if (hasTodos === false) {
      const text = document.createElement('h3');
      if (category.todos.length === 0) {
        text.textContent = 'There is nothing to do here, add activities with the '+' button';
        content.appendChild(text);
      } else {
        text.textContent = 'This todos are already done, if you want to clear them all, click on this message.'
        content.appendChild(text);
        content.appendChild(list);
        text.addEventListener('click', () => {
          category.todos = [];
          loadContent(category);
        })
      }
    } else {
      content.appendChild(list);
    }
  }
}

export { loadContent }