(function($){
    ~(function(desW){
        let winW=document.documentElement.clientWidth;
        document.documentElement.style.fontSize=winW/desW*100+'px';
    })(375);

    $.ajax({
        url:IP+'/eDrMd_App/by/chapter/document/detail',
        type:'post',
        contentType:'application/json',
        data:JSON.stringify({
            'userId':userId,
            'token':token,
            'appVersion':appVersion,
            'client':client,
            'documentId':id
        }),
        dataType:'json',
        headers:{'Content-Type':'application/json'},
        success:function(data){
            let dataList=data.data;
            document.title=dataList.name;
            $('#docContent').html(dataList.content);
        },
        error:function(data){
        }
    });
})($);
