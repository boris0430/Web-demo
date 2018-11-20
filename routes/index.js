var express = require('express');
var router = express.Router();
var db=require('dao/dbConnect');
var url = require('url');

/* GET home page. */
router.get('/index', function(req, res) {
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
if(req.session.islogin){
    res.locals.islogin=req.session.islogin;
}
  res.render('index', { title: 'HOME',test:res.locals.islogin});
});


router.route('/login')
    .get(function(req, res) {
        if(req.session.islogin){
            res.locals.islogin=req.session.islogin;
        }

        if(req.cookies.islogin){
            req.session.islogin=req.cookies.islogin;
        }
        res.render('login', { title: '用户登录' ,test:res.locals.islogin});
    })
    .post(function(req, res) {
        client=db.connect();
        result=null;
        db.getUser(client,req.body.username, function (result) {
            if(result[0]===undefined){
                res.send('没有该用户');
            }else{
                if(result[0].password===req.body.password){
                    req.session.islogin=req.body.username;
                    res.locals.islogin=req.session.islogin;
                    res.cookie('islogin',res.locals.islogin,{maxAge:60000});
                    res.redirect('/home');
                }else
                {
                    res.render('login', {'error':'用户名或密码错误'});
                }
               }
        });
    });

router.get('/logout', function(req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});

router.get('/home', function(req, res) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }

    var queryObj = url.parse(req.url,true).query;

    var deviceList=[];

    var id = queryObj.id;
    if (id) {
        client=db.connect();
       
        db.getVillageList(client, id, function (result) {

            villageList = result;

            res.render('home', { title: 'Home', user: res.locals.islogin, villages:villageList });
        });

        
   
    }else{

        client=db.connect();
       
        db.getVillageList(client, 1, function (result) {

            villageList = result;

            res.render('home', { title: 'Home', user: res.locals.islogin, villages:villageList });
        });

    }
    
});

router.get('/deviceList', function(req, res) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }

    var queryObj = url.parse(req.url,true).query;

    var deviceList=[];

    var id = queryObj.id;
    if (id) {
        client=db.connect();
       
        db.getDeviceList(client, id, function (result) {

            deviceList = result;

            console.log(deviceList);
            var arr = new Array();
            var xMax = 4;
            for (i=0; i<xMax; i++) {
                arr[i] = new Array();
            }

            for (var i=0; i<deviceList.length; i++) {
                arr[deviceList[i]["pos_x"]-1][deviceList[i]["pos_y"]-1] = deviceList[i];
            }
            console.log(arr);
 



            res.render('deviceList', { title: 'Home', user: res.locals.islogin, devices:arr });
        });
   
    }else{
        res.render('deviceList', { title: 'Home', user: res.locals.islogin, devices:deviceList });
    }
    
});


router.get('/device', function(req, res) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }

    var queryObj = url.parse(req.url,true).query;

    var moduleList=[];
    var module = {}

    var id = queryObj.id;
    var moduleId = queryObj.moduleId;
    if (id) {
        client=db.connect();
       
        db.getModuleList(client, id, function (result) {

            moduleList = result;
            if (moduleId) {

                moduleList.forEach(function(item,index){
                    if (item["module_id"] == moduleId){
                        module = item;
                    }
                });
            } else {
                module = moduleList[0];
            }
           
            console.log(moduleList);
            res.render('device', { title: 'Home', user: res.locals.islogin, modules:moduleList, module:module });
        });
   
    }else{
        res.render('device', { title: 'Home', user: res.locals.islogin, modules:moduleList, module:module });
    }
    
});


router.route('/reg')
    .get(function(req,res){
        res.render('reg',{title:'注册'});
    })
    .post(function(req,res) {
        client = db.connect();

        db.insertUser(client,req.body.username ,req.body.password, function (err) {
              if(err) throw err;
              res.redirect('login');
        });
    });


router.route('/editDevice')
    .get(function(req,res){
        var queryObj = url.parse(req.url,true).query;
        var id = queryObj.id;
        var moduleId = queryObj.moduleId;
        if (id) {
            client=db.connect();
           
            db.getModule(client, id, function (result) {

                moduleList = result;
                if (moduleId) {
                    module = moduleList[0];
                } else {
                    module = moduleList[0];
                }
               
                console.log(moduleList);
                res.render('editDevice', { title: 'Home', user: res.locals.islogin, module:module });
            });
       
        }else{
            res.render('editDevice', { title: 'Home', user: res.locals.islogin,  module:module });
        }
    })
    .post(function(req,res) {
        client = db.connect();
        console.log(req.body);
        db.updateModule(client,1 ,req.body.module_name,req.body.module_type,req.body.producer,
        req.body.running_date,req.body.verify_date,req.body.version,req.body.verify_code,req.body.network_address,
        req.body.bianbi,req.body.dingzhidanhao, function (err) {
              if(err) throw err;
                db.getModule(client, 1, function (result) {

                moduleList = result;
        
               
                console.log(moduleList);
                res.render('editDevice', { title: 'Home', user: res.locals.islogin, module:moduleList[0] });
              });
        });
    });


module.exports = router;

