export interface VerifyRequest {
  id: string;
  hash: string;
  expires: string;
  signature: string;
}
