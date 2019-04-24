
class DairyMilkProductionValidator {
  constructor() {
    this.errors = {}
  }
  thereIsAnError(errors, message) {
    errors.message = message
    return errors.message
  }
  thereIsNoError(errors) {
    errors.message = ''
    return errors.message
  }
  emptyInputCheck(value) {
    if (value === '') {
      return this.thereIsAnError(this.errors, 'Quantity of milk is required')
    }
    this.thereIsNoError(this.errors)
  }
  negativeValueCheck(value) {
    const negativeValue = value < 0

    if (negativeValue) {
      return this.thereIsAnError(this.errors, 'Quantity cannot be negative')
    }
    this.thereIsNoError(this.errors)
  }
  zeroValueCheck(value) {
    const zeroValue = value === 0
    if (zeroValue) {
      return this.thereIsAnError(this.errors, 'Quantity cannot be zero')
    }
    this.thereIsNoError(this.errors)
  }
  moreThanMaximumQuantityCheck(value) {
    const maximumMilkQuantity = 50
    if (value && value > maximumMilkQuantity) {
      return this.thereIsAnError(
        this.errors,
        `Quantity cannot be greater than ${maximumMilkQuantity} litres`
      )
    }
    this.thereIsNoError(this.errors)
  }
}

export const dairyMilkProductionValidator = new DairyMilkProductionValidator()
