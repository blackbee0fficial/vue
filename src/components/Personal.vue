<template>
   <div class="form__wrapper">
      <div class="form__body">
         <!-- 

            Имя

         -->
         <div
            class="form__row"
            :class="{ 'is-invalid': $v.firstName.$error, 'is-success': !$v.firstName.$error && $v.firstName.$dirty }"
         >
            <div class="flex-adaptability">
               <div class="form__label">Имя: *</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" v-model.trim="$v.firstName.$model" placeholder="Иван" />
                  <div v-if="$v.firstName.$dirty && !$v.firstName.required" class="form__invalid">Пожалуйста, укажите имя</div>
                  <div v-else-if="$v.firstName.$dirty && !$v.firstName.minLength" class="form__invalid">Минимальное значения 3</div>
               </div>
            </div>
         </div>

         <!-- 

            Фамилия

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.lastName.$error, 'is-success': !$v.lastName.$error && $v.lastName.$dirty }">
            <div class="flex-adaptability">
               <div class="form__label">Фамилия: *</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" v-model.trim="$v.lastName.$model" placeholder="Иванов" />
                  <div v-if="$v.lastName.$dirty && !$v.lastName.required" class="form__invalid">Пожалуйста, укажите фамилию</div>
                  <div v-else-if="$v.lastName.$dirty && !$v.lastName.minLength" class="form__invalid">Минимальное значения 5</div>
               </div>
            </div>
         </div>

         <!-- 

            Отчество

         -->
         <div
            class="form__row"
            :class="{ 'is-invalid': $v.middleName.$error, 'is-success': !$v.middleName.$error && $v.middleName.$dirty }"
         >
            <div class="flex-adaptability">
               <div class="form__label">Отчество:</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" v-model.trim="$v.middleName.$model" placeholder="Иванович" />
                  <div v-if="$v.middleName.$dirty && !$v.middleName.minLength" class="form__invalid">Минимальное значения 6</div>
               </div>
            </div>
         </div>

         <!-- 

            Номер телефона

         -->
         <div
            class="form__row"
            :class="{
               'is-invalid': $v.phoneNumber.$error,
               'is-success': !$v.phoneNumber.$error && $v.phoneNumber.$dirty,
            }"
         >
            <div class="flex-adaptability">
               <div class="form__label">Номер телефона: *</div>
               <div class="form__wrapper-input">
                  <input class="form__input" type="text" ref="phone" @keydown="justNumberPhone" placeholder="+7 (000) 000 00 00" />
                  <div v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.required" class="form__invalid">
                     Пожалуйста, укажите номер телефона
                  </div>
                  <div v-else-if="$v.phoneNumber.$dirty && !$v.phoneNumber.minLength" class="form__invalid">
                     Минимальное значения 11
                  </div>
               </div>
            </div>
         </div>

         <!-- 

            Дата рождения

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.dateDay.$error || $v.dateMonth.$error || $v.dateYear.$error }">
            <div class="flex-adaptability">
               <div class="form__label">Дата рождения: *</div>
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
                        :select="year"
                        @selected="$v.dateYear.$model = $event"
                     />
                  </div>
                  <div class="form__invalid" v-if="errorDate !== undefined">{{ errorDate }}</div>
               </div>
            </div>
         </div>

         <!-- 

            Ваш пол

         -->
         <div class="form__row" :class="$v.youGender.$error ? 'is-invalid' : ''">
            <div class="flex-adaptability">
               <div class="form__label">Ваш пол: *</div>
               <div class="form__wrapper-input">
                  <div class="flex">
                     <label class="form__radio-label">
                        <input class="form__radio" type="radio" name="gender" value="male" v-model="youGender" />
                        <div class="form__sex form__sex--male">Мужской</div>
                     </label>
                     <label class="form__radio-label">
                        <input class="form__radio" type="radio" name="gender" value="female" v-model="youGender" />
                        <div class="form__sex form__sex--female">Женский</div>
                     </label>
                  </div>
                  <div v-if="$v.youGender.$dirty && !$v.youGender.required" class="form__invalid">Пожалуйста, укажите пол</div>
               </div>
            </div>
         </div>

         <!-- 

            Группа клиентов

         -->
         <div class="form__row" :class="{ 'is-invalid': $v.clientGroup.$error }">
            <div class="flex-adaptability">
               <div class="form__label">Группа клиентов: *</div>
               <div class="form__wrapper-input">
                  <MultiSelectComponent
                     :class="{
                        'is-invalid-select active': $v.clientGroup.$error,
                        'is-success active': !$v.clientGroup.$error && $v.clientGroup.$dirty,
                     }"
                     :title="'Не выбрано'"
                     :select="['VIP', 'Проблемные', 'ОМС']"
                     @selected="$v.clientGroup.$model = $event"
                  />
                  <div v-if="$v.clientGroup.$dirty && !$v.clientGroup.required" class="form__invalid">
                     Пожалуйста, укажите группу клиентов
                  </div>
               </div>
            </div>
         </div>

         <!-- 

            Лечащий врач 

         -->
         <div class="form__row">
            <div class="flex-adaptability">
               <div class="form__label">Лечащий врач:</div>
               <div class="form__wrapper-input">
                  <SelectComponent
                     :class="{ 'is-success': !$v.attendingDoctor.$error && $v.attendingDoctor.$dirty }"
                     :title="'Не выбрано'"
                     :select="['Иванов', 'Захаров', 'Чернышева']"
                     @selected="$v.attendingDoctor.$model = $event"
                  />

                  <!-- 

                     Не отправлять SMS 

                  -->
                  <div class="form__checkbox">
                     <label>
                        <input class="switch" type="checkbox" v-model="notSend" />
                        <span class="form__checkbox-label">Не отправлять SMS</span>
                     </label>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div class="flex-center">
         <button class="button button--form" type="button" @click="onSubmit" :disabled="$v.$invalid">
            Продолжить
         </button>
      </div>
   </div>
