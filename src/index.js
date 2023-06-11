import "./style.css";
import * as UI from "./user-interface";

function initialPageLoad() {
  UI.initDomLoad();
  UI.initUI();
}

document.addEventListener("DOMContentLoaded", initialPageLoad());
