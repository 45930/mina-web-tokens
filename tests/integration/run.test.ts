import { AccountUpdate, Field, Mina, PrivateKey, PublicKey, UInt64 } from 'o1js';
import { ImplementingContract } from './ImplementingContract.js';
import { MWT } from '../../src/MWT.js';

describe('ImplementingContract', () => {
  let zkApp: ImplementingContract,
    zkAppPrivateKey: PrivateKey,
    zkAppAddress: PublicKey,
    sender: PublicKey,
    senderKey: PrivateKey,
    userKey: PrivateKey,
    userAddress: PublicKey;

  beforeEach(async () => {
    let Local = Mina.LocalBlockchain({ proofsEnabled: false });
    Mina.setActiveInstance(Local);
    sender = Local.testAccounts[0].publicKey;
    senderKey = Local.testAccounts[0].privateKey;
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkApp = new ImplementingContract(zkAppAddress);
    userKey = PrivateKey.random();
    userAddress = userKey.toPublicKey();
  });

  it('allows a user to edit state via token auth', async () => {
    await deploy(zkApp, zkAppPrivateKey, sender, senderKey);

    const tokenData = {
      iss: userAddress,
      sub: zkAppAddress,
      exp: UInt64.from((new Date()).getTime() + 15_000),
      scope: Field(1)
    };
    
    const mwt = new MWT(tokenData).sign(userKey);

    let tx = await Mina.transaction(sender, () => {
      let zkApp = new ImplementingContract(zkAppAddress);
      zkApp.increment(userAddress, mwt, tokenData);
    });
    await tx.prove();
    await tx.sign([senderKey]).send();

    const stateValue = zkApp.x.get().toBigInt();
    expect(stateValue).toBe(1n);
  });
});

async function deploy(
  zkApp: ImplementingContract,
  zkAppPrivateKey: PrivateKey,
  sender: PublicKey,
  senderKey: PrivateKey
) {
  let tx = await Mina.transaction(sender, () => {
    AccountUpdate.fundNewAccount(sender);
    zkApp.deploy();
  });
  await tx.prove();
  // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
  await tx.sign([zkAppPrivateKey, senderKey]).send();
}