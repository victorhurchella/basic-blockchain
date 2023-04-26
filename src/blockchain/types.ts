export interface Block {
  header: {
    nonce: number;
    hash: string;
  };
  payload: {
    sequence: number;
    timestamp: number;
    data: any;
    previousHash: string;
  };
}
