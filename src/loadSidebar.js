import { dataStorage } from './dataStorage';
import { loadContent } from './loadContent';
import plus from './images/plus.svg';

function loadSidebar(selected = 'Today') {
  dataStorage.local.setData();
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = '';
  //gets array with categories
  const categories = dataStorage.categories.getCategories();
  categories.forEach((category) => {
    const newCategory = document.createElement('div');
    newCategory.className = 'category';
    newCategory.textContent = category.name;
    if (selected === category.name) {
      newCategory.className = 'category selected';
    }
    sidebar.appendChild(newCategory);
    //adds event listeners for content
    newCategory.addEventListener('click', () => {
      loadContent(category);
      loadSidebar(category.name);
    })
  })
  const addCategory = document.createElement('div');
  addCategory.className = 'add';
  addCategory.textContent = 'Add category';
  const add = new Image();
  add.src = plus;
  addCategory.appendChild(add);
  sidebar.appendChild(addCategory);
  //event listner to create new category
  addCategory.addEventListener('click', () => {
    sidebar.removeChild(addCategory)
    const input = document.createElement('input');
    input.type = 'text';
    sidebar.appendChild(input); 
    input.focus();
    input.addEventListener('keydown', (key) => {
      if (key.key === 'Enter' && input.value !== '') {
        if (dataStorage.categories.getCategory(input.value) === undefined) {
          dataStorage.categories.addCategory(input.value);
        }
        loadSidebar();
      } else if (key.key === 'Escape') {
        loadSidebar();
      }
    });
    input.addEventListener('blur', () => {
      loadSidebar();
    })
  })
}

export { loadSidebar };