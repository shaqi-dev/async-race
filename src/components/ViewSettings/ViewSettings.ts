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
    sessionStorage.setItem('view', 'garage');
    winners.container.style.display = 'none';
    garage.container.style.display = 'flex';
  }
};

const handleWinners = async (): Promise<void> => {
  const { winners, garage } = store;

  if (winners && garage) {
    store.view = 'winners';
    sessionStorage.setItem('view', 'winners');
    winners.container.style.display = 'flex';
    garage.container.style.display = 'none';
  }
};

const bindListeners = (viewSettings: ViewSettingsObj): void => {
  const { garageBtn, winnersBtn } = viewSettings;

  garageBtn.addEventListener('click', handleGarage);
  winnersBtn.addEventListener('click', handleWinners);
};

const ViewSettings = (parent: string | HTMLElement): ViewSettingsObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const garageBtn = Button({ label: 'Garage' }, container);
  const winnersBtn = Button({ label: 'Winners' }, container);

  return {
    container,
    garageBtn,
    winnersBtn,
  };
};

const initViewSettings = (parent: string | HTMLElement): ViewSettingsObj => {
  store.viewSettings = ViewSettings(parent);
  bindListeners(store.viewSettings);

  return store.viewSettings;
};

export default initViewSettings;
