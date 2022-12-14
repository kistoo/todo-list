import './style.css';
import { dataStorage } from './dataStorage.js';
import { loadHeader } from './loadHeader';
import { loadSidebar } from './loadSidebar.js';
import { loadContent } from './loadContent';

loadHeader();
loadSidebar();
dataStorage.categories.addTodo('Odin projects','cook','2022-12-15','one')
dataStorage.categories.addTodo('Debts','cook','2022-12-15','four')
dataStorage.categories.addTodo('Today','cook','2022-12-15','two')
dataStorage.categories.addTodo('Today','cook','2022-12-15','one')
dataStorage.categories.addTodo('Today','cook','2022-12-15','five')
dataStorage.categories.addTodo('Today','cook','2022-12-15','three')
dataStorage.categories.addTodo('Today','cook','2022-12-15','four')

loadContent(dataStorage.categories.getCategory());