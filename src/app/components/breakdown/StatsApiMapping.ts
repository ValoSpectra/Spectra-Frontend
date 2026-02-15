export type StatsApiAffinity = "eu" | "na" | "latam" | "br" | "ap" | "kr";
export type StatsApiPlatform = "pc" | "console";

export const StatsApiCeremonies = {
  Thrifty: "CeremonyThrifty",
  Clutch: "CeremonyClutch",
  Ace: "CeremonyAce",
  Flawless: "CeremonyFlawless",
  TeamAce: "CeremonyTeamAce",
  Closer: "CeremonyCloser",
  Default: "CeremonyDefault",
} as const;

export type StatsApiCeremony = (typeof StatsApiCeremonies)[keyof typeof StatsApiCeremonies];

export const StatsApiWinReasons = {
  Defused: "Defuse",
  Detonated: "Detonate",
  Kills: "Elimination",
  Timeout: "",
} as const;

export type StatsApiWinReason = (typeof StatsApiWinReasons)[keyof typeof StatsApiWinReasons];

export interface StatsApiMatchResponse {
  status: number;
  data: StatsApiMatch;
}

export interface StatsApiMatch {
  metadata: StatsApiMatchMetadata;
  players: StatsApiMatchPlayer[];
  observers: StatsApiMatchObserver[];
  coaches: StatsApiMatchCoach[];
  teams: StatsApiMatchTeam[];
  rounds: StatsApiMatchRound[];
  kills: StatsApiMatchKill[];
}

export interface StatsApiMatchMetadata {
  match_id: string;
  map: {
    id: string;
    name: string;
  };
  game_version: string;
  game_length_in_ms: number;
  started_at: string;
  is_completed: boolean;
  queue: {
    id: string;
    name: string | null;
    mode_type: string | null;
  };
  season: {
    id: string;
    short: string | null;
  };
  platform: StatsApiPlatform;
  premier: Record<string, unknown> | null;
  party_rr_penaltys: StatsApiPartyRrPenalty[];
  region: StatsApiAffinity;
  cluster: string | null;
}

export interface StatsApiPartyRrPenalty {
  party_id: string;
  penalty: number;
}

export interface StatsApiMatchPlayer {
  puuid: string;
  name: string;
  tag: string;
  team_id: string;
  platform: string;
  party_id: string;
  agent: {
    id: string;
    name: string | null;
  };
  stats: {
    score: number;
    acs?: number;
    kills: number;
    firstKills?: number;
    deaths: number;
    assists: number;
    headshots: number;
    legshots: number;
    bodyshots: number;
    damage: {
      dealt: number;
      received: number;
    };
  };
  ability_casts: StatsApiMatchAbilities;
  tier: {
    id: number;
    name: string | null;
  };
  card_id: string;
  title_id: string;
  prefered_level_border: string | null;
  account_level: number;
  session_playtime_in_ms: number;
  behavior: {
    afk_rounds: number;
    friendly_fire: {
      incoming: number;
      outgoing: number;
    };
    rounds_in_spawn: number;
  };
  economy: {
    spent: {
      overall: number;
      average: number;
    };
    loadout_value: {
      overall: number;
      average: number;
    };
  };
}

export interface StatsApiMatchObserver {
  puuid: string;
  name: string;
  tag: string;
  account_level: number;
  session_playtime_in_ms: number;
  card_id: string;
  title_id: string;
  party_id: string;
}

export interface StatsApiMatchCoach {
  puuid: string;
  team_id: string;
}

export interface StatsApiMatchTeam {
  name?: string;
  tricode?: string;
  url?: string;
  team_id: string;
  rounds: {
    won: number;
    lost: number;
  };
  won: boolean;
  premier_roster: {
    id: string;
    name: string;
    tag: string;
    members: string[];
    customization: {
      icon: string;
      image: string;
      primary_color: string;
      secondary_color: string;
      tertiary_color: string;
    };
  } | null;
}

export interface StatsApiMatchRound {
  id: number;
  result: StatsApiWinReason;
  ceremony: StatsApiCeremony;
  winning_team: string;
  plant: StatsApiMatchRoundPlantDefuse | null;
  defuse: StatsApiMatchRoundPlantDefuse | null;
  stats: StatsApiMatchRoundStat[];
}

export interface StatsApiMatchRoundPlantDefuse {
  round_time_in_ms: number;
  site?: string;
  location: StatsApiMatchLocation;
  player: StatsApiMatchRoundPlayer;
  player_locations: StatsApiMatchRoundPlayerLocation[];
}

export interface StatsApiMatchRoundStat {
  ability_casts: StatsApiMatchAbilities;
  player: StatsApiMatchRoundPlayer;
  damage_events: StatsApiMatchRoundDamageEvent[];
  stats: {
    bodyshots: number;
    headshots: number;
    legshots: number;
    damage: number;
    kills: number;
    assists: number;
    score: number;
  };
  economy: {
    loadout_value: number;
    remaining: number;
    weapon: {
      id: string | null;
      name: string | null;
      type: StatsApiWeaponType;
    };
    armor: {
      id: string;
      name: string;
    } | null;
  };
  was_afk: boolean;
  received_penalty: boolean;
  stayed_in_spawn: boolean;
}

export interface StatsApiMatchRoundDamageEvent {
  puuid: string;
  name: string;
  tag: string;
  team: string;
  bodyshots: number;
  headshots: number;
  legshots: number;
  damage: number;
}

export interface StatsApiMatchKill {
  round: number;
  time_in_round_in_ms: number;
  time_in_match_in_ms: number;
  killer: StatsApiMatchRoundPlayer;
  victim: StatsApiMatchRoundPlayer;
  assistants: StatsApiMatchRoundPlayer[];
  location: StatsApiMatchLocation;
  weapon: {
    id: string;
    name: string | null;
    type: StatsApiWeaponType;
  };
  secondary_fire_mode: boolean;
  player_locations: StatsApiMatchRoundPlayerLocation[];
}

export interface StatsApiMatchRoundPlayer {
  puuid: string;
  name: string;
  tag: string;
  team: string;
}

export interface StatsApiMatchRoundPlayerLocation {
  puuid: string;
  name: string;
  tag: string;
  team: string;
  view_radians: number;
  location: StatsApiMatchLocation;
}

export interface StatsApiMatchLocation {
  x: number;
  y: number;
}

export interface StatsApiMatchAbilities {
  grenade: number | null;
  ability1: number | null;
  ability2: number | null;
  ultimate: number | null;
}

export type StatsApiWeaponType = "weapon" | "ability" | "fall" | "bomb" | null;
