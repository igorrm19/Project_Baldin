import '../src/style.css'
import { FoxRouter } from '../fox/core/src/module/router/router';
import { MainPage } from './App/shared/pages/mainPage';
import { AboutPage } from './App/shared/pages/aboutPage';
import { test } from './convert.stringtoobject';
import { html } from './App/shared/features/login/components/cardLogin/card';
import { parseHTML } from '../fox/core/src/module/dom/parserDiv';


import { actionStack } from '../fox/action.stack';

console.log(parseHTML(html))
// console.log(parseButton(html))
test()

actionStack.subscribe((item) => {
  if (item.action === 'click') {
    alert(`Action Triggered: ${item.action} on ${item.tagName} (ID: ${item.id})`);
  }
});


import { RegistrationPage } from './App/shared/pages/registrationPage';
import { HomePage } from './App/shared/pages/homePage';

const routes = {
  "/": MainPage,
  "/about": AboutPage,
  "/registration": RegistrationPage,
  "/home": HomePage,
};

document.addEventListener('DOMContentLoaded', () => {
  const router = new FoxRouter(routes);
  router.start();
});



