var maxPrice = function (arr) {
    var avg=[]
    for (var i=0;i<arr.length;i++) {
        for(var j=i+1;j<arr.length;j++){
            avg.push(arr[j]-arr[i])
        }
    }
    console.log(Math.max(avg))
}
console.log(maxPrice)