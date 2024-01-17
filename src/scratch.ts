import { Field, PrivateKey, PublicKey, Signature, EcdsaSignature } from "o1js";
import { encode, decode } from '@web3pack/base58-check';
import { getHashes } from "node:crypto";

const minaKeyStr = 'EKE2GXDY89E4H64VFwkuqovH8VsFxeXHnvU1gmZwZniPsAqDARC4';

const minaKey = PrivateKey.fromBase58(minaKeyStr);
const subject = minaKey.toPublicKey();
const header = {
  alg: "HS256",
  typ: 'MWT'
}
const payload = {
  sub: subject.toBase58()
}

const b64Header = btoa(JSON.stringify(header))
const b64Payload = btoa(JSON.stringify(payload))
const sig = EcdsaSignature.sign(
  Uint8Array.from(JSON.stringify(header).split("").map(x => x.charCodeAt(0))),
  minaKey.toBigInt()
)
const b64Sig = btoa(JSON.stringify(sig.toBigInt()))

const mwt = b64Header + '.' +
b64Payload + '.' +
b64Sig

console.log(mwt);

const [encodedHeader, encodedPayload, hmac] = mwt.split('.');
const decodedHeader = atob(encodedHeader);
const decodedPayload = atob(encodedPayload);
// const verify = createVerify('hmac')

console.log(getHashes());

