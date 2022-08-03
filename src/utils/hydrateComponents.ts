import { hydrateViewSettings } from '../components/ViewSettings';
import { hydrateWinners } from '../components/Winners';
import { hydrateGarage } from '../components/Garage/';
import { hydrateGarageSettings } from '../components/Garage/GarageSettings';

const hydrateComponents = async (): Promise<void> => {
  hydrateViewSettings();
  await hydrateGarage();
  hydrateGarageSettings();
  await hydrateWinners();
}

export default hydrateComponents;