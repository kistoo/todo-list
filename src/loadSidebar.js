import { dataStorage } from "./dataStorage";

function loadSidebar() {
    const sidebar = document.getElementById('sidebar');

    const categories = dataStorage.categories.getCategory();
    //this function need to be in dataStorage module
    categories.forEach((category)=> {
        const newCategory = document.createElement('div');
        newCategory.className = "category";
        newCategory.textContent = category.name;
        sidebar.appendChild(newCategory);
    })
}

export {loadSidebar};