var express = require('express');
var router = express.Router();
var db=require('dao/dbConnect');
var url = require('url');



/* GET home page. */
router.get('/', function(req, res) {

    //res.cookie('username','aaa',{maxAge:60000*60*24});

    // console.log('ss' + req.cookies.username)
    // 未登录
    if(! req.cookies.username ){
        res.redirect('/login');
    }
    // 登录
    else {

        res.locals.username=req.cookies.username;

        client=db.connect();
       
        db.getVillageList(client, 1, function (result) {

            villageList = result;

            res.render('home', {villages:villageList });
        });
    }
  
});


router.route('/login')
    .get(function(req, res) {
        
        res.render('login');
    })
    .post(function(req, res) {
        client=db.connect();
        db.getUser(client,req.body.username, function (result) {
            console.log('result:' + result);
            if(result[0]===undefined){
                res.render('login', {'error':'没有该用户'});
            }else{
                if(result[0].password===req.body.password){

                    res.locals.username=req.body.username;
                    res.cookie('username',res.locals.username,{maxAge:60000*60*24});

                    res.redirect('/home');
                }else
                {
                    res.render('login', {'error':'用户名或密码错误'});
                }
               }
        });
    });

router.get('/logout', function(req, res) {
    res.clearCookie('username');
    req.session.destroy();
    res.redirect('/');
});

router.get('/home', function(req, res) {

    if(! req.cookies.username){
        res.redirect("/login");
    }

    var queryObj = url.parse(req.url,true).query;

    var deviceList=[];

    var id = queryObj.id;
    if (id) {
        client=db.connect();
       
        db.getVillageList(client, id, function (result) {

            villageList = result;

            res.render('home', { villages:villageList, user: req.cookies.username});
        });

        
   
    }else{

        res.render('home', { villages:[], user: req.cookies.username });

        

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
            res.render('device', { title: 'Home', user: res.locals.islogin, modules:moduleList, module:module,device_id:id });
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


router.route('/editModule')
    .get(function(req,res){
        var queryObj = url.parse(req.url,true).query;
        var id = queryObj.id;
        var device_id = queryObj.device_id;
        module = {}
        if (id) {
            client=db.connect();
           
            db.getModule(client, id, function (result) {

                moduleList = result;
                
                module = moduleList[0];
               
                console.log(moduleList);
                res.render('editModule', { title: 'Home', user: res.locals.islogin, module:module,device_id:device_id });
            });
       
        }else{
            res.render('editModule', { title: 'Home', user: res.locals.islogin,  module:module,device_id:device_id });
        }
    })
    .post(function(req,res) {
        client = db.connect();
        console.log(req.body);
        device_id = req.body.device_id;

        if (req.body.module_id) {
            

            db.updateModule(client,req.body.module_id ,req.body.module_name,req.body.module_type,req.body.producer,
                req.body.running_date,req.body.verify_date,req.body.version,req.body.verify_code,req.body.net_address,
                req.body.bianbi,req.body.dingzhidanhao, function (err) {
              if(err) throw err;
                //db.getModule(client, 1, function (result) {

                //moduleList = result;
        
               
                console.log('ss' + device_id);
                res.redirect('device?id='+ device_id);
              //});
        });

        } else {
            db.insertModule(client, device_id, req.body.module_name,req.body.module_type,req.body.producer,
                req.body.running_date,req.body.verify_date,req.body.version,req.body.verify_code,
                req.body.net_address,req.body.bianbi,req.body.dingzhidanhao, function (err) {
              if(err) throw err;
               
                
                res.redirect('device?id='+ device_id);
              });
        }
        
    });


module.exports = router;

