import './style.css';
import { dataStorage } from './dataStorage.js';
import { loadHeader } from './loadHeader';
import { loadSidebar } from './loadSidebar.js';
import { loadContent } from './loadContent';

loadHeader();
loadSidebar();
loadContent(dataStorage.categories.getCategory());