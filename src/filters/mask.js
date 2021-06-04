import Vue from 'vue'

Vue.filter('maskPhone', val => {
   if (val.length == 0) {
      return ``
   }
   if (val.length == 1) {
      val = val.slice(0, 1)
      val = '7'
      return `+7 (`
   }
   if (val.length >= 2 && val.length <= 3) {
      let num = val.slice(1, 3)
      return `+7 (${num}`
   }
   if (val.length == 4) {
      let num = val.slice(1, 4)
      return `+7 (${num}) `
   }
   if (val.length >= 5 && val.length <= 6) {
      let num1 = val.slice(1, 4)
      let num2 = val.slice(4, 6)
      return `+7 (${num1}) ${num2}`
   }
   if (val.length == 7) {
      let num1 = val.slice(1, 4)
      let num2 = val.slice(4, 7)
      return `+7 (${num1}) ${num2} `
   }
   if (val.length == 8) {
      let num1 = val.slice(1, 4)
      let num2 = val.slice(4, 7)
      let num3 = val.slice(7, 8)
      return `+7 (${num1}) ${num2} ${num3}`
   }
   if (val.length == 9) {
      let num1 = val.slice(1, 4)
      let num2 = val.slice(4, 7)
      let num3 = val.slice(7, 9)
      return `+7 (${num1}) ${num2} ${num3} `
   }
   if (val.length >= 10 && val.length <= 11) {
      let num1 = val.slice(1, 4)
      let num2 = val.slice(4, 7)
      let num3 = val.slice(7, 9)
      let num4 = val.slice(9, 11)
      return `+7 (${num1}) ${num2} ${num3} ${num4}`
   }
})

Vue.filter('maskSeries', val => {
   if (val.length == 0) {
      return ``
   }
   if (val.length == 1) {
      return val
   }
   if (val.length == 2) {
      let num1 = val.slice(0, 2)
      return `${num1} `
   }
   if (val.length >= 3 && val.length <= 4) {
      let num1 = val.slice(0, 2)
      let num2 = val.slice(2, 4)
      return `${num1} ${num2}`
   }
})

Vue.filter('maskRoom', val => {
   if (val.length == 0) {
      return ``
   }
   if (val.length >= 1 && val.length <= 2) {
      return val
   }
   if (val.length == 3) {
      let num1 = val.slice(0, 3)
      return `${num1} `
   }
   if (val.length >= 4 && val.length <= 6) {
      let num1 = val.slice(0, 3)
      let num2 = val.slice(3, 6)
      return `${num1} ${num2}`
   }
})
