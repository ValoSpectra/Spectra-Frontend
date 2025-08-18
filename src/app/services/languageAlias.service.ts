export class LanguageAliasService {
  static LanguageAliases: Record<string, string> = {
    jp: "ja",
    zh_CN: "zh_HANS",
  };

  public static resolveLanguageAlias(alias: string) {
    return this.LanguageAliases[alias] || alias;
  }
}
