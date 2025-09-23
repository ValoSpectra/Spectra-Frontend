export class i18nHelper {
  static LanguageAliases: Record<string, string> = {
    jp: "ja",
    zh_CN: "zh_HANS",
  };

  public static resolveLanguageAlias(alias: string) {
    return this.LanguageAliases[alias] || alias;
  }
}

export enum TranslateKeys {
  Playercard_Kills = "playercard.kills",
  Playercard_Deaths = "playercard.deaths",
  Playercards_Assists = "playercard.assists",
  Endround_RoundWin = "endround.round_win",
  Endround_Winner = "endround.win",
  Endround_Attacker = "endround.attacker",
  Endround_Defender = "endround.defender",
  Endround_Round = "endround.round",
  Mapinfo_Live = "mapinfo.live",
  Mapinfo_Decider = "mapinfo.decider",
  Mapinfo_Next = "mapinfo.next",
  Watermark_Text = "topinfo.watermark",
  Top_RoundNumber = "topscore.round",
  Top_OvertimeNumber = "topscore.overtime",
  Team_Is_Attacker = "team.attacker",
  Team_Is_Defender = "team.defender",
  Scoreboard_Spent = "scoreboard.spent",
  Scoreboard_Kills = "scoreboard.kills",
  Scoreboard_Deaths = "scoreboard.deaths",
  Scoreboard_Assists = "scoreboard.assists",
  Timeout_Techpause = "timeout.technical_pause",
  Timeout_Tactical = "timeout.tactical_timeout",
}
