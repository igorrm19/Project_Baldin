import '../src/style.css'
import { FoxRouter } from '../fox/core/src/module/router/router';
import { MainPage } from './App/shared/pages/mainPage';
import { UserConfigPage } from './App/shared/pages/UserConfigPage';
import { test } from './convert.stringtoobject';
import { html } from './App/shared/features/login/ui/cardLogin/card';
import { parseHTML } from '../fox/core/src/module/dom/parserDiv';
import { PushdownAutomaton } from '../fox/core/src/module/dom/AFD/algebra_linear/hilbert';
import Index from "../index.html?raw"

import { actionStack } from '../fox/action.stack';

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
  "/userConfig": { page: UserConfigPage, private: true },
  "/registration": CadastroPage,
  "/home": { page: HomePage, private: true },
};

document.addEventListener('DOMContentLoaded', () => {

  const data = parseHTML(Index)
  console.log(data)

  const router = new FoxRouter(routes);
  router.start();

  const automaton = new PushdownAutomaton("igor");
  automaton.view();
});