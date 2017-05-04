/**
 * Created by 二更 on 2017/3/6.
 */
$(function(){
$('#testGetCode').bind("click",function(){
    settime(this);
});

    var countdown=60;
    function settime(obj){
        if(countdown==0){
            obj.removeAttribute('disabled');
            obj.value='获取验证码';
            countdown =60;
            return ;
        }else{
            obj.setAttribute('disabled',true);
            obj.value='重新发送('+countdown+'s)';
            countdown --;
        }
        setTimeout(function(){
            settime(obj)
        },1000);
    }

})

//手机验证码获取的倒计时

