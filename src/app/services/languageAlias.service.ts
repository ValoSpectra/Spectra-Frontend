export class LanguageAliasService {
  static LanguageAliases: Record<string, string> = {
    jp: "ja",
  };

  public static resolveLanguageAlias(alias: string) {
    return this.LanguageAliases[alias] || alias;
  }
}
