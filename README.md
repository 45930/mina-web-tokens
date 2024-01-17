# Mina Web Tokens
Token authentication for ZkApps on Mina

## Mission

Interacting with ZkApps on Mina can involve a lot of signatures, which can be both cumbersome and time consuming.  The mission of mina web tokens is to give developers a more ergonomic interface which they can expose to their users.

## JWT

The project is based on JSON web tokens, though it may not implement the exact spec.  Ideally it will both implement the JWT spec and be usable with existing JWT tools, and also be usable with Mina provable code.  If there is an impasse between the 2, it will choose to remain in provable code.
