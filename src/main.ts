import '../src/style.css'
import { FoxRouter } from '../fox/core/src/module/router/router';
import { MainPage } from './App/shared/pages/mainPage';
import { UserConfigPage } from './App/shared/pages/UserConfigPage';
import { actionStack } from '../fox/action.stack';
import generarAleatorio from '../fox/core/src/module/fox-copiler-ascHtml/main';
import { headerGeneration } from '../fox/core/src/module/fox-copiler-ascHtml/input/header';

actionStack.subscribe((item) => {
  if (item.action === 'click') {
    alert(`Action Triggered: ${item.action} on ${item.tagName} (ID: ${item.id})`);
  }
});

import { CadastroPage } from './App/shared/pages/cadastroPage';
import { HomePage } from './App/shared/pages/homePage';

const routes = {
  "/": MainPage,
  "/userConfig": { page: UserConfigPage, private: true },
  "/registration": CadastroPage,
  "/home": { page: HomePage, private: true },
};

document.addEventListener('DOMContentLoaded', () => {

  const router = new FoxRouter(routes);
  router.start();

  const app = document.querySelector("#app")

  if (app?.innerHTML) {
    generarAleatorio(app.innerHTML)
  }

  console.log(headerGeneration)

});
