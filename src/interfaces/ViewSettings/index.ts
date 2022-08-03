export interface ViewSettingsObj {
  container: HTMLDivElement;
  garageBtn: HTMLButtonElement;
  winnersBtn: HTMLButtonElement;
  title: HTMLParagraphElement;
  page: HTMLParagraphElement;
  pagination: HTMLDivElement;
  prev: HTMLButtonElement;
  next: HTMLButtonElement;
  update: (() => void) | undefined;
}
