import { Field, PublicKey, Signature, SmartContract, State, Struct, UInt64, method, state } from "o1js";
import { MWT } from "./MWT";

class MyContractToken extends Struct({
  iss: PublicKey,
  sub: PublicKey,
  exp: UInt64,
  scope: Field
}) { }

class ImplementingContract extends SmartContract {
  @state(Field) x = State<Field>();

  @method
  increment(user: PublicKey, token: Signature, tokenData: MyContractToken) {
    const x = this.x.getAndRequireEquals();
    this.verifyToken(token, tokenData);
    this.x.set(x.add(1));
  }

  verifyToken(token: Signature, tokenData: MyContractToken) {
    const networkTime = this.network.timestamp.getAndRequireEquals();
    MWT.verify(token, tokenData);
    tokenData.sub.assertEquals(this.address);
    tokenData.exp.assertGreaterThan(networkTime);
    tokenData.scope.assertGreaterThanOrEqual(Field(1));
  }
}