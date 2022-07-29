import render from './utils/render';
import ViewSettings from './components/ViewSettings';
import initGarage from './components/Garage';
import store from './store';

interface AppObj {
  container: HTMLDivElement;
  header: HTMLElement;
  main: HTMLElement;
}

const App = async (): Promise<AppObj> => {
  // App container
  const container = render<HTMLDivElement>('div', undefined, 'body');
  container.id = 'app';

  // Header & Main layouts
  const header = render<HTMLElement>('header', undefined, '#app');
  const main = render<HTMLElement>('main', undefined, '#app');
  header.id = 'header';
  main.id = 'main';

  // Garage & Winners view panel
  store.viewSettings = ViewSettings('#header');

  // Garage
  initGarage();

  return {
    container,
    header,
    main,
  };
};

export default App;
