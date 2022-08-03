import { store } from '../../App';
import { ORDER, SORT } from '../../interfaces/shared';
import { ViewSettingsObj } from '../ViewSettings';
import type { WinnersObj } from './Winners';

const handleChangeOrder = (): void => {
  if (store.winnersOrder === ORDER.ASC) {
    store.winnersOrder = ORDER.DESC;
  } else {
    store.winnersOrder = ORDER.ASC;
  }
};

const handleClickWins = (): void => {
  if (store.winnersSort !== SORT.WINS) {
    store.winnersSort = SORT.WINS;
    store.winnersOrder = ORDER.DESC;
  } else {
    handleChangeOrder();
  }

  store.winners.table.update();
};

const handleClickTime = (): void => {
  if (store.winnersSort !== SORT.TIME) {
    store.winnersSort = SORT.TIME;
    store.winnersOrder = ORDER.ASC;
  } else {
    handleChangeOrder();
  }

  store.winners.table.update();
};

const handleChangePage = async (value: number): Promise<void> => {
  store.winnersPage = store.winnersPage + value;

  await store.winners.table.update();
};

const bindListeners = (): void => {
  const { winners, viewSettings }: { winners: WinnersObj; viewSettings: ViewSettingsObj } = store;
  winners.table.wins.addEventListener('click', handleClickWins);
  winners.table.time.addEventListener('click', handleClickTime);
  viewSettings.winnersPrev.addEventListener('click', () => handleChangePage(-1));
  viewSettings.winnersNext.addEventListener('click', () => handleChangePage(+1));
};

const hydrateWinners = async (): Promise<WinnersObj> => {
  bindListeners();
  
  await store.winners.table.update();

  return store.winners;
};

export default hydrateWinners;
