import render from '../../utils/render';
import Button from '../Button';
import WinnersTable, { WinnersTableObj } from './WinnersTable';
import type { Parent } from '../../utils/render';
import s from './Winners.module.scss';

export interface WinnersObj {
  container: HTMLDivElement;
  title: HTMLParagraphElement;
  page: HTMLParagraphElement;
  table: WinnersTableObj;
  prev: HTMLButtonElement;
  next: HTMLButtonElement;
  hide: () => void;
  show: () => void;
}

const Winners = (parent: Parent): WinnersObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const title = render<HTMLParagraphElement>('p', s.title, container, `Winners`);
  const page = render<HTMLParagraphElement>('p', s.page, container, `Page #`);
  const table = WinnersTable(container);
  const pagination = render<HTMLDivElement>('div', s.pagination, container);
  const prev = Button({ label: 'Prev' }, pagination);
  const next = Button({ label: 'Next' }, pagination);

  const hide = (): void => {
    container.style.display = 'none';
  };

  const show = (): void => {
    container.style.display = 'flex';
  };

  return {
    container,
    title,
    page,
    table,
    prev,
    next,
    hide,
    show,
  };
};

export default Winners;
