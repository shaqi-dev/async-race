import Button from '../Button';
import render from '../../utils/render';
import s from './ViewSettings.module.scss';
import { ViewSettingsObj } from '../../interfaces/ViewSettings';

const ViewSettings = (parent: string | HTMLElement): ViewSettingsObj => {
  const container = render<HTMLDivElement>('div', s.root, parent);
  const title = render<HTMLParagraphElement>('p', s.title, container);
  const header = render<HTMLDivElement>('div', s.header, container);
  const garageBtn = Button({ label: 'Garage' }, header);
  const winnersBtn = Button({ label: 'Winners' }, header);
  const page = render<HTMLParagraphElement>('p', s.page, container);
  const pagination = render<HTMLDivElement>('div', s.pagination, container);
  const prev = Button({ label: 'Prev' }, pagination);
  const next = Button({ label: 'Next' }, pagination);

  return {
    container,
    garageBtn,
    winnersBtn,
    title,
    page,
    pagination,
    prev,
    next,
    update: undefined,
  };
};

export default ViewSettings;
