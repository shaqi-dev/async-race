import { store } from '../../App';
import { ORDER, SORT } from '../../interfaces/shared';
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

  store.winners?.table.update();
};

const handleClickTime = (): void => {
  if (store.winnersSort !== SORT.TIME) {
    store.winnersSort = SORT.TIME;
    store.winnersOrder = ORDER.ASC;
  } else {
    handleChangeOrder();
  }

  store.winners?.table.update();
};

const handleClickPrev = (): void => {
  store.winnersPage = store.winnersPage - 1;

  if (store.winnersPage === 1) {
    const { winners, viewSettings } = store;
    viewSettings.winnersPrev.disabled = true;
    winners.table.update();
  }
};

const handleClickNext = (): void => {
  const { winners, viewSettings } = store;
  store.winnersPage = store.winnersPage + 1;
  viewSettings.winnersPrev.disabled = false;
  winners.table.update();
};

const bindListeners = (): void => {
  const { winners, viewSettings } = store;
  winners.table.wins.addEventListener('click', handleClickWins);
  winners.table.time.addEventListener('click', handleClickTime);
  viewSettings.winnersPrev.addEventListener('click', handleClickPrev);
  viewSettings.winnersNext.addEventListener('click', handleClickNext);
};

const hydrateWinners = (): WinnersObj => {
  bindListeners();
  const { winners, viewSettings } = store;

  winners.table.update();

  if (store.view !== 'winners') {
    winners.hide();
  }

  if (store.winnersPage === 1) {
    viewSettings.winnersPrev.disabled = true;
  }

  return store.winners;
};

export default hydrateWinners;
