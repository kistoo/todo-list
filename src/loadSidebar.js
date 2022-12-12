function loadSidebar() {
    const sidebar = document.getElementById('sidebar');
    const categories = ["Today","Odin projects","Social","Debts"];

    //this function need to be in dataStorage module
    categories.forEach((category)=> {
        const newCategory = document.createElement('div');
        newCategory.className = "category";
        newCategory.textContent = category;
        sidebar.appendChild(newCategory);
    })
}

export {loadSidebar};