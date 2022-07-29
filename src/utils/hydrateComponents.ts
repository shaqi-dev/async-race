import { hydrateViewSettings } from '../components/ViewSettings';
import { hydrateWinners } from '../components/Winners';
import { hydrateGarage } from '../components/Garage/';
import { hydrateGarageSettings } from '../components/Garage/GarageSettings';

const hydrateComponents = (): void => {
  hydrateViewSettings();
  hydrateGarage();
  hydrateGarageSettings();
  hydrateWinners();
}

export default hydrateComponents;