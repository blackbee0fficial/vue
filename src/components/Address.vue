<template>
   <div class="form__wrapper">
      <div class="form__body">
         <!-- 

            Страна

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.country.$error, 'is-success': !$v.country.$error && $v.country.$dirty }">
            <div class="flex-adaptability">
               <div class="form__label">Страна:</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" v-model.trim="$v.country.$model" placeholder="Россия" />
               </div>
            </div>
         </div>

         <!-- 

            Область

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.region.$error, 'is-success': !$v.region.$error && $v.region.$dirty }">
            <div class="flex-adaptability">
               <div class="form__label">Область:</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" v-model.trim="$v.region.$model" placeholder="Московская область" />
               </div>
            </div>
         </div>

         <!-- 

            Город

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.city.$error, 'is-success': !$v.city.$error && $v.city.$dirty }">
            <div class="flex-adaptability">
               <div class="form__label">Город: *</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" v-model.trim="$v.city.$model" placeholder="Москва" />
                  <div class="form__invalid" v-if="$v.city.$dirty && !$v.city.required">Пожалуйста, укажите город</div>
               </div>
            </div>
         </div>

         <!-- 

            Индекс

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.index.$error, 'is-success': !$v.index.$error && $v.index.$dirty }">
            <div class="flex-adaptability">
               <div class="form__label">Индекс:</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" v-model.trim="index" placeholder="123317" />
                  <div class="form__invalid" v-if="$v.index.$dirty && !$v.index.minLength">Минимальное значения 6</div>
               </div>
            </div>
         </div>

         <!-- 

            Улица

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.street.$error, 'is-success': !$v.street.$error && $v.street.$dirty }">
            <div class="flex-adaptability">
               <div class="form__label">Улица:</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" v-model.trim="$v.street.$model" placeholder="Пресненская набережная" />
               </div>
            </div>
         </div>

         <!-- 

            Дом

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.house.$error, 'is-success': !$v.house.$error && $v.house.$dirty }">
            <div class="flex-adaptability">
               <div class="form__label">Дом:</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" v-model.trim="$v.house.$model" placeholder="10" />
               </div>
            </div>
         </div>
      </div>

      <div class="flex-center">
         <button class="button button--form" type="button" @click="onSubmit" :disabled="$v.$invalid">Продолжить</button>
      </div>
   </div>
</template>

<script>
   import { validationMixin } from 'vuelidate'
   import { required, minLength, numeric } from 'vuelidate/lib/validators'

   export default {
      name: 'Address',
      mixins: [validationMixin],
      data() {
         return {
            country: '',
            region: '',
            city: '',
            index: '',
            street: '',
            house: '',
         }
      },
      validations: {
         country: {},
         region: {},
         city: { required },
         index: { minLength: minLength(6) },
         street: {},
         house: {},
      },
      watch: {
         country(val) {
            this.country = this.letterCapital(val)
         },
         region(val) {
            this.region = this.letterCapital(val)
         },
         city(val) {
            this.city = this.letterCapital(val)
         },
         index(val) {
            let number = val.replace(/[^\d.]/g, '').slice(0, 6)
            this.index = number
            if (number === '') return
            this.$v.index.$model = number
         },
         '$v.$invalid'() {
            this.$emit('handlerWatch', {
               from: 'address',
               status: !this.$v.$error,
            })
         },
      },
      methods: {
         onSubmit() {
            this.$v.$touch()
            this.$emit('handlerButton', {
               from: 'address',
               status: !this.$v.$error,
            })
         },
         letterCapital(val) {
            let string = val.replace(/[^a-zА-я\s]+/gi, '')
            return string.charAt(0).toUpperCase() + string.slice(1)
         },
      },
   }
</script>
