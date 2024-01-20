import { PublicKey, Signature, SmartContract, State, UInt64 } from "o1js";
declare const MyContractToken_base: (new (value: {
    iss: PublicKey;
    sub: PublicKey;
    exp: UInt64;
    scope: import("o1js/dist/node/lib/field").Field;
}) => {
    iss: PublicKey;
    sub: PublicKey;
    exp: UInt64;
    scope: import("o1js/dist/node/lib/field").Field;
}) & {
    _isStruct: true;
} & import("o1js/dist/node/snarky").ProvablePure<{
    iss: PublicKey;
    sub: PublicKey;
    exp: UInt64;
    scope: import("o1js/dist/node/lib/field").Field;
}> & {
    toInput: (x: {
        iss: PublicKey;
        sub: PublicKey;
        exp: UInt64;
        scope: import("o1js/dist/node/lib/field").Field;
    }) => {
        fields?: import("o1js/dist/node/lib/field").Field[] | undefined;
        packed?: [import("o1js/dist/node/lib/field").Field, number][] | undefined;
    };
    toJSON: (x: {
        iss: PublicKey;
        sub: PublicKey;
        exp: UInt64;
        scope: import("o1js/dist/node/lib/field").Field;
    }) => {
        iss: string;
        sub: string;
        exp: string;
        scope: string;
    };
    fromJSON: (x: {
        iss: string;
        sub: string;
        exp: string;
        scope: string;
    }) => {
        iss: PublicKey;
        sub: PublicKey;
        exp: UInt64;
        scope: import("o1js/dist/node/lib/field").Field;
    };
    empty: () => {
        iss: PublicKey;
        sub: PublicKey;
        exp: UInt64;
        scope: import("o1js/dist/node/lib/field").Field;
    };
};
declare class MyContractToken extends MyContractToken_base {
}
export declare class ImplementingContract extends SmartContract {
    x: State<import("o1js/dist/node/lib/field").Field>;
    init(): void;
    increment(user: PublicKey, token: Signature, tokenData: MyContractToken): void;
    verifyToken(token: Signature, tokenData: MyContractToken): void;
}
export {};
