import { store } from '../../App';
import type { ViewSettingsObj } from './ViewSettings';

const handleGarageView = (): void => {
  const { winners, garage } = store;

  if (winners && garage) {
    store.view = 'garage';
    sessionStorage.setItem('view', 'garage');
    winners.container.style.display = 'none';
    garage.container.style.display = 'flex';
  }
};

const handleWinnersView = async (): Promise<void> => {
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

  garageBtn.addEventListener('click', handleGarageView);
  winnersBtn.addEventListener('click', handleWinnersView);
};

const initViewSettings = (): ViewSettingsObj => {
  bindListeners(store.viewSettings);

  return store.viewSettings;
};

export default initViewSettings;
