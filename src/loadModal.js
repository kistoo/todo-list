import { startOfToday, lightFormat } from 'date-fns';
import { dataStorage } from './dataStorage';
import { loadContent } from './loadContent';

function loadModal(category) {
  const content = document.getElementById('content');
  const modalBackground = document.createElement('div');
  modalBackground.id = 'modal';
  content.appendChild(modalBackground);
  const modal = document.createElement('div');
  modalBackground.appendChild(modal);
  const header = document.createElement('div');
  modal.appendChild(header);
  const text = document.createElement('h1');
  text.textContent = 'Add new todo';
  header.appendChild(text);
  const closeButton = document.createElement('h1');
  closeButton.textContent = 'x';
  header.appendChild(closeButton);
  closeButton.addEventListener('click', () => {
    loadContent(category);
  })
  modal.addEventListener('blur', () => {
    loadContent(category);
  })
  //form
  const nameLabel = document.createElement('label');
  nameLabel.for = 'name';
  nameLabel.textContent = 'Name';
  modal.appendChild(nameLabel);
  const nameInput = document.createElement('input');
  nameInput.id = 'name';
  modal.appendChild(nameInput);
  const dateLabel = document.createElement('label');
  dateLabel.for = 'date';
  modal.appendChild(dateLabel);
  const dateInput = document.createElement('input');
  dateInput.id = 'date';
  dateInput.type = 'date';
  dateInput.defaultValue = lightFormat(new Date(startOfToday()), 'yyyy-MM-dd');
  modal.appendChild(dateInput);
  const priorityLabel = document.createElement('label');
  priorityLabel.for = 'priority';
  priorityLabel.textContent = 'Priority';
  modal.appendChild(priorityLabel);
  const priorityInput = document.createElement('select');
  priorityInput.id = 'priority';
  modal.appendChild(priorityInput);
  const priority1 = document.createElement('option');
  priority1.textContent = '!';
  priority1.value = 'one';
  priorityInput.appendChild(priority1);
  const priority2 = document.createElement('option');
  priority2.textContent = '!!';
  priority2.value = 'two';
  priorityInput.appendChild(priority2);
  const priority3 = document.createElement('option');
  priority3.textContent = '!!!!';
  priority3.value = 'three';
  priorityInput.appendChild(priority3);
  const priority4 = document.createElement('option');
  priority4.textContent = '!!!!';
  priority4.value = 'four';
  priorityInput.appendChild(priority4);
  const priority5 = document.createElement('option');
  priority5.textContent = '!!!!!';
  priority5.value = 'five';
  priorityInput.appendChild(priority5);
  const addButton = document.createElement('button');
  addButton.textContent = 'Add todo';
  modal.appendChild(addButton);
  //submit
  addButton.addEventListener('click', () => {
    if (nameInput.value !== "") {
        const name = nameInput.value;
        const date = dateInput.value;
        const priority = priorityInput.value;
        dataStorage.categories.addTodo(category.name, name, date, priority);
        loadContent(category);
    }
  })
}

export { loadModal }