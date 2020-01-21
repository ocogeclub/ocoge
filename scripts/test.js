var count=10;
var id = setInterval(() => {
    console.log(count--);
    if (count<0) {
        console.log(' : 終了 - Node Test JS');
        clearInterval(id);
    }
}, 1000);