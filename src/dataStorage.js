import { lightFormat, startOfToday } from "date-fns";

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
  let names = [categoriesFactory('Today')];
  const getCategories = function() {
    return names;
  }
  const getCategory = function(name) {
    const index = getIndex(name,names); 
    return names[index];
  }
  const addCategory = function(name) {
    const newCategory = categoriesFactory(name);
    names.push(newCategory);
  }
  const removeCategory = function(category) {
    names.splice(getIndex(category,names),1);
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
  const todosFactory = (category,name,dueDate,priority) => {
    return {
      category,
      name,
      dueDate,
      priority
    };
  }
  const addTodo = function(category,name,dueDate,priority) {
    const newTodo = todosFactory(category,name,dueDate,priority);
    names[getIndex(category,names)].todos.push(newTodo);
  }
  const removeTodo = function(category, name) {
    const todoCategory = names[getIndex(category,names)];
    const todos = todoCategory.todos;
    todos.splice(getIndex(name,todos))
  }
  const updateTodayTodos = function() {
    names[0].todos = [];
    names.forEach((category) => {
      if (category.name !== 'Today') {
        category.todos.forEach((todo) => {
          if (lightFormat(new Date(startOfToday()), 'yyyy-MM-dd') === todo.dueDate) {
            names[0].todos.push(todo);
          }
        });
      }
    });
  }

  return {
    getCategories,
    getCategory,
    addCategory,
    removeCategory,
    addTodo,
    removeTodo,
    updateTodayTodos
  }
  })();
    
  return {
    categories
  }
})();

export { dataStorage }