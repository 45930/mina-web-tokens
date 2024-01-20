import { AccountUpdate, Field, Mina, PrivateKey, PublicKey, Signature, UInt64 } from 'o1js';
import { MWT } from '../../src/MWT.js';

describe('MWT', () => {
  it('Issuer must be signer', () => {
    const issuer = PrivateKey.random();
    const subject = PrivateKey.random();
    const spoofer = PrivateKey.random();

    const tokenData = {
      iss: issuer.toPublicKey(),
      sub: subject.toPublicKey()
    };

    const mwt = new MWT(tokenData);

    const validToken = mwt.sign(issuer);
    const invalidToken = Signature.create(
      spoofer,
      [
        ...issuer.toPublicKey().toFields(),
        ...subject.toPublicKey().toFields(),
        UInt64.from(0).value,
        UInt64.from(0).value,
        Field(0),
        UInt64.from(0).value,
        Field(0),
        Field(0)
      ]
    )

    expect(MWT.verify(validToken, tokenData).toBoolean()).toBe(true);
    expect(MWT.verify(invalidToken, tokenData).toBoolean()).toBe(false);
  });

  it('Claimed token data must be leigimate', () => {
    const issuer = PrivateKey.random();
    const subject = PrivateKey.random();

    const validTokenData = {
      iss: issuer.toPublicKey(),
      sub: subject.toPublicKey()
    };

    const invalidTokenData = {
      iss: issuer.toPublicKey(),
      sub: issuer.toPublicKey()
    };

    const validTokenDataExtended = {
      iss: issuer.toPublicKey(),
      sub: subject.toPublicKey(),
      exp: UInt64.from(10_000),
      nbf_block: Field(25)
    };

    const invalidTokenDataExtended = {
      iss: issuer.toPublicKey(),
      sub: subject.toPublicKey(),
      exp: UInt64.from(10_001),
      nbf_block: Field(25)
    };

    const invalidTokenDataMissing = {
      iss: issuer.toPublicKey(),
      sub: subject.toPublicKey(),
      exp: UInt64.from(10_000)
    };

    const mwt = new MWT(validTokenData);
    const token = mwt.sign(issuer);

    const mwtExtended = new MWT(validTokenDataExtended);
    const tokenExtended = mwtExtended.sign(issuer);

    // Valid Cases
    expect(MWT.verify(token, validTokenData).toBoolean()).toBe(true);
    expect(MWT.verify(tokenExtended, validTokenDataExtended).toBoolean()).toBe(true);

    // Invalid Cases
    expect(MWT.verify(token, invalidTokenData).toBoolean()).toBe(false);
    expect(MWT.verify(tokenExtended, invalidTokenDataExtended).toBoolean()).toBe(false);
    expect(MWT.verify(tokenExtended, invalidTokenDataMissing).toBoolean()).toBe(false);
  });
});
