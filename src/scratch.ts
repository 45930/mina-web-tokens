import { Field, PrivateKey, PublicKey, Signature } from "o1js";
import jwt from "jsonwebtoken";

const P256_KEY = 
`-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIEAhT7cezMG3YX6uow+tr+PYYIQpddChtD+4kQKCdaPSoAoGCCqGSM49
AwEHoUQDQgAEb20XDk/dNdY8Pyj58dfHJl+13ngUMU8LVt2nezm93XKX5rr3+I2/
GEjHle+84NSvOcI64kfru+vfwhokimpFBw==
-----END EC PRIVATE KEY-----
`

const P256_PUBLIC_KEY = 
`
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEb20XDk/dNdY8Pyj58dfHJl+13ngU
MU8LVt2nezm93XKX5rr3+I2/GEjHle+84NSvOcI64kfru+vfwhokimpFBw==
-----END PUBLIC KEY-----
`

const minaKeyStr = 'EKE2GXDY89E4H64VFwkuqovH8VsFxeXHnvU1gmZwZniPsAqDARC4';

const minaKey = PrivateKey.fromBase58(minaKeyStr);
const subject = minaKey.toPublicKey();
const header = {
  alg: "ES256",
  typ: 'JWT'
}
const payload = {
  sub: subject.toBase58()
}

const token = jwt.sign(payload, P256_KEY, { header })

console.log(token);

const [encodedHeader, encodedPayload, mac] = token.split('.');
const decodedHeader = atob(encodedHeader);
const decodedPayload = atob(encodedPayload);

console.log(decodedHeader);
console.log(decodedPayload);
console.log(mac);

const decoded = jwt.verify(token, P256_PUBLIC_KEY)

console.log(decoded);
