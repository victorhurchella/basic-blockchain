import { Block } from './types';
import { hash } from '../helpers/hash';
import { validHash } from '../helpers/validHash';

export class Blockchain {
  #chain: Array<Block> = [];

  constructor(private difficulty: number = 4) {
    this.#chain.push(this.createGenesisBlock());
  }

  private createGenesisBlock(): Block {
    const genesisPayload: Block['payload'] = {
      sequence: 0,
      timestamp: +new Date(),
      data: 'Genesis Block',
      previousHash: '',
    };

    // Build genesis block
    const genesisBlock: Block = {
      header: {
        nonce: 0,
        hash: hash(JSON.stringify(genesisPayload)),
      },
      payload: genesisPayload,
    };

    return genesisBlock;
  }

  get chain(): Array<Block> {
    return this.#chain;
  }

  private get latestBlock(): Block {
    return this.#chain.at(-1) as Block;
  }

  private latestBlockHash(): string {
    return this.latestBlock.header.hash;
  }

  genBlock(data: any): Block['payload'] {
    const block = {
      sequence: this.latestBlock.payload.sequence + 1,
      timestamp: +new Date(),
      data,
      previousHash: this.latestBlockHash(),
    };

    console.log(`Block ${block.sequence} generated`);

    return block;
  }

  mineBlock(blockPayload: Block['payload']): Block {
    let nonce = 0;
    let blockHash = '';

    // Keep mining until we get a valid hash
    while (!validHash(blockHash, this.difficulty)) {
      nonce += 1;
      blockHash = hash(JSON.stringify(blockPayload) + nonce);
    }

    // Build block
    const minedBlock = {
      header: {
        nonce,
        hash: blockHash,
      },
      payload: blockPayload,
    };

    return minedBlock;
  }

  blockIsValid(block: Block): boolean {
    // Invalid hash
    if (block.header.hash !== hash(JSON.stringify(block.payload) + block.header.nonce)) return false;

    // Previous hash is valid
    if (block.payload.previousHash !== this.latestBlockHash()) return false;

    // Invalid nonce
    if (!validHash(block.header.hash, this.difficulty)) return false;

    // Valid block
    return true;
  }

  tryAddBlock(block: Block): Array<Block> {
    if (this.blockIsValid(block)) this.#chain.push(block);

    return this.#chain;
  }
}
