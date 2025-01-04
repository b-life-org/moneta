export type Currency = {
  /**
   * The unique code of the currency.
   */
  readonly code: string;
  /**
   * The base, or radix of the currency.
   * radix is rare see for example Pre-decimal Great Britain pound sterling
   */
  readonly base: number | readonly number[];
  /**
   * The exponent of the currency.
   */
  readonly exponent: number;
};

export type DivideOperation = (
  amount: bigint,
  factor: number,
) => bigint;

export type ScaledAmount = {
  readonly amount: bigint;
  readonly scale?: number;
};

export type Rate = ScaledAmount | number;

export type Rates = Record<string, Rate>;

export type Formatter = {
  readonly toNumber: (value?: bigint) => number;
  readonly toString: (value?: bigint) => string;
};

export type TransformerOptions<TValue> = {
  readonly value: TValue;
  readonly currency: Currency;
};

export type Transformer<TOutput, TValue> = (
  options: TransformerOptions<TValue>,
) => TOutput;
