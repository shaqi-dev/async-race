import appendParent from '../../utils/appendParent';
import ControllPanel, { ControllPanelObj } from './ControllPanel';
import s from './Garage.module.scss';

export interface GarageObj {
  container: HTMLDivElement;
  controllPanel: ControllPanelObj;
  main: HTMLDivElement;
}

const Garage = (parentSelector?: string): GarageObj => {
  const container = appendParent(document.createElement('div'), parentSelector);
  const rootSelector = `.${s.root}`;
  container.classList.add(s.root || '');

  const controllPanel = ControllPanel(rootSelector);

  const main = appendParent(document.createElement('div'), rootSelector);
  const mainSelector = `.${s.main}`;
  main.classList.add(s.main || '');

  const title = appendParent(document.createElement('h2'), mainSelector);
  title.classList.add(s.title || '');
  title.innerText = 'Garage';

  return {
    container,
    controllPanel,
    main, 
  };
};

export default Garage;
