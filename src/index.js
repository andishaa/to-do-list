import './style.css';
import { initUI } from './user-interface';
import { initDomLoad } from './DOM';

function initialPageLoad() {
    initDomLoad();
    initUI();
}

document.addEventListener('DOMContentLoaded', initialPageLoad())