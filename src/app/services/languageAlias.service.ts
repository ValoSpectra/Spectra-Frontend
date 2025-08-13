export class LanguageAliasService {
  static LanguageAliases: Record<string, string> = {
    jp: "ja",
    zh_HANS: "zh_CN",
  };

  public static resolveLanguageAlias(alias: string) {
    return this.LanguageAliases[alias] || alias;
  }
}
