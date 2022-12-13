import { dataStorage } from "./dataStorage";
import trash from './images/delete.svg';
import plus from './images/plus.svg';

function loadContent(category = dataStorage.categories.getCategory("Today")) {
    //empties actual content
    const content = document.getElementById('content');
    content.innerHTML = "";
    const list = document.createElement('ul');
    list.className = "todos";

    const importance5 = document.createElement('div');
    const importance4 = document.createElement('div');
    const importance3 = document.createElement('div');
    const importance2 = document.createElement('div');
    const importance1 = document.createElement('div');
    const importance0 = document.createElement('div');
    
    let hasTodos = false;
    //imports todos
    category.todos.forEach((todo) => {
        hasTodos = true;

        const tododiv = document.createElement('div');
        tododiv.className = "todo";

        const left = document.createElement('div');
        left.className = "left";
        const importance = document.createElement('div');
        importance.className = `importance ${todo.priority}`;
        left.appendChild(importance);
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = "isdone";
        if (todo.priority.includes("done") === true) {
            checkbox.checked = true;
        }
        checkbox.addEventListener('click',() => {
            if (todo.priority.includes("done") === false) {
                todo.priority += " done";
            } else {
                todo.priority = todo.priority.replace(" done","");
            }
            loadContent(category);
        });
        left.appendChild(checkbox);
        const name = document.createElement('h2');
        name.textContent = todo.name;
        left.appendChild(name);
        tododiv.appendChild(left);

        const right = document.createElement('div');
        right.className = "right";
        //replace later with actual date 
        const date = document.createElement('h2');
        date.textContent = todo.dueDate;
        right.appendChild(date);
        const deleteIcon = new Image();
        deleteIcon.src = trash;
        right.appendChild(deleteIcon);
        tododiv.appendChild(right);

        //orders by priority

        if (todo.priority.includes("done") === true) {
            importance0.appendChild(tododiv);
        } else {
            switch (todo.priority) {
                case "one":
                    importance1.appendChild(tododiv);
                    break;
                case "two":
                    importance2.appendChild(tododiv);
                    break;
                case "three":
                    importance3.appendChild(tododiv);
                    break;
                case "four":
                    importance4.appendChild(tododiv);
                    break;
                case "five":
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
    if (category.name === "Today") {
        const firstrow = document.createElement('div');
        const greeting = document.createElement('h1');
        greeting.textContent = "Good Morning!";
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
            text.textContent = "Today you are free! There is nothing to do :D";
            content.appendChild(text);
        } else {
            text.textContent = "Today, you have this things to do:";
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
        
        if (hasTodos === false) {
            const text = document.createElement('h3');
            text.textContent = 'There is nothing to do here, add activities with the "+" button';
            content.appendChild(text);
        } else {
            content.appendChild(list);
        }
    }

}


export {loadContent}