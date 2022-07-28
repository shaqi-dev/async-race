import type { ViewPanelObj } from './components/ViewPanel';
import type { GarageObj } from './components/Garage';
import type { ControllPanelObj } from './components/Garage/ControllPanel';

interface Store {
  viewPanel: ViewPanelObj | undefined;
  garage: GarageObj | undefined;
  controllPanel: ControllPanelObj | undefined;
}

const store: Store = {
  viewPanel: undefined,
  garage: undefined,
  controllPanel: undefined,
};

export default store;
