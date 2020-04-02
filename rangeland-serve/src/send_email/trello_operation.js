var request = require("request");

var qaBoardID = "F9HliMM2"
var myKey = "111f8ebac88cf633c2c069daabfd2dc1"
var myToken = "ece5237d9aba3712899727193768f5a6712c289a218f2a01524ddda47ff727cc"

var options = {
    method: 'GET',
    url: 'https://api.trello.com/1/boards/' + qaBoardID + '/cards',
    qs: { key: myKey, token: myToken }
};

var date=new Date();
date.setDate(date.getDate()-1)
date.setMonth(date.getMonth()+1);
function addZero(str){
    if(str<10){
        return "0"+str
    }else{
        return str
    }
}
endDate=date.getFullYear()+"-"+addZero(date.getMonth())+"-"+addZero(date.getDate())
console.log(endDate)
date.setDate(date.getDate()-9)
startDate=date.getFullYear()+"-"+addZero(date.getMonth())+"-"+addZero(date.getDate())
console.log(startDate)

function myFunction(){
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        // console.log(body);
        allCards = JSON.parse(body)
        // console.log(typeof (allCards[0]))
        // console.log(allCards[0])
        var t=0
        let cardInfoList=[]
        for (var i = 0; i < allCards.length; i++) {
            if (allCards[i]["idMembers"] == "5c64deef2723716a568de136" && allCards[i]["idList"] == "5cc66abaa28c995ba47ab9f5") { // another list: 5cc66ab2d578c88e33d68c47  finish:5cc66abaa28c995ba47ab9f5 
                    if (allCards[i]["due"] < (endDate+"T16:00:00.000Z") && allCards[i]["due"] > (startDate+"T16:00:00.000Z")) {
                        let cardInfoObject={}
                        console.log(allCards[i]["labels"][0]["name"],allCards[i]["name"]);
                        cardInfoObject.label=allCards[i]["labels"][0]["name"]
                        cardInfoObject.name=allCards[i]["name"]
                        cardInfoObject.due=allCards[i]["due"]
                        t++;
                        console.log(t)
                        cardInfoObject.id=t
                        cardInfoList.push(cardInfoObject)
                    }
                }
        }
        console.log(cardInfoList)
        return cardInfoList
    });

}
myFunction()
