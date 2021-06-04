export default {
   props: ['title', 'select'],
   methods: {
      selectShow() {
         let _this = event.currentTarget
         let top = _this.getBoundingClientRect().top
         let menu = _this.nextSibling.getBoundingClientRect().height

         if (!_this.parentElement.classList.contains('active')) {
            let select = document.querySelectorAll('.select.active')
            for (let item of select) item.classList.remove('active')
         }

         if (top <= menu) {
            _this.parentElement.classList.remove('select-top')
            _this.parentElement.classList.add('select-bottom')
         } else {
            _this.parentElement.classList.remove('select-bottom')
            _this.parentElement.classList.add('select-top')
         }

         _this.parentElement.classList.toggle('active')
      },
   },
}
