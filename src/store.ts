import ViewSettings from './components/ViewSettings';
import Winners from './components/Winners';
import Garage from './components/Garage';
import GarageSettings, { GarageSettingsObj } from './components/Garage/GarageSettings';
import type { ViewSettingsObj } from './components/ViewSettings';
import type { GarageObj } from './components/Garage';
import type { WinnersObj } from './components/Winners';
import { SORT, ORDER } from './interfaces/shared/winnersSorting';

export interface Store {
  header: HTMLElement;
  main: HTMLElement;
  view: 'garage' | 'winners';
  viewSettings: ViewSettingsObj;
  garage: GarageObj;
  garageViewTitle: string;
  garagePageTitle: string;
  garagePrevBtnStatus: boolean,
  garageNextBtnStatus: boolean,
  garageSettings: GarageSettingsObj;
  winners: WinnersObj;
  winnersViewTitle: string;
  winnersPageTitle: string;
  winnersPrevBtnStatus: boolean,
  winnersNextBtnStatus: boolean,
  garagePage: number;
  garagePerPage: number;
  winnersPage: number;
  winnersPerPage: number;
  winnersSort: SORT;
  winnersOrder: ORDER;
}

const view = sessionStorage.getItem('view') as 'garage' | 'winners';

const createStore = (header: HTMLElement, main: HTMLElement): Store => {
  const viewSettings = ViewSettings(header);
  const garage = Garage(view === 'garage' ? main : undefined);
  const garageSettings = GarageSettings(header);
  const winners = Winners(view === 'winners' ? main : undefined);

  return {
    header,
    main,
    view: view ? view : 'garage',
    viewSettings,
    garage,
    garageViewTitle: 'Garage (4)',
    garagePageTitle: 'Page #1',
    garagePrevBtnStatus: false,
    garageNextBtnStatus: false,
    garageSettings,
    winners,
    winnersViewTitle: 'Winners (1)',
    winnersPageTitle: 'Page #1',
    winnersPrevBtnStatus: false,
    winnersNextBtnStatus: false,
    garagePage: 1,
    garagePerPage: 7,
    winnersPage: 1,
    winnersPerPage: 10,
    winnersSort: SORT.ID,
    winnersOrder: ORDER.ASC,
  };
};

export default createStore;
