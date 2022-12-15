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
  const loadCategories = function(categories) {
    names = categories;
  }
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
    loadCategories,
    getCategories,
    getCategory,
    addCategory,
    removeCategory,
    addTodo,
    removeTodo,
    updateTodayTodos,
  }
  })();
  //local storage
  const local = (() => {
    const storageAvailable = function(type) {
      let storage;
      try {
          storage = window[type];
          const x = '__storage_test__';
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
      }
      catch (e) {
        return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
      }
    }
    const setData = function() {
      localStorage.setItem('todoList', JSON.stringify(categories.getCategories()));
    }

    const callData = function() {
      if (storageAvailable('localStorage')) {
        const localList = JSON.parse(localStorage.getItem('todoList'));
        if (localList != null) {
          categories.loadCategories(localList);
        }
      }
    }
    return {
      callData,
      setData
    }
  })();
  return {
    categories,
    local
  }
})();

export { dataStorage }