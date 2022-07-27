import appendParent from './utils/appendParent';
import ViewPanel from './components/ViewPanel';
import Garage from './components/Garage';
import { getCars } from './services/api';

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
  const viewPanel = ViewPanel('#header');
  viewPanel.garageBtn.addEventListener('click', () => console.log('Garage'));
  viewPanel.winnersBtn.addEventListener('click', () => console.log('Winners'));

  // Garage
  const garageData = await getCars(1, 10);
  const garage = Garage(garageData, '#main');

  return {
    container,
    header,
    main,
  };
};

export default App;
