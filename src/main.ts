import '../src/style.css'
import { FoxRouter } from '../fox/core/src/module/router/router';
import { MainPage } from './App/shared/pages/mainPage';
import { AboutPage } from './App/shared/pages/aboutPage';
import { test } from './convert.stringtoobject.test';
import { html } from './App/shared/features/login/ui/cardLogin/card';
import { parseHTML } from '../fox/core/src/module/dom/parserDiv';



import { actionStack } from './action.stack';

console.log(parseHTML(html))
// console.log(parseButton(html))
test()

// Listen for global actions
actionStack.subscribe((item) => {
  if (item.action === 'click') {
    alert(`Action Triggered: ${item.action} on ${item.tagName} (ID: ${item.id})`);
  }
});


const routes = {
  "/": MainPage,
  "/about": AboutPage,
};

document.addEventListener('DOMContentLoaded', () => {
  const router = new FoxRouter(routes);
  router.start();
});



