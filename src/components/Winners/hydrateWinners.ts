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
    const { winners } = store;

    if (winners) {
      winners.prev.disabled = true;

      winners.table.update();
    }
  }
};

const handleClickNext = (): void => {
  store.winnersPage = store.winnersPage + 1;

  const { winners } = store;

  if (winners) {
    winners.prev.disabled = false;

    winners.table.update();
  }
};

const bindListeners = (winners: WinnersObj): void => {
  winners.table.wins.addEventListener('click', handleClickWins);
  winners.table.time.addEventListener('click', handleClickTime);
  winners.prev.addEventListener('click', handleClickPrev);
  winners.next.addEventListener('click', handleClickNext);
};

const hydrateWinners = (): WinnersObj => {
  bindListeners(store.winners);
  store.winners.table.update();

  if (store.view !== 'winners') {
    store.winners.hide();
  }
  
  if (store.winnersPage === 1) {
    store.winners.prev.disabled = true;
  }

  return store.winners;
};

export default hydrateWinners;
