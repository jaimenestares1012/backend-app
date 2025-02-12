export interface EnvConfigurationType {
  environment: string;
  port: number;
  admin: string;
  bd: BDParameteres;
}

export interface BDParameteres {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export interface AcLog {
  application: string;
  domain: string;
  levels: string[];
}

export interface MongoParameters {
  uri: string;
  database: string;
}

export interface GdDynamicReportingType {
  baseUrl: string;
}

export interface ItExternalType {
  baseUrl: string;
}

export interface FrManagementType {
  baseUrl: string;
}
