<template>
   <div class="app light">
      <main class="main justify-content-center">
         <form class="form">
            <h1 class="form__title">Создать учётную запись</h1>
            <p class="form__subtitle">* - Обязательные поля</p>

            <div class="form__header flex">
               <div
                  class="form__header-item"
                  :class="{
                     'form__header--current': component === 'PersonalComponent',
                  }"
                  @click="showComp('PersonalComponent')"
               >
                  Личные данные
               </div>

               <div
                  class="form__header-item"
                  :class="{
                     'form__header--current': component === 'AddressComponent',
                     'form__header--disabled': personal === false,
                  }"
                  @click="showComp('AddressComponent')"
               >
                  Адрес
               </div>

               <div
                  class="form__header-item"
                  :class="{
                     'form__header--current': component === 'PassportComponent',
                     'form__header--disabled': personal === false || address === false,
                  }"
                  @click="showComp('PassportComponent')"
               >
                  Паспорт
               </div>
            </div>

            <keep-alive>
               <component :is="component" @handlerWatch="handlerWatch" @handlerButton="handlerButton"></component>
            </keep-alive>
         </form>
      </main>

      <WindowComponent v-if="success" @closed="success = $event" />
   </div>
</template>

<script>
   import PersonalComponent from './components/Personal.vue'
   import AddressComponent from './components/Address.vue'
   import PassportComponent from './components/Passport.vue'
   import WindowComponent from './components/Window.vue'

   export default {
      name: 'App',
      components: {
         PersonalComponent,
         AddressComponent,
         PassportComponent,
         WindowComponent,
      },
      data() {
         return {
            component: 'PersonalComponent',
            personal: false,
            address: false,
            passport: false,
            success: false,
         }
      },
      methods: {
         showComp(comp) {
            switch (comp) {
               case 'PersonalComponent':
                  this.component = comp
                  break
               case 'AddressComponent':
                  if (this.personal === true) {
                     this.component = comp
                  }
                  break
               case 'PassportComponent':
                  if (this.personal === true && this.address === true) {
                     this.component = comp
                  }
                  break
            }
         },
         handlerWatch(date) {
            if (date.from === 'personal') {
               this.personal = date.status
            }
            if (date.from === 'address') {
               this.address = date.status
            }
            if (date.from === 'passport') {
               this.passport = date.status
            }
         },
         handlerButton(date) {
            if (date.from === 'personal') {
               this.personal = date.status
               if (date.status === true) this.component = 'AddressComponent'
            }
            if (date.from === 'address') {
               this.address = date.status
               if (date.status === true) this.component = 'PassportComponent'
            }
            if (date.from === 'passport') {
               this.passport = date.status
               if (date.status === true) {
                  this.success = true
               }
            }
         },
      },
   }
</script>
