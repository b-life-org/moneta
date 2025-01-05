export type Currency = {
  /**
   * The unique code of the currency.
   */
  readonly code: string;
  /**
   * The base, or radix of the currency.
   * radix is rare see for example Pre-decimal Great Britain pound sterling
   * EUR : base : 10
   * Malagasy ariary MGA : base : 5
   * Pre-decimal Great Britain pound sterling : base: [20, 12]
   */
  readonly base: number | readonly number[];
  /**
   * The exponent of the currency.
   * exponent : 2 for 10,00 EUR
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
