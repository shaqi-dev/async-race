export interface GarageSlotObj {
  container: HTMLDivElement;
  carName: HTMLSpanElement;
  carImage: HTMLDivElement;
  selectBtn: HTMLButtonElement;
  removeBtn: HTMLButtonElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  id: number;
  start: (() => Promise<[number, number] | [number, null]>) | undefined;
  stop: (() => Promise<void>) | undefined;
  animation: Animation | undefined;
}
