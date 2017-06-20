(function (w) {

    var $$ = function () {

        this.elements = [];
    }


    $$.prototype = {
        extend: function (tar, source) {
            for (var i in source) {
                tar[i] = source[i];
            }
            return tar;
        }

    }

    var $$ = new $$();


    /*选择模块*/
    $$.extend($$, {
        $id: function (id) {
            this.elements.push(document.getElementById(id));
            return this;
        }
    })

    /*内容框架*/
    $$.extend($$, {
        //innerHTML的函数版本
        html: function (value) {
            //var doms = $$.$all(context);
            var doms = this.elements;
            //设置
            if (value) {
                for (var i = 0, len = doms.length; i < len; i++) {
                    doms[i].innerHTML = value;
                }
            } else {
                return doms[0].innerHTML
            }
        }
    })

    w.$$ = $$;

})(window)


