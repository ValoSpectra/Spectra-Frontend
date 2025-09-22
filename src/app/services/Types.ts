//#region Regular Matches
export interface IMatchData {
  groupCode: string;
  isRanked: boolean;
  isRunning: boolean;
  roundNumber: number;
  roundPhase: string;
  teams: ITeamData[];
  spikeState: ISpikeState;
  map: string;
  timeoutState: ITimeoutState;
  showAliveKDA: boolean;
  tools: IToolsData;
  switchRound: number;
  firstOtRound: number;
  attackersWon: boolean;
}

export interface ITeamData {
  teamName: string;
  teamUrl: string;
  teamTricode: string;
  spentThisRound: number;
  isAttacking: boolean;
  roundsWon: number;
  players: IPlayerData[];
  roundRecord?: IRoundReason[];
}

export interface IPlayerData {
  name: string;
  fullName: string;
  playerId: number;
  isAlive: boolean;
  agentInternal: string;
  locked: boolean;
  isObserved: boolean;
  armorName: string;
  money: number;
  moneySpent: number;
  highestWeapon: string;
  isCaptain: boolean;
  currUltPoints: number;
  maxUltPoints: number;
  ultReady: boolean;
  hasSpike: boolean;
  scoreboardAvailable: boolean;
  auxiliaryAvailable: {
    health: boolean;
    abilities: boolean;
    scoreboard: boolean;
  };
  kills: number;
  deaths: number;
  assists: number;
  health: number;
  abilities: {
    grenade: number;
    ability1: number;
    ability2: number;
  };
  iconNameSuffix: string;
}

export interface IRoundReason {
  type: "lost" | "kills" | "defused" | "detonated" | "timeout" | "upcoming";
  wasAttack: boolean;
  round: number;
}

export interface ISpikeState {
  planted: boolean;
  defused: boolean;
  detonated: boolean;
}

export interface ITimeoutState {
  techPause: boolean;
  leftTeam: boolean;
  rightTeam: boolean;
  timeRemaining: number;
}

//#endregion
//#region Tools

export interface IToolsData {
  seriesInfo: ISeriesInfo;
  seedingInfo: ISeedingInfo;
  tournamentInfo: ITournamentInfo;
  timeoutDuration: number;
  sponsorInfo: ISponsorInfo;
  watermarkInfo: IWatermarkInfo;
  playercamsInfo: IPlayercamsInfo;
  nameOverrides: INameOverrides;
}

export interface ISeriesInfo {
  needed: number;
  wonLeft: number;
  wonRight: number;
  mapInfo: MapPoolInfo[];
}

export interface ISeedingInfo {
  left: string;
  right: string;
}

export interface ITournamentInfo {
  name: string;
  logoUrl: string;
  backdropUrl: string;
  enabled: boolean;
}

export interface ISponsorInfo {
  enabled: boolean;
  duration: number;
  sponsors: string[];
}

export interface IWatermarkInfo {
  spectraWatermark: boolean;
  customTextEnabled: boolean;
  customText: string;
}

export interface IPlayercamsInfo {
  enable: boolean;
  removeTricodes?: boolean;
  identifier?: string;
  secret?: string;
  endTime?: number;
  enabledPlayers?: string[];
}

export interface INameOverrides {
  overrides: string[];
}

export interface IOverridesPlayercamsData {
  nameOverrides: string[];
  enabledPlayers: string[];
}

interface BaseMapPoolInfo {
  type: "past" | "present" | "future" | "disabled";
}

type PastMapPoolInfo = BaseMapPoolInfo & {
  type: "past";
  map: string;
  left: {
    logo: string;
    score: number;
  };
  right: {
    logo: string;
    score: number;
  };
};

type PresentMapPoolInfo = BaseMapPoolInfo & {
  type: "present";
  logo: string;
};

type FutureMapPoolInfo = BaseMapPoolInfo & {
  type: "future";
  map: string;
  logo: string;
};

type DisabledMapPoolInfo = BaseMapPoolInfo & {
  type: "disabled";
};

export type MapPoolInfo =
  | PastMapPoolInfo
  | PresentMapPoolInfo
  | FutureMapPoolInfo
  | DisabledMapPoolInfo;

//#endregion
//#region Mapban
export interface IMapbanSessionData {
  sessionIdentifier: string;
  organizationName: string;
  isSupporter: boolean;
  teams: ISessionTeam[];
  format: "bo1" | "bo3" | "bo5" | "custom" | undefined;
  customFormatData?: ICustomFormatData;
  availableMaps: SessionMap[];
  selectedMaps: SessionMap[];
  stage: Stage;
  actingTeamCode: string;
  actingTeam: 0 | 1;
}

export interface ISessionTeam {
  name: string;
  tricode: string;
  url: string;
}

export class SessionMap {
  name: string;
  bannedBy?: 0 | 1 = undefined; // 0 = left team, 1 = right team
  pickedBy?: 0 | 1 = undefined;
  sidePickedBy?: 0 | 1 = undefined;
  pickedAttack: boolean | undefined = undefined;
  score: (number | undefined)[] = [undefined, undefined];

  constructor(name: string) {
    this.name = name;
  }
}

export interface ICustomFormatData {
  pickAmount: number;
  banAmount: number;
  hasDecider: boolean;
  pickBanStates: ("pick" | "ban" | "decider")[];
  selectorTeam: (0 | 1)[];
  sideSelectorTeam: (0 | 1)[];
}

export type Stage = "ban" | "pick" | "side" | "decider";
