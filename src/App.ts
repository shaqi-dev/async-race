import appendParent from './utils/appendParent';
import ViewPanel from './components/ViewPanel';
import initGarage from './components/Garage';
import store from './store';

interface AppObj {
  container: HTMLDivElement;
  header: HTMLElement;
  main: HTMLElement;
}

const App = async (): Promise<AppObj> => {
  // App container
  const container = appendParent(document.createElement('div'), 'body');
  container.id = 'app';

  // Header & Main layouts
  const header = appendParent(document.createElement('header'), '#app');
  const main = appendParent(document.createElement('main'), '#app');
  header.id = 'header';
  main.id = 'main';

  // Garage & Winners selectors panel
  store.viewPanel = ViewPanel('#header');
  store.viewPanel.garageBtn.addEventListener('click', () => console.log('Garage'));
  store.viewPanel.winnersBtn.addEventListener('click', () => console.log('Winners'));

  // Garage
  initGarage();

  return {
    container,
    header,
    main,
  };
};

export default App;
