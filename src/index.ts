import { writeJSON } from './helpers/writeJSON';
import { Blockchain } from './blockchain';

const difficulty = Number(process.argv[2]) || 4;
const blocks = Number(process.argv[3]) || 10;
const blockchain = new Blockchain(difficulty);

for (let i = 0; i < blocks; i++) {
  const block = blockchain.genBlock(`Block ${i}`);
  const minedBlock = blockchain.mineBlock(block);
  blockchain.tryAddBlock(minedBlock);
}

writeJSON('blockchain', blockchain.chain);
