(function ($) {


    ~(function (desW) {
        let winW = document.documentElement.clientWidth;
        document.documentElement.style.fontSize = winW / desW * 100 + 'px';
    })(375);
    let videoUrl = [],video=false,videoIndex=0,videoData=false,docData=false,title='';
    $.ajax({
        url: IP + '/eDrMd_App/by/chapter/video/list',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            'userId': userId,
            'token': token,
            'appVersion': appVersion,
            'client': client,
            'chapterId': chapterId
        }),
        dataType: 'json',
        headers: {'Content-Type': 'application/json'},
        success: function (data) {
            let dataList =data.data.video;
            if(!dataList){
                videoData=true;
            }
            title=data.data.name
            document.title=data.data.name;
            let str = '';
            if(dataList.length===0){
                $('.choice').hide();
                $('.tab-item').hide();
                $('.knowledge').show();
                $('.listBox').show();
                video=true;
            }else{
                $('.choice').show();
                $('.tab-item').show();
                dataList.map((item, index) => {
                    let strLi = '<li><img oID="' + index + '" src="' + item.coverUrl + '"/><span>' + item.title + '</span></li>';
                    videoUrl.push(item.playUrl);
                    str += strLi;
                });
                $('#videoList').html(str);
                /*$('#videoList li img').each((index,item)=>{
                    $(item).attr('imgIndex',index);
                })*/
                $("#videoList li").click(function () {
                    let index = $(this).index();
                    videoIndex=index;
                    //console.log(index, videoUrl[index]);
                    $('#play').html('<video controls autoplay>' + '<source src="' + videoUrl[index] + '" type="video/mp4"></source>' + '</video>');
                    $('#play').show().addClass('loading');
                });
            }
            if(video){
                $('#tab').hide();
                $('.box').css('marginTop',0);
            }
        },
        error: function (data) {

        }
    });
    let showPage = 1,pageSize=20,isEnd=false;
    let str = '';
    let dataList;
    let listId=[],index;
    function showAjax(showPage,pageSize) {
        $.ajax({
            url: IP + '/eDrMd_App/by/chapter/document/list',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                'userId': userId,
                'token': token,
                'appVersion': appVersion,
                'client': client,
                'chapterId': chapterId,
                'pageSize': pageSize,
                'showPage': showPage
            }),
            dataType: 'json',
            headers: {'Content-Type': 'application/json'},
            success: function (data) {
                dataList = data.data.document;
                $.each(dataList,function(index,item){
                    listId.push(item.documentId);
                });
                if(!dataList){
                    docData=true;
                }
                if(dataList.length===0){
                    $('.knowledge').hide();
                    $('.listBox').hide();
                    video=true;
                }else{
                    dataList.map((item, index) => {
                        let strLi = '<li documentId="' + item.documentId + '">' + item.name + '</li>';
                        str += strLi;
                    });
                    if(dataList.length<pageSize){
                        isEnd=true;
                    }
                    $('#docList').html(str);
                    $('#docList li').click(function () {
                        index=$(this).index();
                        change();
                        $.ajax({
                            url:IP+'/eDrMd_App/by/chapter/document/detail',
                            type:'post',
                            contentType:'application/json',
                            data:JSON.stringify({
                                'userId':userId,
                                'token':token,
                                'appVersion':appVersion,
                                'client':client,
                                'documentId':listId[index]
                            }),
                            dataType:'json',
                            headers:{'Content-Type':'application/json'},
                            success:function(data){
                                let dataList=data.data;
                                document.title=dataList.name;
                                $('.listBox').hide();
                                $('#document').show();
                                $('#docContent').html(dataList.content);
                            },
                            error:function(data){
                            }
                        });
                    });

                }
                if(video){
                    $('#tab').hide();
                    $('.box').css('marginTop',0);
                }

            },
            error: function (data) {

            }
        });
    }

    showAjax(showPage,pageSize);
    $("#tab li").click(function () {
        let index = $(this).index();
        $(this).addClass('choice').siblings().removeClass('choice');
        $('#box div').eq(index).show().siblings().hide();
    });


    $('#play').click(function () {
        $(this).hide();
        let video=$('#play video');
        console.log('video',video);
        video.trigger('pause');
        video.currentTime=0;

    });
    $('.prev').click(function(){
        if(index>0){
            index--;
            change();
            $.ajax({
                url:IP+'/eDrMd_App/by/chapter/document/detail',
                type:'post',
                contentType:'application/json',
                data:JSON.stringify({
                    'userId':userId,
                    'token':token,
                    'appVersion':appVersion,
                    'client':client,
                    'documentId':listId[index]
                }),
                dataType:'json',
                headers:{'Content-Type':'application/json'},
                success:function(data){
                    let dataList=data.data;
                    document.title=dataList.name;
                    $('.listBox').hide();
                    $('#document').show();
                    $('#docContent').html(dataList.content);
                },
                error:function(data){
                }
            });
        }else{
            return false;
        }
    });
    $('.next').click(function(){
        if(index<listId.length-1){
            index++;
            change();
            $.ajax({
                url:IP+'/eDrMd_App/by/chapter/document/detail',
                type:'post',
                contentType:'application/json',
                data:JSON.stringify({
                    'userId':userId,
                    'token':token,
                    'appVersion':appVersion,
                    'client':client,
                    'documentId':listId[index]
                }),
                dataType:'json',
                headers:{'Content-Type':'application/json'},
                success:function(data){
                    let dataList=data.data;
                    document.title=dataList.name;
                    $('.listBox').hide();
                    $('#document').show();
                    $('#docContent').html(dataList.content);
                },
                error:function(data){
                }
            });
        }else{
            return false;
        }
    });
    $('.back').click(function(){
        $('#document').hide();
        $('.listBox').show();
        document.title=title;
    })
    function scrollFn() {
        //已经滚动到上面的页面高度
        let scrollTop = $(this).scrollTop();
        //页面高度
        let scrollHeight = $(document).height();
        //浏览器窗口高度
        let windowHeight = $(this).height();
        //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
        if (scrollTop + windowHeight === scrollHeight && !isEnd) {
            showPage++;
            showAjax(showPage,pageSize);

        }else{
            //$('.prompt').show();
            return
        }
    }
    function change(){
        if(index<=0){
            $('.prev').attr('disabled',"true").css({'background-color' : 'gray'});
        }else{
            $('.prev').removeAttr("disabled").css({'background-color' : '#32afc5'});
        }
        if(index>=listId.length-1){
            $('.next').attr('disabled',"true").css({'background-color' : 'gray'});
        }else{
            $('.next').removeAttr("disabled").css({'background-color' : '#32afc5'});
        }
    }
    $(window).bind("scroll", scrollFn);//绑定滚动事件
    if(videoData && docData){
        $('#tab').hide();
        $('.noData').show();
    }
})($);
