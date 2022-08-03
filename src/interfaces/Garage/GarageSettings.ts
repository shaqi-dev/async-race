import { GarageSettingsFormObj } from './GarageSettingsForm';

export interface GarageSettingsObj {
  container: HTMLDivElement;
  createForm: GarageSettingsFormObj;
  updateForm: GarageSettingsFormObj;
  raceBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  generateCarsBtn: HTMLButtonElement;
  winnerMessage: HTMLSpanElement;
}
