import { dataStorage } from "./dataStorage";

function loadContent(category = dataStorage.categories.getCategory("Today")) {
    //empties actual content
    const content = document.getElementById('content');
    content.innerHTML="";

    if (category.name === "Today") {
        const greeting = document.createElement('h1');
        greeting.textContent = "Good Morning!";
        content.appendChild(greeting);

        const text = document.createElement('h3');
        text.textContent = "Today, you have this thing to do:";
        content.appendChild(text);

        const list = document.createElement('ul');
        //sort todos by importance
        const importance5 = document.createElement('ul');
        importance5.textContent = "!!!!!";
        importance5.style.color="#b91c1c";
        const importance4 = document.createElement('ul');
        importance4.textContent = "!!!!";
        importance4.style.color="#c2410c";
        const importance3 = document.createElement('ul');
        importance3.textContent = "!!!";
        importance3.style.color="#a16207";
        const importance2 = document.createElement('ul');
        importance2.textContent = "!!";
        importance2.style.color="#15803d";
        const importance1 = document.createElement('ul');
        importance1.textContent = "!";
        importance1.style.color="#0e7490";
        category.todos.forEach((todo) => {
            const thingToDo = document.createElement('li');
            thingToDo.textContent = todo.name;
            switch (todo.priority) {
                case "!!!!!":
                    importance5.appendChild(thingToDo);
                    break;
                case "!!!!":
                    importance4.appendChild(thingToDo);
                    break;
                case "!!!":
                    importance3.appendChild(thingToDo);
                    break;
                case "!!":
                    importance2.appendChild(thingToDo);
                    break;
                case "!":
                    importance1.appendChild(thingToDo);
                    break;
            }
        })
        if (importance5.children.length > 0) {
            list.appendChild(importance5);
        }
        if (importance4.children.length > 0) {
            list.appendChild(importance4);
        }
        if (importance3.children.length > 0) {
            list.appendChild(importance3);
        }
        if (importance2.children.length > 0) {
            list.appendChild(importance2);
        }
        if (importance1.children.length > 0) {
            list.appendChild(importance1);
        }
        content.appendChild(list);
    }



}


export {loadContent}