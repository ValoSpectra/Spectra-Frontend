export class Config {
  serverEndpoint = "https://na.valospectra.com:5200";
  redirectUrl = "https://valospectra.com";
  sponsorImageUrls: string[] = [];
  sponsorImageRotateSpeed = 5000; // in milliseconds

  mapbanEndpoint = "https://mapban-socket.valospectra.com";
  // mapbanEndpoint = "http://localhost:11201";

  attackerColorPrimary = "#b82e3c";
  attackerColorSecondary = "#ff4557";
  attackerColorTertiary = "#7c303c";
  attackerColorShieldCurrency = "#ff838f";

  defenderColorPrimary = "#25ac79";
  defenderColorSecondary = "#61eab6";
  defenderColorTertiary = "#215e45";
  defenderColorShieldCurrency = "#61eab6";

  public constructor(init?: Partial<Config>) {
    Object.assign(this, init);
  }
}
