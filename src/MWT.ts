import { Field, PrivateKey, PublicKey, Signature, Struct, UInt64 } from "o1js";

export type MWTData = {
  iss: PublicKey,
  sub: PublicKey,
  iat?: UInt64,
  exp?: UInt64,
  exp_block?: Field,
  nbf?: UInt64,
  nbf_block?: Field,
  scope?: Field
}

export type MWTClaim = {
  iss: string,
  sub: string,
  iat?: number,
  exp?: number,
  exp_block?: number,
  nbf?: number,
  nbf_block?: number,
  scope?: number
}

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
  data: MWTData;

  constructor(params: MWTData) {
    this.data = params;
  }

  sign(key: PrivateKey): Signature {
    // Signer must also be the issuer
    key.toPublicKey().assertEquals(this.data.iss);
    return Signature.create(
      key,
      [
        ...this.data.iss.toFields(),
        ...this.data.sub.toFields(),
        (this.data.iat || UInt64.from(0)).value,
        (this.data.exp || UInt64.from(0)).value,
        Field(this.data.exp_block || 0),
        (this.data.nbf || UInt64.from(0)).value,
        Field(this.data.nbf_block || 0),
        Field(this.data.scope || 0)
      ]
    )
  }

  static verify(sig: Signature, claim: MWTData) {
    return sig.verify(
      claim.iss,
      [
        ...claim.iss.toFields(),
        ...claim.sub.toFields(),
        (claim.iat || UInt64.from(0)).value,
        (claim.exp || UInt64.from(0)).value,
        Field(claim.exp_block || 0),
        (claim.nbf || UInt64.from(0)).value,
        Field(claim.nbf_block || 0),
        Field(claim.scope || 0)
      ]
    )
  }
}