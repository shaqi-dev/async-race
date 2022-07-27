import Button from '../Button';
import appendParent from '../../utils/appendParent';
import s from './ViewPanel.module.scss';

interface ViewPanelObject {
  container: HTMLDivElement;
  garageBtn: HTMLButtonElement;
  winnersBtn: HTMLButtonElement;
}

const ViewPanel = (parentSelector?: string): ViewPanelObject => {
  const viewPanelEl = appendParent(
    document.createElement('div'),
    parentSelector,
  );

  viewPanelEl.classList.add(s.root);

  const garageBtn = Button({ label: 'Garage' }, `.${s.root}`);
  const winnersBtn = Button({ label: 'Winners' }, `.${s.root}`);

  return {
    container: viewPanelEl,
    garageBtn,
    winnersBtn,
  };
};

export default ViewPanel;
