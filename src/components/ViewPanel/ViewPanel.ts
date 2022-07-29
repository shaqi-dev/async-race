import Button from '../Button';
import render from '../../utils/render';
import store from '../../store';
import { getWinners } from '../../services/api';
import s from './ViewPanel.module.scss';


export interface ViewPanelObj {
  container: HTMLDivElement;
  garageBtn: HTMLButtonElement;
  winnersBtn: HTMLButtonElement;
}

const handleGarage = (): void => {
  store.view = 'garage';
 
  console.log(store.garage);
}

const handleWinners = async (): Promise<void> => {
  const [data, error] = await getWinners();

  if (error) {
    console.error(error)
  } else {
    store.view = 'winners';
    console.log(data);
  }
}

const ViewPanel = (parentSelector?: string): ViewPanelObj => {
  const container = render<HTMLDivElement>('div', s.root, parentSelector);
  const rootSelector = `.${s.root}`;

  const garageBtn = Button({ label: 'Garage' }, rootSelector);
  garageBtn.addEventListener('click', handleGarage);
  const winnersBtn = Button({ label: 'Winners' }, rootSelector);
  winnersBtn.addEventListener('click', handleWinners);

  return {
    container,
    garageBtn,
    winnersBtn,
  };
};

export default ViewPanel;
