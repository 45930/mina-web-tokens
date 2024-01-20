import { Field, Signature, UInt64 } from "o1js";
/**
 * iss.........Issuer public key (e.g. the user)
 * sub.........Subject public key (e.g. the smart contract that is requesting permission)
 * iat.........Timestamp when the cred was issued
 * exp.........Timestamp after which the cred is invalid
 * exp_block...Block height after which the cred is invalid
 * nbf.........Timestamp before which the cred is invalid
 * nbf_block...Block height before which the cred is invalid
 * scope ......Level of access granted by the cred
 */
export class MWT {
    constructor(params) {
        this.data = params;
    }
    sign(key) {
        // Signer must also be the issuer
        key.toPublicKey().assertEquals(this.data.iss);
        return Signature.create(key, [
            ...this.data.iss.toFields(),
            ...this.data.sub.toFields(),
            (this.data.iat || UInt64.from(0)).value,
            (this.data.exp || UInt64.from(0)).value,
            Field(this.data.exp_block || 0),
            (this.data.nbf || UInt64.from(0)).value,
            Field(this.data.nbf_block || 0),
            Field(this.data.scope || 0)
        ]);
    }
    static verify(sig, claim) {
        return sig.verify(claim.iss, [
            ...claim.iss.toFields(),
            ...claim.sub.toFields(),
            (claim.iat || UInt64.from(0)).value,
            (claim.exp || UInt64.from(0)).value,
            Field(claim.exp_block || 0),
            (claim.nbf || UInt64.from(0)).value,
            Field(claim.nbf_block || 0),
            Field(claim.scope || 0)
        ]);
    }
}
//# sourceMappingURL=MWT.js.map