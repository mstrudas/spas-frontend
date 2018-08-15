const methods = {
    required: v => !!v || 'Required',
    phoneNumber(v) {
      const rule = /\d{10}/
      return rule.test(v) || 'Must be a valid 10 digit phone number'
    }
}

export default {
  methods
}