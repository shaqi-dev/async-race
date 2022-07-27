import appendParent from '../../utils/appendParent';
import ControllPanel, { ControllPanelObj } from './ControllPanel';
import GarageSlot from './GarageSlot';
import { getCars } from '../../services/api';
import s from './Garage.module.scss';

export type UpdateGarage = () => Promise<void>;
export interface GarageObj {
  container: HTMLDivElement;
  controllPanel: ControllPanelObj;
  main: HTMLDivElement;
  updateGarage: UpdateGarage;
}

const Garage = async (
  parentSelector?: string,
): Promise<GarageObj> => {
  const container = appendParent(document.createElement('div'), parentSelector);
  const rootSelector = `.${s.root}`;
  container.classList.add(s.root || '');

  const title = appendParent(document.createElement('h2'), rootSelector);
  title.classList.add(s.title || '');
  
  const main = appendParent(document.createElement('div'), rootSelector);
  const mainSelector = `.${s.main}`;
  main.classList.add(s.main || '');

  const updateGarage = async (): Promise<void> => {
    const data = await getCars(1, 20);
    title.innerText = `Garage (${data?.count})`;
    main.innerHTML = '';
    data?.cars.map((car) => GarageSlot(car, mainSelector));
  }

  const controllPanel = ControllPanel(updateGarage, rootSelector);

  updateGarage();

  return {
    container,
    controllPanel,
    main,
    updateGarage,
  };
};

export default Garage;
