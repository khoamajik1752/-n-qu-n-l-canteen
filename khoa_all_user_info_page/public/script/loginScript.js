$("#admin-login-btn").click(()=>{
    // preparedData=$('#admin-login-form').serialize();
    // console.log(preparedData)
    // finalData=preparedData["role"]='admin';
    var ajax1 = $.ajax({
        type: 'post',
        url: `/sign-in`,
        data: $('#admin-login-form').serialize()+'&role=admin',
        success: function (data) {
            window.alert(data);
            setTimeout(function(){
                window.location.href='/';
            }, 2000)
           
        }
    })
})

$("#user-login-btn").click(()=>{

    // preparedData=$('#user-login-form').serialize();
    // // console.log(preparedData)
    // finalData=preparedData+'&role=user';
    // console.log(finalData)
    var ajax1 = $.ajax({
        type: 'post',
        url: `/sign-in`,
        data: $('#user-login-form').serialize()+'&role=user',
        success: function (data) {
            window.alert(data);
            setTimeout(function(){
                window.location.href='/';
            }, 2000)
           
        }
    })
})