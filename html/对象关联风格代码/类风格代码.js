//

// 父类
function Controller() {
    this.errors = [];
}

Controller.prototype.showDialog(title, msg) {
    // 给用户显示标题和信息
};

Controller.prototype.success = function(msg) {
    this.showDialog('Success', msg)
};

Controller.prototype.failure = function(err) {
    this.errors.push(err);
    this.showDialog('Error', err)
};


// 子类
function LoginController() {
    Controller.call(this);
}

//把子类关联到父类
// Object.create(……) 会凭空创建一个"新"对象，并把新对象内部的[[Prototype]]关联到你指定的对象
LoginController.prototype = Object.create(Controller.prototype);

LoginController.prototype.getUser = function() {
    return document.getElementById('login_username').value;
};

LoginController.prototype.getPassword = function() {
    return document.getElementById('login_password').value;
};

LoginController.prototype.validateEntry = function(user, pw) {
    user = user || this.getUser();
    pw = pw || this.getPassword();

    if (!(user && pw)) {
        return this.failure(
            'please entry a username & password'
        )
    } else if (user.length < 5) {
        return this.failure(
            'password must be 5+ characters'
        )
    }

    // 如果执行到这里说明通过验证
    return true
};

// 重写基础的failure()
LoginController.prototype.failure = function() {
    // "super" 调用
    Controller.prototype.failure.call(this, 'Login invalid:' + err)
};



//子类
function AuthController() {
    Controller.call(this);
}

//把子类关联到父类
AuthController.prototype = Object.create(Controller.prototype);

AuthController.prototype.server = function(url, data) {
    return $.ajax({
        url: url,
        data: data
    });
};

AuthController.prototype.checkAuth = function() {
    var user = this.getUser();
    var pw = this.getPassword();

    if (this.login.validateEntry(user, pw)) {
        this.serve('/check-antu', {
                user: user,
                pw: pw
            })
            .then(this.success.bind(this))
            .fail(this.failure.bind(this))
    }
};

// 重写基础的success()
AuthController.prototype.success = function(url, data) {
    // "super"调用
    Controller.prototype.success.call(this, 'Authenticated')
};

// 重写基础的failure()
AuthController.prototype.failure = function(url, data) {
    // "super"调用
    Controller.prototype.failure.call(this, 'Auth Failed :' + err)
};




var auth = new AuthController();
auth.checkAuth(
    // 除了继承，我们还需要合成
    new LoginController()
)

/**
 * -- 《你不知道的js上》-180页
 */
