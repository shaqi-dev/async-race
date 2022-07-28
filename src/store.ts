import type { ViewPanelObj } from './components/ViewPanel';
import type { GarageObj } from './components/Garage';
import type { ControllPanelObj } from './components/Garage/ControllPanel';

interface Store {
  viewPanel: ViewPanelObj | undefined;
  garage: GarageObj | undefined;
  winners: undefined;
  controllPanel: ControllPanelObj | undefined;
  view: 'garage' | 'winners';
  garagePage: number;
  winnersPage: number;
}

const store: Store = {
  viewPanel: undefined,
  garage: undefined,
  winners: undefined,
  controllPanel: undefined,
  view: 'garage',
  garagePage: 1,
  winnersPage: 1,
};

export default store;