</template>

<script>
   import { validationMixin } from 'vuelidate'
   import { required, minLength, numeric } from 'vuelidate/lib/validators'

   import SelectComponent from '@/components/elements/Select.vue'
   import MultiSelectComponent from '@/components/elements/MultiSelect.vue'

   import { day, month, year } from '@/array.js'

   export default {
      name: 'Personal',
      mixins: [validationMixin],
      components: {
         SelectComponent,
         MultiSelectComponent,
      },
      data() {
         return {
            day,
            year,
            month,

            firstName: '',
            lastName: '',
            middleName: '',
            phoneNumberProcces: '',
            phoneNumber: '',
            dateDay: '',
            dateMonth: '',
            dateYear: '',
            youGender: '',
            clientGroup: [],
            attendingDoctor: '',
            notSend: false,
         }
      },
      validations: {
         firstName: { required, minLength: minLength(3) },
         lastName: { required, minLength: minLength(5) },
         middleName: { minLength: minLength(6) },
         phoneNumber: { required, numeric, minLength: minLength(11) },
         dateDay: { required },
         dateMonth: { required },
         dateYear: { required },
         youGender: { required },
         clientGroup: { required },
         attendingDoctor: {},
         notSend: {},
      },
      watch: {
         firstName(val) {
            this.firstName = this.letterCapital(val)
         },
         lastName(val) {
            this.lastName = this.letterCapital(val)
         },
         middleName(val) {
            this.middleName = this.letterCapital(val)
         },
         '$v.$invalid'() {
            this.$emit('handlerWatch', {
               from: 'personal',
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
               return 'Пожалуйста, укажите день Вашего рождения'
            } else if (
               this.$v.dateDay.$dirty &&
               this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               !this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите месяц Вашего рождения'
            } else if (
               this.$v.dateDay.$dirty &&
               this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               !this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите год Вашего рождения'
            } else if (
               this.$v.dateDay.$dirty &&
               !this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               !this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите день и месяц Вашего рождения'
            } else if (
               this.$v.dateDay.$dirty &&
               !this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               !this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               !this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите день, месяц и год Вашего рождения'
            } else if (
               this.$v.dateDay.$dirty &&
               !this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               !this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите день и год Вашего рождения'
            } else if (
               this.$v.dateDay.$dirty &&
               this.$v.dateDay.required &&
               this.$v.dateMonth.$dirty &&
               !this.$v.dateMonth.required &&
               this.$v.dateYear.$dirty &&
               !this.$v.dateYear.required
            ) {
               return 'Пожалуйста, укажите месяц и год Вашего рождения'
            }
         },
      },
      methods: {
         onSubmit() {
            this.$v.$touch()
            this.$emit('handlerButton', {
               from: 'personal',
               status: !this.$v.$error,
            })
         },
         letterCapital(val) {
            val = val.replace(/[^a-zА-я\s]+/gi, '')
            return val.charAt(0).toUpperCase() + val.slice(1)
         },
         justNumberPhone() {
            console.log(event.currentTarget.value)
         },
         justNumberPhone() {
            event.preventDefault()
            if (event.key === 'Backspace') {
               this.phoneNumber = this.phoneNumber.slice(0, -1)
            }
            if ('1234567890'.includes(event.key)) {
               if (this.phoneNumber.length <= 10) this.$v.phoneNumber.$model += event.key
            }
            this.$refs.phone.value = this.$options.filters.maskPhone(this.phoneNumber)
         },
      },
      created() {
         console.log(this.errorDate)
      },
   }
</script>
