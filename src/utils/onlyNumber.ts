const onlyNumber = (num: string) =>{
    num = num.replace(/\D/g, "")
    return num
} 

export default onlyNumber