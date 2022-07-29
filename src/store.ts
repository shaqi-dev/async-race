import type { ViewSettingsObj } from './components/ViewSettings';
import type { GarageObj } from './components/Garage';
import type { GarageSettingsObj } from './components/Garage/GarageSettings';
import type { WinnersObj } from './components/Winners';

interface Store {
  viewSettings: ViewSettingsObj | undefined;
  garage: GarageObj | undefined;
  winners: WinnersObj | undefined;
  garageSettings: GarageSettingsObj | undefined;
  view: 'garage' | 'winners';
  garagePage: number;
  winnersPage: number;
}

const store: Store = {
  viewSettings: undefined,
  garage: undefined,
  winners: undefined,
  garageSettings: undefined,
  view: 'garage',
  garagePage: 1,
  winnersPage: 1,
};

export default store;
