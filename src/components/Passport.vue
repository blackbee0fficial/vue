<template>
   <div class="form__wrapper">
      <div class="form__body">
         <!-- 

            Тип документа

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.document.$error, 'is-success': !$v.document.$error && $v.document.$dirty }">
            <div class="flex-adaptability">
               <div class="form__label">Тип документа: *</div>
               <div class="form__wrapper-input">
                  <SelectComponent
                     :class="{
                        'is-invalid-select': $v.document.$error,
                        'is-success': !$v.document.$error && $v.document.$dirty,
                     }"
                     :title="'Тип документа'"
                     :select="['Паспорт', 'Свидетельство о рождении', 'Водительское удостоверение']"
                     @selected="$v.document.$model = $event"
                  />
                  <div v-if="$v.document.$dirty && !$v.document.required" class="form__invalid">Пожалуйста, укажите тип документа</div>
               </div>
            </div>
         </div>

         <!-- 

            Серия

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.series.$error, 'is-success': !$v.series.$error && $v.series.$dirty }">
            <div class="flex-adaptability">
               <div class="form__label">Серия:</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" ref="series" @keydown="justNumberSeries" placeholder="00 00" />
                  <div v-if="$v.series.$dirty && !$v.series.minLength" class="form__invalid">Минимальное значения 4</div>
               </div>
            </div>
         </div>

         <!-- 

            Номер

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.room.$error, 'is-success': !$v.room.$error && $v.room.$dirty }">
            <div class="flex-adaptability">
               <div class="form__label">Номер:</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" ref="room" @keydown="justNumberRoom" placeholder="000 000" />
                  <div v-if="$v.room.$dirty && !$v.room.minLength" class="form__invalid">Минимальное значения 6</div>
               </div>
            </div>
         </div>

         <!-- 

            Кем выдан

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.issued.$error, 'is-success': !$v.issued.$error && $v.issued.$dirty }">
            <div class="flex-adaptability">
               <div class="form__label">Кем выдан:</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" v-model.trim="$v.issued.$model" placeholder="ОТДЕЛОМ УФМС" />
               </div>
            </div>
         </div>

         <!-- 

            Дата выдачи

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.dateDay.$error || $v.dateMonth.$error || $v.dateYear.$error }">
            <div class="flex-adaptability">
               <div class="form__label">Дата выдачи: *</div>
               <div class="form__wrapper-input">
                  <div class="justify-content-spacebetween">
                     <SelectComponent
                        class="select--day"
                        :class="{
                           'is-invalid-select': $v.dateDay.$error,
                           'is-success': !$v.dateDay.$error && $v.dateDay.$dirty,
                        }"
                        :title="'День'"
                        :select="day"
                        @selected="$v.dateDay.$model = $event"
                     />
                     <SelectComponent
                        class="select--month"
                        :class="{
                           'is-invalid-select': $v.dateMonth.$error,
                           'is-success': !$v.dateMonth.$error && $v.dateMonth.$dirty,
                        }"
                        :title="'Месяц'"
                        :select="month"
                        @selected="$v.dateMonth.$model = $event"
                     />
                     <SelectComponent
                        class="select--year"
                        :class="{
                           'is-invalid-select': $v.dateYear.$error,
                           'is-success': !$v.dateYear.$error && $v.dateYear.$dirty,
                        }"
                        :title="'Год'"
                        :select="yearPassport"
                        @selected="$v.dateYear.$model = $event"
                     />
                  </div>
                  <div class="form__invalid" v-if="errorDate !== undefined">{{ errorDate }}</div>
               </div>
            </div>
         </div>
      </div>

      <div class="flex-center">
         <button class="button button--form" type="button" @click="onSubmit" :disabled="$v.$invalid">
            Завершить регистрацию
         </button>
      </div>
   </div>
</template>

<script>
   import { validationMixin } from 'vuelidate'
   import { required, minLength, numeric, between } from 'vuelidate/lib/validators'

   import SelectComponent from '@/components/elements/Select.vue'

   import { day, month, yearPassport } from '@/array.js'

   export default {
      name: 'Passport',
      mixins: [validationMixin],
      components: {
         SelectComponent,
      },
      data() {
         return {
            day,
            month,
            yearPassport,

            document: '',
            series: '',
            room: '',
            issued: '',

            dateDay: '',
            dateMonth: '',
            dateYear: '',
         }
      },
      validations: {
         document: { required },
         series: { minLength: minLength(4), numeric },
         room: { minLength: minLength(6), numeric },
         issued: {},

         dateDay: { required },
         dateMonth: { required },
         dateYear: { required },
      },
      watch: {
         '$v.$invalid'() {
            this.$emit('handlerWatch', {
               from: 'passport',
               status: !this.$v.$error,
            })
         },
      },
      computed: {
         errorDate() {
            if (
               this.$v.dateDay.$dirty &&
               !this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите день выдачи'
            } else if (
               this.$v.dateDay.$dirty &&
               this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               !this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите месяц выдачи'
            } else if (
               this.$v.dateDay.$dirty &&
               this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               !this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите год выдачи'
            } else if (
               this.$v.dateDay.$dirty &&
               !this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               !this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите день и месяц выдачи'
            } else if (
               this.$v.dateDay.$dirty &&
               !this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               !this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               !this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите день, месяц и год выдачи'
            } else if (
               this.$v.dateDay.$dirty &&
               !this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               !this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите день и год выдачи'
            } else if (
               this.$v.dateDay.$dirty &&
               this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               !this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               !this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите месяц и год выдачи'
            }
         },
      },
      methods: {
         onSubmit() {
            this.$v.$touch()
            this.$emit('handlerButton', {
               from: 'passport',
               status: !this.$v.$error,
            })
         },
         justNumberSeries() {
            event.preventDefault()
            if (event.key === 'Backspace') {
               this.series = this.series.slice(0, -1)
            }
            if ('1234567890'.includes(event.key)) {
               if (this.series.length <= 3) this.$v.series.$model += event.key
            }
            this.$refs.series.value = this.$options.filters.maskSeries(this.series)
         },
         justNumberRoom() {
            event.preventDefault()
            if (event.key === 'Backspace') {
               this.room = this.room.slice(0, -1)
            }
            if ('1234567890'.includes(event.key)) {
               if (this.room.length <= 5) this.$v.room.$model += event.key
            }
            this.$refs.room.value = this.$options.filters.maskRoom(this.room)
         },
      },
   }
</script>
