import { store } from '../../App';
import type { ViewSettingsObj } from './ViewSettings';

const setGarageView = ():void => {
  const { winners, garage, viewSettings } = store;

  winners.container.style.display = 'none';
  garage.container.style.display = 'flex';
  viewSettings.garageTitle.style.display = 'block';
  viewSettings.winnersTitle.style.display = 'none';
  viewSettings.garagePage.style.display = 'block';
  viewSettings.winnersPage.style.display = 'none';
  viewSettings.garagePagination.style.display = 'block';
  viewSettings.winnersPagination.style.display = 'none';
}

const setWinnersView = ():void => {
  const { winners, garage, viewSettings } = store;

  winners.container.style.display = 'flex';
  garage.container.style.display = 'none';
  viewSettings.garageTitle.style.display = 'none';
  viewSettings.winnersTitle.style.display = 'block';
  viewSettings.garagePage.style.display = 'none';
  viewSettings.winnersPage.style.display = 'block';
  viewSettings.garagePagination.style.display = 'none';
  viewSettings.winnersPagination.style.display = 'block';
}

const handleGarageView = (): void => {
  store.view = 'garage';
  sessionStorage.setItem('view', 'garage');

  setGarageView();
};

const handleWinnersView = async (): Promise<void> => {
  store.view = 'winners';
  sessionStorage.setItem('view', 'winners');

  setWinnersView()
};

const bindListeners = (): void => {
  const { viewSettings } = store;
  const { garageBtn, winnersBtn } = viewSettings;

  garageBtn.addEventListener('click', handleGarageView);
  winnersBtn.addEventListener('click', handleWinnersView);
};

const initViewSettings = (): ViewSettingsObj => { 
  bindListeners();

  if (store.view === 'garage') {
    setGarageView();
  } else {
    setWinnersView();
  }

  return store.viewSettings;
};

export default initViewSettings;
