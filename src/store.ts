import ViewSettings from './components/ViewSettings';
import Winners from './components/Winners';
import Garage from './components/Garage';
import type { ViewSettingsObj } from './components/ViewSettings';
import type { GarageObj } from './components/Garage';
import type { WinnersObj } from './components/Winners';
import { Parent } from './utils/render';
import { SORT, ORDER } from './interfaces/shared';

export interface Store {
  viewSettings: ViewSettingsObj;
  garage: GarageObj;
  winners: WinnersObj;
  view: 'garage' | 'winners';
  garagePage: number;
  winnersPage: number;
  winnersSort: SORT;
  winnersOrder: ORDER;
}

const view = sessionStorage.getItem('view') as 'garage' | 'winners';

const createStore = (
  viewSettingsParent: Parent,
  garageParent: Parent,
  winnersParent: Parent,
): Store => {
  const viewSettings = ViewSettings(viewSettingsParent);
  const garage = Garage(garageParent);
  const winners = Winners(winnersParent);

  return {
    viewSettings,
    garage,
    winners,
    view: view ? view : 'garage',
    garagePage: 1,
    winnersPage: 1,
    winnersSort: SORT.ID,
    winnersOrder: ORDER.ASC,
  };
};

export default createStore;
