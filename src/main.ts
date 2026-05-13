import '../src/style.css'
import { FoxRouter } from '../fox/core/src/module/router/router';
import { MainPage } from './App/shared/pages/mainPage';
import { AboutPage } from './App/shared/pages/aboutPage';
import { test } from './convert.stringtoobject';
import { html } from './App/shared/features/login/ui/cardLogin/card';
import { parseHTML } from '../fox/core/src/module/dom/parserDiv';
import { PushdownAutomaton } from '../fox/core/src/module/dom/AFD/algebra_linear/hilbert';

import { actionStack } from '../fox/action.stack';

console.log(parseHTML(html))
test()

actionStack.subscribe((item) => {
  if (item.action === 'click') {
    alert(`Action Triggered: ${item.action} on ${item.tagName} (ID: ${item.id})`);
  }
});

import { CadastroPage } from './App/shared/pages/cadastroPage';
import { HomePage } from './App/shared/pages/homePage';

const routes = {
  "/": MainPage,
  "/about": AboutPage,
  "/registration": CadastroPage,
  "/home": { page: HomePage, private: true },
};

document.addEventListener('DOMContentLoaded', () => {
  const router = new FoxRouter(routes);
  router.start();

  const automaton = new PushdownAutomaton("igor");
  automaton.view();
});