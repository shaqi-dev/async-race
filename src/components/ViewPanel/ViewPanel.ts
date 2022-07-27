import Button from '../Button';
import appendParent from '../../utils/appendParent';
import s from './ViewPanel.module.scss';

interface ViewPanelObject {
  container: HTMLDivElement;
  garageBtn: HTMLButtonElement;
  winnersBtn: HTMLButtonElement;
}

const ViewPanel = (parentSelector?: string): ViewPanelObject => {
  const container = appendParent(document.createElement('div'), parentSelector);
  const rootSelector = `.${s.root}`;
  if (s.root) container.classList.add(s.root);

  const garageBtn = Button({ label: 'Garage' }, rootSelector);
  const winnersBtn = Button({ label: 'Winners' }, rootSelector);

  return {
    container,
    garageBtn,
    winnersBtn,
  };
};

export default ViewPanel;
