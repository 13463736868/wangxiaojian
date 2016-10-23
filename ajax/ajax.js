function ajax( options ){

  // alert(options['method']); return;

  var opts = {
    method : options['method'] || 'get',
    url : options['url'] || '',
    data : options['data'] || '',
    dataType : options['dataType'] || '',
    succ : options['succ'] || function(){},
    fail : options['fail'] || function(){}
  };

  var xhr = null;
    if( window.XMLHttpRequest ){
      xhr = new XMLHttpRequest();
    }else{
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function (){
      // 判断是否成功返回处理结果, 并是否成功拿到数据
      if( xhr.readyState === 4 ){
        if(xhr.status === 200){
          if(typeof opts.succ == 'function'){
            // opts.succ(xhr.responseText);
            // opts.succ(xhr.responseXML);   // 如果操作XML 需要用这个. xhr.responseXML : 会自动将取到得数据解析成一个xml 文档,并以DOM对象方式返回.
            // var json = JSON.parse(xhr.responseText);
            // opts.succ(json);
            // opts.succ(xhr.responseText);
            // opts.succ(xhr.responseXML);
            switch(opts.dataType){
              case "xml":
                opts.succ(xhr.responseXML);
                break;
              case "json":
                opts.succ(JSON.parse(xhr.responseText));
                break;
              default:
                opts.succ(xhr.responseText);
            }

          }
        }else{
            if(typeof opts.fail == 'function'){
              opts.fail(xhr.status);  //如果失败输出的状态
            }
         }
      }
    }

    if(opts.method == 'post'){
      xhr.open(opts.method,opts.url);
      xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"); //post 必须添加请求头.
      xhr.send(opts.data);
    }else{
      xhr.open(opts.method,opts.url + "?" + opts.data);
      xhr.send(null);
    }
}