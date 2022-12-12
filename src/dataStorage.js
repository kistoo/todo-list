const dataStorage = (() => {

    //admins categories
    const categories = (() => {

        const categoriesFactory = (name) => {
            let todos = [];
            return {
                name,
                todos
            }
        }

        let names = [categoriesFactory("Today"),categoriesFactory("Odin projects"),categoriesFactory("Social"),categoriesFactory("Debts")];
        
        const getCategories = function() {
            return names;
        }

        const getCategory = function(name) {
            const index = getIndex(name,array);
            return names[index];
        }

        const addCategory = function(name) {
            names.push(name);
        }

        const removeCategory = function(category) {
            names.splice(getIndex(category,names),1);
            addTodo("Today","cook","nothing","tomorrow","!!!",false)
            removeTodo("Today","cook");
            console.log(names)
        }

        //gets index of object.name in names
        const getIndex = function(name,array) {
            let index;
            for (let i = 0 ; i < array.length; i++) {
                if (array[i].name === name) {
                    index = i;
                }
            }
            return index;
        }

        //todos

        const todosFactory = (category,name,description,dueDate,priority,isDone) => {
            return {
                category,
                name,
                description,
                dueDate,
                priority,
                isDone
            };
        }

        const addTodo = function(category,name,description,dueDate,priority,isDone) {
            const newTodo = todosFactory(category,name,description,dueDate,priority,isDone);
            names[getIndex(category,names)].todos.push(newTodo);
        }

        const removeTodo = function(category, name) {
            const todoCategory = names[getIndex(category,names)];
            const todos = todoCategory.todos;
            const todo = todos[getIndex(name,todos)];
            todos.splice(getIndex(name,todos))
        }

        return {
            getCategories,
            getCategory,
            addCategory,
            removeCategory
        }

    })();
    
    return {
        categories
    }

})();

export {dataStorage}