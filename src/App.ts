import render from './utils/render';
import initViewSettings from './components/ViewSettings';
import initGarage from './components/Garage';
import initWinners from './components/Winners';

interface AppObj {
  container: HTMLDivElement;
  header: HTMLElement;
  main: HTMLElement;
}

const App = async (): Promise<AppObj> => {
  // App container
  const container = render<HTMLDivElement>('div', null, 'body');
  container.id = 'app';

  // Header & Main layouts
  const header = render<HTMLElement>('header', null, container);
  const main = render<HTMLElement>('main', null, container);

  // Garage & Winners view panel
  initViewSettings(header);

  // Garage
  initGarage(main);

  // Winners
  initWinners(main);

  return {
    container,
    header,
    main,
  };
};

export default App;
