import { store } from '../../App';
import { GarageObj } from '../Garage';
import { WinnersObj } from '../Winners';
import type { ViewSettingsObj } from './ViewSettings';

const setView = (view: 'garage' | 'winners'): void => {
  const {
    winners,
    garage,
    viewSettings,
  }: { winners: WinnersObj; garage: GarageObj; viewSettings: ViewSettingsObj } = store;

  winners.container.style.display = view === 'winners' ? 'flex' : 'none';
  garage.container.style.display = view === 'winners' ? 'none' : 'flex';
  viewSettings.garageTitle.style.display = view === 'winners' ? 'none' : 'block';
  viewSettings.winnersTitle.style.display = view === 'winners' ? 'block' : 'none';
  viewSettings.garagePage.style.display = view === 'winners' ? 'none' : 'block';
  viewSettings.winnersPage.style.display = view === 'winners' ? 'block' : 'none';
  viewSettings.garagePagination.style.display = view === 'winners' ? 'none' : 'block';
  viewSettings.winnersPagination.style.display = view === 'winners' ? 'block' : 'none';
};

const updateView = (): void => {
  sessionStorage.setItem('view', store.view);

  setView(store.view);
};

const handleGarageView = (): void => {
  store.view = 'garage';

  updateView();
};

const handleWinnersView = (): void => {
  store.view = 'winners';

  updateView();
};

const bindListeners = (): void => {
  const { viewSettings }: { viewSettings: ViewSettingsObj } = store;
  const { garageBtn, winnersBtn }: { garageBtn: HTMLButtonElement; winnersBtn: HTMLButtonElement } =
    viewSettings;

  garageBtn.addEventListener('click', handleGarageView);
  winnersBtn.addEventListener('click', handleWinnersView);
};

const initViewSettings = (): ViewSettingsObj => {
  bindListeners();

  updateView();

  return store.viewSettings;
};

export default initViewSettings;
