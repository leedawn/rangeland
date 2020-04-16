// var curDate = new Date();
// var preDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
// var nextDate = new Date(curDate.getTime() + 24*60*60*1000); //后一天
// preDate=preDate.toLocaleDateString()
// nextDate=nextDate.toLocaleDateString()
// console.log(preDate,nextDate)


// var date=new Date();
// date.setDate(date.getDate()-3)
// date.setMonth(date.getMonth()+1)
// endDate=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
// console.log(endDate)
// date.setDate(date.getDate()-4)
// startDate=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
// console.log(startDate)

var trello = require("./trello_operation");
// console.log(trello.myFunction())
console.log(trello)
for(var data in trello){
    console.log(data.label,data.id)
}

