<template>
   <div class="window">
      <div class="window__content justify-content-center">
         <div class="window__wrapper">
            <div class="popup flex-center">
               <div class="popup__wrapper">
                  <div class="popup__animation">
                     <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle cx="26" cy="26" r="25" fill="none" />
                        <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                     </svg>
                  </div>
                  <div class="popup__text" v-if="!success">Минуточку, пожалуйста ...</div>
                  <div class="popup__text" v-else>Успешная регистрация</div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      name: 'Window',
      data() {
         return {
            success: false,
         }
      },
      created() {
         setTimeout(() => {
            this.success = true
            setTimeout(() => {
               this.$emit('closed', false)
            }, 2300)
         }, 1800)
      },
      mounted() {},
   }
</script>
