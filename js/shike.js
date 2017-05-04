var shike = {

    /**
     * [功能：检测所有必填项是否为空]
     * 
     * @param   {String}       [selector]   [填写需要验证的选择器]
     * @param   {String}       [type]       [什么事件判断]
     * @param   {function}     [success]    [验证成功后执行函数]
     * @param   {function}     [fail]       [验证失败后执行函数]
     */
    checkRequired: function(selector, type, success, fail) {

        var text = document.querySelectorAll(selector);
        var len = text.length;

        for (var i = 0; i < len; i++) {

            text[i].addEventListener(type, function() {
                var flag = 0;

                for (var j = 0; j < len; j++) {
                    // 【需完善】，正则
                    if (text[j].value != '')
                        flag++;
                }
                flag == len ? success() : fail();

            }, false)
        }

    },
    /**
     * [changeSelected description]
     * @param  {[JQ对象]}   _param    [需要切换的JQ对象，如给ul下所有li，则传入li]
     * @param  {[String]}   type      [什么事件下切换]
     */
    changeSelected: function(_param, type, fn) {
        // 判断fn是否存在
        var flag = 0;
        flag = fn ? 1 : 0;

        $.each(_param, function(i, n) {
            $(n).on(type, _param.parent(), function() {
                for (var i = 0; i < _param.length; i++) {
                    $(_param[i]).removeClass('selected');
                }
                $(this).addClass('selected');
                flag == 1 ? fn():null;
            });
        });
    }

}
