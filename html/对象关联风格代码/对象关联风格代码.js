
// 在行为委托模式中，AuthController 和 LoginController 只是对象，他们之间是兄弟关系，
// 并不是父类和子类的关系，代码中AuthController 委托了LoginController


var LoginController = {
    errors:[],
    getUser:function(){
        return document.getElementById('login_username').value;
    },
    getPassword:function(){
        return document.getElementById('login_password').value;
    },
    validateEntry:function(user,pw){
        user = user || this.getUser();
        pw = pw || this.getPassword();

        if(!(user && pw)){
            return this.failure(
                'please entry a username & password'
            )
        }else if(user.length <5){
            return this.failure(
                'password must be 5+ characters'
            )
        }

        // 如果执行到这里说明通过验证
        return true
    },
    showDialog:function(title,msg){
        // 给用户显示标题和信息
    },
    failure:function(err){
        this.errors.push(err);
        this.showDialog('Error','Login invalid:' + err)
    }
};


// 让AuthController 委托 LoginController
// Object.create(……) 会凭空创建一个"新"对象，并把新对象内部的[[Prototype]]关联到你指定的对象
// 本句话的意思是：创建一个新的AuthController对象，并把它关联到LoginController
var AuthController = Object.create(LoginController);


AuthController.errors = [];
AuthController.checkAuth = function(){
    var user = this.getUser();
    var pw = this.getPassword();

    if(this.validateEntry(user,pw)){
        this.serve('/check-antu',{
            user:user,
            pw:pw
        })
        .then(this.accepted.bind(this))
        .fail(this.rejected.bind(this))
    }
}

AuthController.server = function(url,data){
    return $.ajax({
        url:url,
        data:data
    });
};

AuthController.accepted = function(){
    this.showDialog('Success','Authenticated')
};

AuthController.rejected = function(err){
    this.failure('Auth Failed :'+ err)
}


