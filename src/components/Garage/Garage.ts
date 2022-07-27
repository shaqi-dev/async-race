import appendParent from '../../utils/appendParent';
import ControllPanel, { ControllPanelObj } from './ControllPanel';
import GarageSlot from './GarageSlot';
import type { GarageData } from '../../interfaces/shared';
import s from './Garage.module.scss';

export interface GarageObj {
  container: HTMLDivElement;
  controllPanel: ControllPanelObj;
  main: HTMLDivElement;
}

const Garage = (garageData: GarageData | null, parentSelector?: string): GarageObj => {
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

  garageData?.cars.map((car) => GarageSlot(car, mainSelector));

  return {
    container,
    controllPanel,
    main,
  };
};

export default Garage;
