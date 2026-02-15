export class Config {
  serverEndpoint = "http://localhost:5200";
  redirectUrl = "https://valospectra.com";
  sponsorImageUrls: string[] = [];
  sponsorImageRotateSpeed = 5000; // in milliseconds

  mapbanEndpoint = "https://mapban-socket.valospectra.com";
  // mapbanEndpoint = "http://localhost:11201";

  attackerColorPrimary = "#b82e3c";
  attackerColorSecondary = "#ff4557";
  attackerColorShieldCurrency = "#ff838f";

  defenderColorPrimary = "#25ac79";
  defenderColorSecondary = "#61eab6";
  defenderColorShieldCurrency = "#61eab6";

  statsEndpoint = "https://stats.valospectra.com";
  // statsEndpoint = "http://localhost:31000";

  extrasEndpoint = "https://eu-extras.valospectra.com";
  // extrasEndpoint = "http://localhost:5101";

  public constructor(init?: Partial<Config>) {
    Object.assign(this, init);
  }
}
