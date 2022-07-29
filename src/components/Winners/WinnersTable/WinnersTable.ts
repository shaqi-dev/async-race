import { getCar, getWinners } from '../../../services/api';
import { store } from '../../../App';
import render from '../../../utils/render';
import getCarSVG from '../../../utils/getCarSVG';
import type { Winner } from '../../../interfaces/shared';
import type { Parent } from '../../../utils/render';
import s from './WinnersTable.module.scss';

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
  parent: Parent,
): Promise<HTMLTableRowElement> => {
  const { id, wins, time } = winner;
  const [data, error] = await getCar(id);

  const container = render<HTMLTableRowElement>('tr', s.winner, parent);

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

const update = async (): Promise<void> => {
  const { winners, winnersSort, winnersOrder, winnersPage, viewSettings } = store;
  const [data, error] = await getWinners(winnersSort, winnersOrder, winnersPage);

  if (error) {
    console.error(error);
  } else {
    viewSettings.winnersTitle.innerText = `Winners (${data.count})`;
    viewSettings.winnersPage.innerText = `Page #${winnersPage}`;
    winners.table.body.innerHTML = '';
    data.winners.map((winner, i) => renderWinner(winner, i + 1, winners.table.body));

    if (data.count / (winnersPage * 10) <= 1) {
      viewSettings.winnersNext.disabled = true;
    } else {
      viewSettings.winnersNext.disabled = false;
    }
  }
};

const WinnersTable = (parent: Parent): WinnersTableObj => {
  const container = render<HTMLTableElement>('table', s.root, parent);
  const head = render<HTMLTableSectionElement>('thead', s.head, container);
  const body = render<HTMLTableSectionElement>('tbody', s.body, container);
  render<HTMLElement>('th', s.item, head, 'Position');
  render<HTMLElement>('th', s.item, head, 'Car');
  render<HTMLElement>('th', s.item, head, 'Name');
  const wins = render<HTMLElement>('th', [s.item, s['item--wins']], head, 'Wins');
  const time = render<HTMLElement>('th', [s.item, s['item--time']], head, 'Time');

  return {
    container,
    head,
    body,
    wins,
    time,
    update,
  };
};

export default WinnersTable;
