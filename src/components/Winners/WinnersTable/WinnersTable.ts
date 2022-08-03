import { store } from '../../../App';
import render from '../../../utils/render';
import getCarSVG from '../../../utils/getCarSVG';
import type { Parent } from '../../../utils/render';
import s from './WinnersTable.module.scss';
import getPaginatorButtonsStatus from '../../../utils/getPaginatorButtonsStatus';
import { GetCarReturn, getCar } from '../../../services/garageService';
import { GetWinnersReturn, getWinners } from '../../../services/winnersService';
import { Car } from '../../../interfaces/shared/car';
import { Winner } from '../../../interfaces/shared/winners';
import { WinnersTableObj } from '../../../interfaces/Winners';

const renderWinner = async (
  winner: Winner,
  position: number,
  parent: Parent,
): Promise<HTMLTableRowElement> => {
  const { id, wins, time } = winner;
  const [data, error]: Awaited<GetCarReturn> = await getCar(id);

  const container = render<HTMLTableRowElement>('tr', s.winner, parent);

  if (error) {
    console.error(error);
  } else {
    const { name, color }: Car = data;

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
  const { winners, winnersSort, winnersOrder, winnersPage, winnersPerPage, viewSettings } = store;

  const [data, error]: Awaited<GetWinnersReturn> = await getWinners(
    winnersSort,
    winnersOrder,
    winnersPage,
  );

  if (error) {
    console.error(error);
  } else {
    store.winnersViewTitle = `Winners (${data.count})`;
    store.winnersPageTitle = `Page #${winnersPage}`;

    winners.table.body.innerHTML = '';
    data.winners.map((winner, i) => renderWinner(winner, i + 1, winners.table.body));

    const [prev, next]: [boolean, boolean] = getPaginatorButtonsStatus(
      data.count,
      winnersPage,
      winnersPerPage,
    );

    store.winnersPrevBtnStatus = prev;
    store.winnersNextBtnStatus = next;
  }

  if (viewSettings.update) {
    viewSettings.update();
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
