const http= require('http');
const port=8080
http.createServer(onRequest).listen(port,()=>{
     
    console.log("Example app listening at 8080") 
  });




var fs = require('fs');
var dataHtml;

function onRequest(req, res) {
    
    if(req.method === 'GET' && req.url === '/'){
    setHtml(res,'./index.html')
}

    else if(req.method === 'POST'&& req.url ==="/add")
    { var body='';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        dataHtml= getDataFromHtml(body)
        if(Number(dataHtml.leNomDuChamp)>10){setHtml(res,'./index.html');}
        else {
           
            setHtml(res,'./table.html');
            
        }
	});
}
else if(req.method === 'POST'&& req.url ==="/table")
{ var body='';
   req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        dataHtml= getDataFromHtml(body);
     
        setHtml(res,'./resultat.html');
        
	});
}
}






function setHtml(res,page){
    //res.write('KADDOUR');
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile(page, null, function(error, data) {
        if (error) {
            res.writeHead(404);
            res.write('File not found!');
        } else {
            if (page==='./table.html'){
            res.write('<script>var number ='+dataHtml +'</script>');
        }
            else if(page==='./resultat.html'){
                console.log(dataHtml)
                res.writeO
                ('<script>var number ='+dataHtml+'</script>');
        }
            res.write(data);
        }
        res.end();
    });
}

function getDataFromHtml( data){
    const Lettrelimit='&';
    
    const numberOfData=data.split(Lettrelimit).length;
    var dataUsed=data;
    var indexend=0;var indexequal=0;
    var output='{';
    for(i=0;i<numberOfData;i++){
        indexequal=dataUsed.indexOf('=');
        output+='"'+dataUsed.slice(0,indexequal)+'":';
        indexend=dataUsed.indexOf(Lettrelimit); //console.log('indexend: '+indexend)
        if(indexend!=-1){
        output+='"'+dataUsed.slice(indexequal+1,indexend)+'", ';
     }
        else{
            output+='"'+dataUsed.slice(indexequal+1,dataUsed.length)+'" ';
        }

        dataUsed=dataUsed.slice(indexend+1,data.length);//console.log('dataUsed: '+dataUsed)
    }
    output+='}';
    
    return output;
}
