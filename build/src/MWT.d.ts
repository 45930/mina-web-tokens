import { Field, PrivateKey, PublicKey, Signature, UInt64 } from "o1js";
export type MWTData = {
    iss: PublicKey;
    sub: PublicKey;
    iat?: UInt64;
    exp?: UInt64;
    exp_block?: Field;
    nbf?: UInt64;
    nbf_block?: Field;
    scope?: Field;
};
export type MWTClaim = {
    iss: string;
    sub: string;
    iat?: number;
    exp?: number;
    exp_block?: number;
    nbf?: number;
    nbf_block?: number;
    scope?: number;
};
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
export declare class MWT {
    data: MWTData;
    constructor(params: MWTData);
    sign(key: PrivateKey): Signature;
    static verify(sig: Signature, claim: MWTData): import("o1js/dist/node/lib/bool").Bool;
}
