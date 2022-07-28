import type { ViewPanelObj } from './components/ViewPanel';
import type { GarageObj } from './components/Garage';
import type { ControllPanelObj } from './components/Garage/ControllPanel';

interface Store {
  viewPanel: ViewPanelObj | undefined;
  garage: GarageObj | undefined;
  controllPanel: ControllPanelObj | undefined;
  garagePage: number,
  winnersPage: number,
}

const store: Store = {
  viewPanel: undefined,
  garage: undefined,
  controllPanel: undefined,
  garagePage: 1,
  winnersPage: 1,
};

export default store;
