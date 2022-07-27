import appendParent from './utils/appendParent';
import ViewPanel from './components/ViewPanel';

interface AppObj {
  container: HTMLDivElement;
  header: HTMLElement;
  main: HTMLElement;
}

const App = (): AppObj => {
  // App container
  const app = appendParent(document.createElement('div'), 'body');
  app.id = 'app';

  // Header & Main layouts
  const header = appendParent(document.createElement('header'), '#app');
  const main = appendParent(document.createElement('main'), '#app');
  header.id = 'header';
  main.id = 'main';

  // Garage & Winners selectors panel
  const viewPanel = ViewPanel('#header');

  viewPanel.garageBtn.addEventListener('click', () => console.log('Garage'));
  viewPanel.winnersBtn.addEventListener('click', () => console.log('Winners'));

  return {
    container: app,
    header,
    main,
  };
};

export default App;
