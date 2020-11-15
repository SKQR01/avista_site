const obj1 = {
    title:"asdasd",
    description:"asdasdads"
}

const obj2 = {
    title:"Новый заголовок",
    testField: "asddsadas"
}

const res = Object.assign(obj1, obj2)
console.log(res)