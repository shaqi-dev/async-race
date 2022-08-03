import { hydrateViewSettings } from '../components/ViewSettings';
import { hydrateWinners } from '../components/Winners';
import { hydrateGarage } from '../components/Garage/';
import { hydrateGarageSettings } from '../components/Garage/GarageSettings';

const hydrateComponents = async (): Promise<void> => {
  await hydrateGarage();
  await hydrateWinners();
  hydrateViewSettings();
  hydrateGarageSettings();
}

export default hydrateComponents;