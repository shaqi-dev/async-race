import { store } from '../../App';
import { ORDER, SORT } from '../../interfaces/shared/winnersFilters';
import { WinnersObj } from '../../interfaces/Winners';

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

const bindListeners = (): void => {
  const { winners }: { winners: WinnersObj } = store;
  winners.table.wins.addEventListener('click', handleClickWins);
  winners.table.time.addEventListener('click', handleClickTime);
};

const hydrateWinners = async (): Promise<WinnersObj> => {
  bindListeners();

  await store.winners.table.update();

  return store.winners;
};

export default hydrateWinners;
