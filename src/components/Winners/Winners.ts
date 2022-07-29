import render from '../../utils/render';
import { ORDER, SORT, Winner } from '../../interfaces/shared';
import s from './Winners.module.scss';
import { getCar, getWinners } from '../../services/api';
import store from '../../store';
import getCarSVG from '../../utils/getCarSVG';
import Button from '../Button';

export interface WinnersObj {
  container: HTMLDivElement;
  title: HTMLParagraphElement;
  page: HTMLParagraphElement;
  table: WinnersTableObj;
  prev: HTMLButtonElement;
  next: HTMLButtonElement;
}

export interface WinnersTableObj {
  container: HTMLTableElement;
  head: HTMLTableSectionElement;
  body: HTMLTableSectionElement;
  wins: HTMLElement;
  time: HTMLElement;
  update: () => Promise<void>;
}

const renderWinner = async (
  winner: Winner,
  position: number,
  parent: string | HTMLElement,
): Promise<HTMLTableRowElement> => {
  const { id, wins, time } = winner;
  const [data, error] = await getCar(id);

  const container = render<HTMLTableRowElement>('tr', s.item, parent);

  if (error) {
    console.error(error);
  } else {
    const { name, color } = data;

    render('td', null, container, `${position}`);
    const car = render('td', null, container);
    render('td', null, container, name);
    render('td', null, container, `${wins}`);
    render('td', null, container, `${time}`);

    car.innerHTML = getCarSVG(color);
  }

  return container;
};

const updateWinners = async (): Promise<void> => {
  const { winners, winnersSort, winnersOrder, winnersPage } = store;
  const [data, error] = await getWinners(winnersSort, winnersOrder, winnersPage);

  if (error) {
    console.error(error);
  } else {
    if (winners) {
      winners.title.innerText = `Winners (${data.count})`;
      winners.page.innerText = `Page #${winnersPage}`;
      winners.table.body.innerHTML = '';
      data.winners.map((winner, i) => renderWinner(winner, i + 1, winners.table.body));

      if (data.count / (winnersPage * 10) < 1) {
        winners.next.disabled = true;
      } else {
        winners.next.disabled = false;
      }
    }
  }
};

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

const WinnersTable = (parent: string | HTMLElement): WinnersTableObj => {
  const container = render<HTMLTableElement>('table', s.table, parent);
  const head = render<HTMLTableSectionElement>('thead', s.head, container);
  const body = render<HTMLTableSectionElement>('tbody', s.body, container);
  render<HTMLElement>('th', s.head__item, head, 'Position');
  render<HTMLElement>('th', s.head__item, head, 'Car');
  render<HTMLElement>('th', s.head__item, head, 'Name');
  const wins = render<HTMLElement>('th', [s.head__item, s['head__item--wins']], head, 'Wins');
  const time = render<HTMLElement>('th', [s.head__item, s['head__item--time']], head, 'Time');

  return {
    container,
    head,
    body,
    wins,
    time,
    update: updateWinners,
  };
};

const Winners = (parent: string | HTMLElement): WinnersObj => {
  const { winnersPage } = store;
  const container = render<HTMLDivElement>('div', s.root, parent);
  const title = render<HTMLParagraphElement>('p', s.title, container, `Winners`);
  const page = render<HTMLParagraphElement>('p', s.page, container, `Page #${winnersPage}`);
  const table = WinnersTable(container);
  const pagination = render<HTMLDivElement>('div', s.pagination, container);
  const prev = Button({ label: 'Prev' }, pagination);
  const next = Button({ label: 'Next' }, pagination);

  return {
    container,
    title,
    page,
    table,
    prev,
    next,
  };
};

const initWinners = (parent: string | HTMLElement): WinnersObj => {
  store.winners = Winners(parent);
  bindListeners(store.winners);
  store.winners.table.update();
  if (store.view !== 'winners') {
    store.winners.container.style.display = 'none';
  }

  if (store.winnersPage === 1) {
    store.winners.prev.disabled = true;
  }

  return store.winners;
};

export default initWinners;
