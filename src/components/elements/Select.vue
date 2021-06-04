<template>
   <div class="select">
      <div class="select-row" @mousedown.stop="selectShow">
         <div v-if="selected === false" class="select-title select-title-no">{{ title }}</div>
         <div v-else class="select-title">{{ select[selected] }}</div>
         <div class="select-icon"></div>
      </div>
      <div class="select-wrapper">
         <div v-if="selected !== false" class="select-title select-title--body" @mousedown.stop="selectPush(false)">
            {{ title }}
         </div>
         <ul class="select-body">
            <li
               v-for="(item, index) in select"
               :key="index"
               class="select-item"
               :class="{ 'select-item--selected': index === selected }"
               @mousedown.stop="selectPush(index, item)"
            >
               {{ item }}
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
   import select from '@/mixins/select.js'

   export default {
      name: 'Select',
      data() {
         return {
            selected: false,
         }
      },
      mixins: [select],
      methods: {
         selectPush(index, item) {
            let _this = event.currentTarget
            _this.closest('.select').classList.remove('active')

            this.selected = index
            if (index === false) {
               this.$emit('selected', '')
            } else {
               this.$emit('selected', item)
            }
         },
      },
   }
</script>
