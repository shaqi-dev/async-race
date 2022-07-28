import Button from '../Button';
import render from '../../utils/render';
import s from './ViewPanel.module.scss';

export interface ViewPanelObj {
  container: HTMLDivElement;
  garageBtn: HTMLButtonElement;
  winnersBtn: HTMLButtonElement;
}

const ViewPanel = (parentSelector?: string): ViewPanelObj => {
  const container = render<HTMLDivElement>('div', s.root, parentSelector);
  const rootSelector = `.${s.root}`;

  const garageBtn = Button({ label: 'Garage' }, rootSelector);
  const winnersBtn = Button({ label: 'Winners' }, rootSelector);

  return {
    container,
    garageBtn,
    winnersBtn,
  };
};

export default ViewPanel;
