import { dataStorage } from "./dataStorage";
import { loadContent } from "./loadContent";

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
}

export {loadSidebar};