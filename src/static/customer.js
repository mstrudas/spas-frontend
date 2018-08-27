const blankCustomer = {
  id: '',
  firstName: '',
  lastName: '',
  spouse: '',
  address: '',
  address2: '',
  addressType: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  phone: [{
    number: '',
    type: ''
  }],
  primaryPhone: 0
}

const blankPool = {
  id: '',
  description: '',
  size: '',
  filter: '',
  pump: '',
  equip: '',
  generalNotes: [],
  useBillingAddress: false,
  address: {
    street: '',
    type: '',
    suite: '',
    city: '',
    state: '',
    zip: ''
  }
}

const blankSpa = {
  id: '',
  description: '',
  brand: '',
  model: '',
  year: '',
  purchaseDate: '',
  purchaseFrom: '',
  generalNotes: [],
  useBillingAddress: false,
  address: {
    street: '',
    type: '',
    suite: '',
    city: '',
    state: '',
    zip: ''
  }
}

const blankCard = {
  cardNumber: '',
  expiration: '',
  ccv: ''
}

export { blankCustomer, blankPool, blankSpa, blankCard }