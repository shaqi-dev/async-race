import render from './utils/render';
import createStore, { Store } from './store';
import hydrateComponents from './utils/hydrateComponents';

interface AppObj {
  container: HTMLDivElement;
  header: HTMLElement;
  main: HTMLElement;
}

export let store: Store;

const App = async (): Promise<AppObj> => {
  const container = render<HTMLDivElement>('div', null, 'body');
  const header = render<HTMLElement>('header', null, container);
  const main = render<HTMLElement>('main', null, container);
  const footer = render<HTMLElement>('footer', null, container);
  const ghLink = render<HTMLAnchorElement>('a', 'footer-link', footer);
  const year = render<HTMLSpanElement>('span', 'footer-info', footer);
  const rsLink = render<HTMLAnchorElement>('a', 'footer-link', footer);
  const ghLogo = render<HTMLImageElement>('img', 'gh-logo', ghLink);
  const rsLogo = render<HTMLImageElement>('img', 'rs-logo', rsLink);

  ghLink.href = 'https://github.com/shaqi-dev';
  rsLink.href = 'https://rs.school/js/';
  year.innerText = '2022';
  ghLogo.src = './assets/svg/gh-logo.svg';
  rsLogo.src = './assets/svg/rsschool-logo.svg';

  container.id = 'app';

  store = createStore(header, main);

  await hydrateComponents();
  
  return {
    container,
    header,
    main,
  };
};

export default App;
