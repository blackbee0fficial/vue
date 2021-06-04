<template>
   <div class="select">
      <div class="select-row" @mousedown.stop="selectShow">
         <div v-if="selected.length === 0" class="select-title select-title-no">{{ title }}</div>
         <div v-else class="select-title">
            <span class="multi-selected" v-for="(item, index) in selected">
               {{ select[item] }}{{ selected.length - 1 === index ? '' : ', ' }}
            </span>
         </div>
         <div class="select-icon"></div>
      </div>
      <div class="select-wrapper">
         <div v-if="selected.length > 0" class="select-title select-title--body" @mousedown.stop="selectPush(false)">
            {{ title }}
         </div>
         <ul class="select-body">
            <li
               v-for="(item, index) in select"
               :key="index"
               class="select-item"
               :class="{ 'select-item--selected': selected.includes(index) }"
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
      name: 'MultiSelect',
      data() {
         return {
            selected: [],
         }
      },
      mixins: [select],
      methods: {
         selectPush(index, item) {
            if (index === false) {
               this.selected = []
            } else {
               if (!this.selected.includes(index)) {
                  this.selected.push(index)
               } else {
                  let i = this.selected.indexOf(index)
                  if (i >= 0) {
                     this.selected.splice(i, 1)
                  }
               }
            }

            this.$emit('selected', this.selected)
         },
      },
   }
</script>
