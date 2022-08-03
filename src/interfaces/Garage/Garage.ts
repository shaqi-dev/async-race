import { GarageSlotObj } from '.';

export interface GarageObj {
  container: HTMLDivElement;
  main: HTMLDivElement;
  slots: GarageSlotObj[] | undefined;
  update: (() => Promise<void>) | undefined;
}
