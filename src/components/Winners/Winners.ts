import render from '../../utils/render';
import type { Winner } from '../../interfaces/shared';
import s from './Winners.module.scss';
import { getCar, getWinners } from '../../services/api';
import store from '../../store';
import getCarSVG from '../../utils/getCarSVG';

export interface WinnersObj {
  container: HTMLDivElement;
  title: HTMLParagraphElement;
  page: HTMLParagraphElement;
  table: WinnersTableObj;
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
    render('td', null, container, name);
    const car = render('td', null, container);
    render('td', null, container, `${wins}`);
    render('td', null, container, `${time}`);

    car.innerHTML = getCarSVG(color);
  }

  return container;
};

const updateWinners = async (): Promise<void> => {
  const { winners, winnersPage } = store;
  const [data, error] = await getWinners(winnersPage);

  if (error) {
    console.error(error);
  } else {
    if (winners) {
      winners.title.innerText = `Winners (${data.count})`;
      winners.page.innerText = `Page #${winnersPage}`;
      winners.table.body.innerHTML = '';
      data.winners.map((winner, i) => renderWinner(winner, i + 1, winners.table.body));
    }
  }
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

  return {
    container,
    title,
    page,
    table,
  };
};

const initWinners = (parent: string | HTMLElement): WinnersObj => {
  store.winners = Winners(parent);
  store.winners.table.update();
  store.winners.container.style.display = 'none';

  return store.winners;
};

export default initWinners;
