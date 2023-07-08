function getId(str){
    console.log(str)
    if(isNaN(str)){
        str = str.replace('<','');
        str = str.replace('>','');
        str= str.replace('@', '');

        str= str.replace('&', '');
    }
    return str
}

module.exports = {
    getId: getId
}