const day = []
const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const year = []
const yearPassport = []

for (let i = 1; i <= 31; i++) day.push(i)
for (let i = 2014; i >= 1911; i--) year.push(i)
for (let i = 2021; i >= 1951; i--) yearPassport.push(i)

export { day, month, year, yearPassport }
