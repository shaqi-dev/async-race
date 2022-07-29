import Button from '../Button';
import render from '../../utils/render';
import s from './ViewSettings.module.scss';

export interface ViewSettingsObj {
  container: HTMLDivElement;
  garageBtn: HTMLButtonElement;
  winnersBtn: HTMLButtonElement;
  garageTitle: HTMLParagraphElement;
  winnersTitle: HTMLParagraphElement;
  garagePage: HTMLParagraphElement;
  winnersPage: HTMLParagraphElement;
  winnersPagination: HTMLDivElement;
  winnersPrev: HTMLButtonElement;
  winnersNext: HTMLButtonElement;
  garagePagination: HTMLDivElement;
  garagePrev: HTMLButtonElement;
  garageNext: HTMLButtonElement;
}

const ViewSettings = (parent: string | HTMLElement): ViewSettingsObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const garageTitle = render<HTMLParagraphElement>('p', s.title, container);
  const winnersTitle = render<HTMLParagraphElement>('p', s.title, container);
  const header = render<HTMLDivElement>('div', s.header, container);
  const garageBtn = Button({ label: 'Garage' }, header);
  const winnersBtn = Button({ label: 'Winners' }, header);
  const garagePage = render<HTMLParagraphElement>('p', s.page, container);
  const winnersPage = render<HTMLParagraphElement>('p', s.page, container);
  const winnersPagination = render<HTMLDivElement>('div', s.pagination, container);
  const winnersPrev = Button({ label: 'Prev' }, winnersPagination);
  const winnersNext = Button({ label: 'Next' }, winnersPagination);
  const garagePagination = render<HTMLDivElement>('div', s.pagination, container);
  const garagePrev = Button({ label: 'Prev' }, garagePagination);
  const garageNext = Button({ label: 'Next' }, garagePagination);

  return {
    container,
    garageBtn,
    winnersBtn,
    garageTitle,
    winnersTitle,
    garagePage,
    winnersPage,
    winnersPagination,
    winnersPrev,
    winnersNext,
    garagePagination,
    garagePrev,
    garageNext,
  };
};

export default ViewSettings;
