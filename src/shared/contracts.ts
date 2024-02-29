import * as Greeter from "hello-soroban-client";
import * as Incrementor from "incrementor-client";

const rpcUrl = "https://soroban-testnet.stellar.org"; // from https://soroban.stellar.org/docs/reference/rpc#public-rpc-providers

export const greeter = new Greeter.Contract({
  ...Greeter.networks.testnet,
  rpcUrl,
});

export const incrementor = new Incrementor.Contract({
  ...Incrementor.networks.testnet,
  rpcUrl,
});
