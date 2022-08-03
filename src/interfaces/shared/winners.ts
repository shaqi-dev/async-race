export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnersData {
  winners: Winner[];
  count: number;
}

export interface WinnerSettings {
  wins: number;
  time: number;
}
