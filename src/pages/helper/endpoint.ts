export const domainWithVersion = `${
  process.env.BACKEND_SERVER_URL ?? "https://api.dev.manage.poker"
}/api/${process.env.VERSION ?? "v1"}`;

export const domainWithOutVersion = `${
  process.env.BACKEND_SERVER_URL ?? "https://api.dev.manage.poker"
}/api`;

export enum EndpointUrl {
  CREATE_USER = 0,
  LOGIN = 1,
  AGENT_RESULTS = 2,
  CLUB_LIST = 3,
  ME = 4,
}

// Define the corresponding URLs separately
export const endpointUrls: Record<EndpointUrl, string> = {
  [EndpointUrl.CREATE_USER]: `${domainWithVersion}/auth/users/`,
  [EndpointUrl.LOGIN]: `${domainWithVersion}/auth/jwt/create/`,
  // :nickname=<username> we have remove this for now.
  [EndpointUrl.AGENT_RESULTS]: `${domainWithOutVersion}/views/agents-summary/agent-results/?from_date=:fromDate&to_date=:toDate&club=:club`,
  [EndpointUrl.CLUB_LIST]: `${domainWithOutVersion}/views/agents-summary/clubs-list/`,
  [EndpointUrl.ME]: `${domainWithOutVersion}/user/me`,
};
