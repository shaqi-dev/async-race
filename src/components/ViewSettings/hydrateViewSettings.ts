import { store } from '../../App';
import { GarageObj } from '../../interfaces/Garage';
import { ViewSettingsObj } from '../../interfaces/ViewSettings';
import { WinnersObj } from '../../interfaces/Winners';

const update = (): void => {
  const { view, viewSettings }: { view: 'garage' | 'winners'; viewSettings: ViewSettingsObj } =
    store;

  viewSettings.garageBtn.disabled = view === 'winners' ? false : true;
  viewSettings.winnersBtn.disabled = view === 'winners' ? true : false;
  viewSettings.title.innerText =
    view === 'winners' ? store.winnersViewTitle : store.garageViewTitle;
  viewSettings.page.innerText = view === 'winners' ? store.winnersPageTitle : store.garagePageTitle;
  viewSettings.prev.disabled =
    view === 'winners' ? store.winnersPrevBtnStatus : store.garagePrevBtnStatus;
  viewSettings.next.disabled =
    view === 'winners' ? store.winnersNextBtnStatus : store.garageNextBtnStatus;
};

const handleSetView = (view: 'garage' | 'winners'): void => {
  const {
    main,
    winners,
    garage,
  }: {
    main: HTMLElement;
    winners: WinnersObj;
    garage: GarageObj;
    viewSettings: ViewSettingsObj;
  } = store;

  store.view = view;

  sessionStorage.setItem('view', view);

  main.innerHTML = '';

  if (view === 'garage') {
    main.append(garage.container);
  } else {
    main.append(winners.container);
  }

  update();
};

const handleChangePage = async (value: number): Promise<void> => {
  if (store.view === 'winners') {
    store.winnersPage = store.winnersPage + value;

    await store.winners.table.update();

    update();
  } else {
    store.garagePage = store.garagePage + value;

    if (store.garage.update) {
      await store.garage.update();
    }

    update();
  }
};

const bindListeners = (): void => {
  const { viewSettings }: { viewSettings: ViewSettingsObj } = store;
  const { garageBtn, winnersBtn }: { garageBtn: HTMLButtonElement; winnersBtn: HTMLButtonElement } =
    viewSettings;

  garageBtn.addEventListener('click', () => handleSetView('garage'));
  winnersBtn.addEventListener('click', () => handleSetView('winners'));

  viewSettings.prev.addEventListener('click', () => handleChangePage(-1));
  viewSettings.next.addEventListener('click', () => handleChangePage(+1));
};

const hydrateViewSettings = (): ViewSettingsObj => {
  bindListeners();

  store.viewSettings.update = update;
  store.viewSettings.update();

  return store.viewSettings;
};

export default hydrateViewSettings;
