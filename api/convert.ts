 /*function convertFn(
    ...[dineroObject, newCurrency, rates]: ConvertParams<TAmount>
  ) {
    const rate = rates[newCurrency.code];
    const { amount, scale } = dineroObject.toJSON();
    const { amount: rateAmount, scale: rateScale } = getAmountAndScale(
      rate,
      zero
    );

    const newScale = calculator.add(scale, rateScale);

    return convertScaleFn(
      dineroObject.create({
        amount: calculator.multiply(amount, rateAmount),
        currency: newCurrency,
        scale: newScale,
      }),
      maximumFn([newScale, newCurrency.exponent])
    );
  };
*/