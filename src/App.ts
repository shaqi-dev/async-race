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

  container.id = 'app';

  store = createStore(header, main, header, main);

  await hydrateComponents();
  
  return {
    container,
    header,
    main,
  };
};

export default App;
