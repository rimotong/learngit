//转换前 按照arr中的顺序排序 
arr = ['b', 'a', 'd', 'c']
options = [{ a: '0.89', b: '45', c: '77', d: '67' }, { a: '546', b: '7', c: '8', d: '8' }, { a: '78', b: '7', c: '9', d: '6' }, { a: '0.5', b: 'gg', c: 'ert', d: 'wer' }, ]
let arr1 = []
options.forEach(item => {
    let obj = {}
    arr.forEach(val => { obj[val] = item[val] })
    arr1.push(obj)
});