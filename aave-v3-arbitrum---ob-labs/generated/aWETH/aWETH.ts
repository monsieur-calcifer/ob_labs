// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get spender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class BalanceTransfer extends ethereum.Event {
  get params(): BalanceTransfer__Params {
    return new BalanceTransfer__Params(this);
  }
}

export class BalanceTransfer__Params {
  _event: BalanceTransfer;

  constructor(event: BalanceTransfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get index(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Burn extends ethereum.Event {
  get params(): Burn__Params {
    return new Burn__Params(this);
  }
}

export class Burn__Params {
  _event: Burn;

  constructor(event: Burn) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get target(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get balanceIncrease(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get index(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get underlyingAsset(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pool(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get treasury(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get incentivesController(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get aTokenDecimals(): i32 {
    return this._event.parameters[4].value.toI32();
  }

  get aTokenName(): string {
    return this._event.parameters[5].value.toString();
  }

  get aTokenSymbol(): string {
    return this._event.parameters[6].value.toString();
  }

  get params(): Bytes {
    return this._event.parameters[7].value.toBytes();
  }
}

export class Mint extends ethereum.Event {
  get params(): Mint__Params {
    return new Mint__Params(this);
  }
}

export class Mint__Params {
  _event: Mint;

  constructor(event: Mint) {
    this._event = event;
  }

  get caller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get onBehalfOf(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get balanceIncrease(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get index(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class aWETH__getScaledUserBalanceAndSupplyResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getValue0(): BigInt {
    return this.value0;
  }

  getValue1(): BigInt {
    return this.value1;
  }
}

export class aWETH extends ethereum.SmartContract {
  static bind(address: Address): aWETH {
    return new aWETH("aWETH", address);
  }

  ATOKEN_REVISION(): BigInt {
    let result = super.call(
      "ATOKEN_REVISION",
      "ATOKEN_REVISION():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_ATOKEN_REVISION(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "ATOKEN_REVISION",
      "ATOKEN_REVISION():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  DOMAIN_SEPARATOR(): Bytes {
    let result = super.call(
      "DOMAIN_SEPARATOR",
      "DOMAIN_SEPARATOR():(bytes32)",
      [],
    );

    return result[0].toBytes();
  }

  try_DOMAIN_SEPARATOR(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "DOMAIN_SEPARATOR",
      "DOMAIN_SEPARATOR():(bytes32)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  EIP712_REVISION(): Bytes {
    let result = super.call("EIP712_REVISION", "EIP712_REVISION():(bytes)", []);

    return result[0].toBytes();
  }

  try_EIP712_REVISION(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "EIP712_REVISION",
      "EIP712_REVISION():(bytes)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  PERMIT_TYPEHASH(): Bytes {
    let result = super.call(
      "PERMIT_TYPEHASH",
      "PERMIT_TYPEHASH():(bytes32)",
      [],
    );

    return result[0].toBytes();
  }

  try_PERMIT_TYPEHASH(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "PERMIT_TYPEHASH",
      "PERMIT_TYPEHASH():(bytes32)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  POOL(): Address {
    let result = super.call("POOL", "POOL():(address)", []);

    return result[0].toAddress();
  }

  try_POOL(): ethereum.CallResult<Address> {
    let result = super.tryCall("POOL", "POOL():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  RESERVE_TREASURY_ADDRESS(): Address {
    let result = super.call(
      "RESERVE_TREASURY_ADDRESS",
      "RESERVE_TREASURY_ADDRESS():(address)",
      [],
    );

    return result[0].toAddress();
  }

  try_RESERVE_TREASURY_ADDRESS(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "RESERVE_TREASURY_ADDRESS",
      "RESERVE_TREASURY_ADDRESS():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  UNDERLYING_ASSET_ADDRESS(): Address {
    let result = super.call(
      "UNDERLYING_ASSET_ADDRESS",
      "UNDERLYING_ASSET_ADDRESS():(address)",
      [],
    );

    return result[0].toAddress();
  }

  try_UNDERLYING_ASSET_ADDRESS(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "UNDERLYING_ASSET_ADDRESS",
      "UNDERLYING_ASSET_ADDRESS():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  allowance(owner: Address, spender: Address): BigInt {
    let result = super.call(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(spender)],
    );

    return result[0].toBigInt();
  }

  try_allowance(owner: Address, spender: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(spender)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  approve(spender: Address, amount: BigInt): boolean {
    let result = super.call("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(spender),
      ethereum.Value.fromUnsignedBigInt(amount),
    ]);

    return result[0].toBoolean();
  }

  try_approve(spender: Address, amount: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(spender),
      ethereum.Value.fromUnsignedBigInt(amount),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  balanceOf(user: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(user),
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(user),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  decimals(): i32 {
    let result = super.call("decimals", "decimals():(uint8)", []);

    return result[0].toI32();
  }

  try_decimals(): ethereum.CallResult<i32> {
    let result = super.tryCall("decimals", "decimals():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  decreaseAllowance(spender: Address, subtractedValue: BigInt): boolean {
    let result = super.call(
      "decreaseAllowance",
      "decreaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(spender),
        ethereum.Value.fromUnsignedBigInt(subtractedValue),
      ],
    );

    return result[0].toBoolean();
  }

  try_decreaseAllowance(
    spender: Address,
    subtractedValue: BigInt,
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "decreaseAllowance",
      "decreaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(spender),
        ethereum.Value.fromUnsignedBigInt(subtractedValue),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getIncentivesController(): Address {
    let result = super.call(
      "getIncentivesController",
      "getIncentivesController():(address)",
      [],
    );

    return result[0].toAddress();
  }

  try_getIncentivesController(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getIncentivesController",
      "getIncentivesController():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getPreviousIndex(user: Address): BigInt {
    let result = super.call(
      "getPreviousIndex",
      "getPreviousIndex(address):(uint256)",
      [ethereum.Value.fromAddress(user)],
    );

    return result[0].toBigInt();
  }

  try_getPreviousIndex(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPreviousIndex",
      "getPreviousIndex(address):(uint256)",
      [ethereum.Value.fromAddress(user)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getScaledUserBalanceAndSupply(
    user: Address,
  ): aWETH__getScaledUserBalanceAndSupplyResult {
    let result = super.call(
      "getScaledUserBalanceAndSupply",
      "getScaledUserBalanceAndSupply(address):(uint256,uint256)",
      [ethereum.Value.fromAddress(user)],
    );

    return new aWETH__getScaledUserBalanceAndSupplyResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
    );
  }

  try_getScaledUserBalanceAndSupply(
    user: Address,
  ): ethereum.CallResult<aWETH__getScaledUserBalanceAndSupplyResult> {
    let result = super.tryCall(
      "getScaledUserBalanceAndSupply",
      "getScaledUserBalanceAndSupply(address):(uint256,uint256)",
      [ethereum.Value.fromAddress(user)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new aWETH__getScaledUserBalanceAndSupplyResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
      ),
    );
  }

  increaseAllowance(spender: Address, addedValue: BigInt): boolean {
    let result = super.call(
      "increaseAllowance",
      "increaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(spender),
        ethereum.Value.fromUnsignedBigInt(addedValue),
      ],
    );

    return result[0].toBoolean();
  }

  try_increaseAllowance(
    spender: Address,
    addedValue: BigInt,
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "increaseAllowance",
      "increaseAllowance(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(spender),
        ethereum.Value.fromUnsignedBigInt(addedValue),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  mint(
    caller: Address,
    onBehalfOf: Address,
    amount: BigInt,
    index: BigInt,
  ): boolean {
    let result = super.call(
      "mint",
      "mint(address,address,uint256,uint256):(bool)",
      [
        ethereum.Value.fromAddress(caller),
        ethereum.Value.fromAddress(onBehalfOf),
        ethereum.Value.fromUnsignedBigInt(amount),
        ethereum.Value.fromUnsignedBigInt(index),
      ],
    );

    return result[0].toBoolean();
  }

  try_mint(
    caller: Address,
    onBehalfOf: Address,
    amount: BigInt,
    index: BigInt,
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "mint",
      "mint(address,address,uint256,uint256):(bool)",
      [
        ethereum.Value.fromAddress(caller),
        ethereum.Value.fromAddress(onBehalfOf),
        ethereum.Value.fromUnsignedBigInt(amount),
        ethereum.Value.fromUnsignedBigInt(index),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  nonces(owner: Address): BigInt {
    let result = super.call("nonces", "nonces(address):(uint256)", [
      ethereum.Value.fromAddress(owner),
    ]);

    return result[0].toBigInt();
  }

  try_nonces(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("nonces", "nonces(address):(uint256)", [
      ethereum.Value.fromAddress(owner),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  scaledBalanceOf(user: Address): BigInt {
    let result = super.call(
      "scaledBalanceOf",
      "scaledBalanceOf(address):(uint256)",
      [ethereum.Value.fromAddress(user)],
    );

    return result[0].toBigInt();
  }

  try_scaledBalanceOf(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "scaledBalanceOf",
      "scaledBalanceOf(address):(uint256)",
      [ethereum.Value.fromAddress(user)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  scaledTotalSupply(): BigInt {
    let result = super.call(
      "scaledTotalSupply",
      "scaledTotalSupply():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_scaledTotalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "scaledTotalSupply",
      "scaledTotalSupply():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  transfer(recipient: Address, amount: BigInt): boolean {
    let result = super.call("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(recipient),
      ethereum.Value.fromUnsignedBigInt(amount),
    ]);

    return result[0].toBoolean();
  }

  try_transfer(
    recipient: Address,
    amount: BigInt,
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(recipient),
      ethereum.Value.fromUnsignedBigInt(amount),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  transferFrom(sender: Address, recipient: Address, amount: BigInt): boolean {
    let result = super.call(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(sender),
        ethereum.Value.fromAddress(recipient),
        ethereum.Value.fromUnsignedBigInt(amount),
      ],
    );

    return result[0].toBoolean();
  }

  try_transferFrom(
    sender: Address,
    recipient: Address,
    amount: BigInt,
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(sender),
        ethereum.Value.fromAddress(recipient),
        ethereum.Value.fromUnsignedBigInt(amount),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get pool(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class BurnCall extends ethereum.Call {
  get inputs(): BurnCall__Inputs {
    return new BurnCall__Inputs(this);
  }

  get outputs(): BurnCall__Outputs {
    return new BurnCall__Outputs(this);
  }
}

export class BurnCall__Inputs {
  _call: BurnCall;

  constructor(call: BurnCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get receiverOfUnderlying(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get index(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class BurnCall__Outputs {
  _call: BurnCall;

  constructor(call: BurnCall) {
    this._call = call;
  }
}

export class DecreaseAllowanceCall extends ethereum.Call {
  get inputs(): DecreaseAllowanceCall__Inputs {
    return new DecreaseAllowanceCall__Inputs(this);
  }

  get outputs(): DecreaseAllowanceCall__Outputs {
    return new DecreaseAllowanceCall__Outputs(this);
  }
}

export class DecreaseAllowanceCall__Inputs {
  _call: DecreaseAllowanceCall;

  constructor(call: DecreaseAllowanceCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get subtractedValue(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DecreaseAllowanceCall__Outputs {
  _call: DecreaseAllowanceCall;

  constructor(call: DecreaseAllowanceCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class HandleRepaymentCall extends ethereum.Call {
  get inputs(): HandleRepaymentCall__Inputs {
    return new HandleRepaymentCall__Inputs(this);
  }

  get outputs(): HandleRepaymentCall__Outputs {
    return new HandleRepaymentCall__Outputs(this);
  }
}

export class HandleRepaymentCall__Inputs {
  _call: HandleRepaymentCall;

  constructor(call: HandleRepaymentCall) {
    this._call = call;
  }

  get user(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get onBehalfOf(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class HandleRepaymentCall__Outputs {
  _call: HandleRepaymentCall;

  constructor(call: HandleRepaymentCall) {
    this._call = call;
  }
}

export class IncreaseAllowanceCall extends ethereum.Call {
  get inputs(): IncreaseAllowanceCall__Inputs {
    return new IncreaseAllowanceCall__Inputs(this);
  }

  get outputs(): IncreaseAllowanceCall__Outputs {
    return new IncreaseAllowanceCall__Outputs(this);
  }
}

export class IncreaseAllowanceCall__Inputs {
  _call: IncreaseAllowanceCall;

  constructor(call: IncreaseAllowanceCall) {
    this._call = call;
  }

  get spender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get addedValue(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class IncreaseAllowanceCall__Outputs {
  _call: IncreaseAllowanceCall;

  constructor(call: IncreaseAllowanceCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get initializingPool(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get treasury(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get underlyingAsset(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get incentivesController(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get aTokenDecimals(): i32 {
    return this._call.inputValues[4].value.toI32();
  }

  get aTokenName(): string {
    return this._call.inputValues[5].value.toString();
  }

  get aTokenSymbol(): string {
    return this._call.inputValues[6].value.toString();
  }

  get params(): Bytes {
    return this._call.inputValues[7].value.toBytes();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class MintCall extends ethereum.Call {
  get inputs(): MintCall__Inputs {
    return new MintCall__Inputs(this);
  }

  get outputs(): MintCall__Outputs {
    return new MintCall__Outputs(this);
  }
}

export class MintCall__Inputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get caller(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get onBehalfOf(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get index(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class MintCall__Outputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class MintToTreasuryCall extends ethereum.Call {
  get inputs(): MintToTreasuryCall__Inputs {
    return new MintToTreasuryCall__Inputs(this);
  }

  get outputs(): MintToTreasuryCall__Outputs {
    return new MintToTreasuryCall__Outputs(this);
  }
}

export class MintToTreasuryCall__Inputs {
  _call: MintToTreasuryCall;

  constructor(call: MintToTreasuryCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get index(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class MintToTreasuryCall__Outputs {
  _call: MintToTreasuryCall;

  constructor(call: MintToTreasuryCall) {
    this._call = call;
  }
}

export class PermitCall extends ethereum.Call {
  get inputs(): PermitCall__Inputs {
    return new PermitCall__Inputs(this);
  }

  get outputs(): PermitCall__Outputs {
    return new PermitCall__Outputs(this);
  }
}

export class PermitCall__Inputs {
  _call: PermitCall;

  constructor(call: PermitCall) {
    this._call = call;
  }

  get owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get spender(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get value(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get v(): i32 {
    return this._call.inputValues[4].value.toI32();
  }

  get r(): Bytes {
    return this._call.inputValues[5].value.toBytes();
  }

  get s(): Bytes {
    return this._call.inputValues[6].value.toBytes();
  }
}

export class PermitCall__Outputs {
  _call: PermitCall;

  constructor(call: PermitCall) {
    this._call = call;
  }
}

export class RescueTokensCall extends ethereum.Call {
  get inputs(): RescueTokensCall__Inputs {
    return new RescueTokensCall__Inputs(this);
  }

  get outputs(): RescueTokensCall__Outputs {
    return new RescueTokensCall__Outputs(this);
  }
}

export class RescueTokensCall__Inputs {
  _call: RescueTokensCall;

  constructor(call: RescueTokensCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class RescueTokensCall__Outputs {
  _call: RescueTokensCall;

  constructor(call: RescueTokensCall) {
    this._call = call;
  }
}

export class SetIncentivesControllerCall extends ethereum.Call {
  get inputs(): SetIncentivesControllerCall__Inputs {
    return new SetIncentivesControllerCall__Inputs(this);
  }

  get outputs(): SetIncentivesControllerCall__Outputs {
    return new SetIncentivesControllerCall__Outputs(this);
  }
}

export class SetIncentivesControllerCall__Inputs {
  _call: SetIncentivesControllerCall;

  constructor(call: SetIncentivesControllerCall) {
    this._call = call;
  }

  get controller(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetIncentivesControllerCall__Outputs {
  _call: SetIncentivesControllerCall;

  constructor(call: SetIncentivesControllerCall) {
    this._call = call;
  }
}

export class TransferCall extends ethereum.Call {
  get inputs(): TransferCall__Inputs {
    return new TransferCall__Inputs(this);
  }

  get outputs(): TransferCall__Outputs {
    return new TransferCall__Outputs(this);
  }
}

export class TransferCall__Inputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TransferCall__Outputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get sender(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get recipient(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferOnLiquidationCall extends ethereum.Call {
  get inputs(): TransferOnLiquidationCall__Inputs {
    return new TransferOnLiquidationCall__Inputs(this);
  }

  get outputs(): TransferOnLiquidationCall__Outputs {
    return new TransferOnLiquidationCall__Outputs(this);
  }
}

export class TransferOnLiquidationCall__Inputs {
  _call: TransferOnLiquidationCall;

  constructor(call: TransferOnLiquidationCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get value(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferOnLiquidationCall__Outputs {
  _call: TransferOnLiquidationCall;

  constructor(call: TransferOnLiquidationCall) {
    this._call = call;
  }
}

export class TransferUnderlyingToCall extends ethereum.Call {
  get inputs(): TransferUnderlyingToCall__Inputs {
    return new TransferUnderlyingToCall__Inputs(this);
  }

  get outputs(): TransferUnderlyingToCall__Outputs {
    return new TransferUnderlyingToCall__Outputs(this);
  }
}

export class TransferUnderlyingToCall__Inputs {
  _call: TransferUnderlyingToCall;

  constructor(call: TransferUnderlyingToCall) {
    this._call = call;
  }

  get target(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TransferUnderlyingToCall__Outputs {
  _call: TransferUnderlyingToCall;

  constructor(call: TransferUnderlyingToCall) {
    this._call = call;
  }
}
