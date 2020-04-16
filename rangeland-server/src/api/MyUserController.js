var userAccount=function(ctx){
    ctx.body={
        "message":"user account"
    }
}

var userPermission=function(ctx){
    ctx.body={
        "message":"user permission"
    }
}

module.exports = {userAccount,userPermission}