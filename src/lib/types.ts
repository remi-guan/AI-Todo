import type { Session } from '@inrupt/solid-client-authn-browser';

export interface ExtendSolidSession {
  session: Session;
  webId: string;
  podURL: string;
  isLoggedIn: boolean;
}

export interface BuyServiceParams {
  accountURL: string;
  podURL: string;
  amount: number;
  credentialId: string;
}

export interface BuyServiceSuccess {
  status: 200,
  message: string,
  amount: number;
  filename: string;
}

export interface BuyServiceFailed {
  status: 400 | 500,
  errorMessage: string,
}

export type BuyServiceResponse = BuyServiceSuccess | BuyServiceFailed;
