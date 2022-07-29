import Button from '../Button';
import render from '../../utils/render';
import store from '../../store';
import s from './ViewSettings.module.scss';


export interface ViewSettingsObj {
  container: HTMLDivElement;
  garageBtn: HTMLButtonElement;
  winnersBtn: HTMLButtonElement;
}

const handleGarage = (): void => {
  const { winners, garage } = store;

  if (winners && garage) {
    store.view = 'garage';
    winners.container.style.display = 'none';
    garage.container.style.display = 'flex';
  }
}

const handleWinners = async (): Promise<void> => {
  const { winners, garage } = store;

  if (winners && garage) {
    store.view = 'winners';
    winners.container.style.display = 'flex';
    garage.container.style.display = 'none';
  }
}

const ViewSettings = (parentSelector?: string): ViewSettingsObj => {
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

export default ViewSettings;
