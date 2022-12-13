import { dataStorage } from "./dataStorage";
import { loadContent } from "./loadContent";
import plus from "./images/plus.svg";

function loadSidebar() {
    const sidebar = document.getElementById('sidebar');

    //gets array with categories
    const categories = dataStorage.categories.getCategories();
    categories.forEach((category) => {
        const newCategory = document.createElement('div');
        newCategory.className = "category";
        newCategory.textContent = category.name;
        sidebar.appendChild(newCategory);
        //adds event listeners for content
        newCategory.addEventListener('click',()=>{
            loadContent(category);
        })
    })
    const addCategory = document.createElement('div');
    addCategory.className = "add";
    addCategory.textContent = "Add category";
    const add = new Image();
    add.src = plus;
    addCategory.appendChild(add);
    sidebar.appendChild(addCategory);
}

export {loadSidebar};