var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, PublicKey, Signature, SmartContract, State, Struct, UInt64, method, state } from "o1js";
import { MWT } from "../../src/MWT";
class MyContractToken extends Struct({
    iss: PublicKey,
    sub: PublicKey,
    exp: UInt64,
    scope: Field
}) {
}
export class ImplementingContract extends SmartContract {
    constructor() {
        super(...arguments);
        this.x = State();
    }
    init() {
        super.init();
        this.x.set(Field(0));
    }
    increment(user, token, tokenData) {
        const x = this.x.getAndRequireEquals();
        this.verifyToken(token, tokenData);
        this.x.set(x.add(1));
    }
    verifyToken(token, tokenData) {
        const networkTime = this.network.timestamp.getAndRequireEquals();
        MWT.verify(token, tokenData);
        tokenData.sub.assertEquals(this.address);
        tokenData.exp.assertGreaterThan(networkTime);
        tokenData.scope.assertGreaterThanOrEqual(Field(1));
    }
}
__decorate([
    state(Field),
    __metadata("design:type", Object)
], ImplementingContract.prototype, "x", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PublicKey, Signature, MyContractToken]),
    __metadata("design:returntype", void 0)
], ImplementingContract.prototype, "increment", null);
//# sourceMappingURL=ImplementingContract.js.map