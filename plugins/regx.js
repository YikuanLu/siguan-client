import Vue from 'vue'

Vue.prototype.regx = {
  phone: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
  // password: /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6,20}$/,
  // password: /^[a-zA-Z0-9]{6,20}$/,
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  number: /^[0-9]*$/
}
