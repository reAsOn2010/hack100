//alert("hacked!")
var urlTestLogin = {
    "host" : "10.71.45.100",
    "href" : "http://10.71.45.100/cstcx/web/index.asp?"+
        "tt=wzh&tn=%CD%F5%D7%DC%BB%D4&Rnd.6779477=.5024539",
    "search" : "?tt=wzh&tn=%CD%F5%D7%DC%BB%D4&Rnd.6779477=.5024539",
    "pathname" : "/cstcx/web/index.asp"
};

var urlTestHome = {
    "host" : "10.71.45.100",
    "href" : "http://10.71.45.100/cstcx/web/index_student.asp?Rnd.7055475=.533424",
    "search" : "?Rnd.7055475=.533424",
    "pathname" : "/cstcx/web/index_student.asp"
};

var urlTestChangePassword = {
    "host" : "10.71.45.100",
    "href" : "http://10.71.45.100/cstcx/web/login/ChangePwd.asp?rnd=.533424",
    "search" : "?rnd=.533424",
    "pathname" : "/cstcx/web/login/ChangePwd.asp"
};

var urlTestCourse = {
    "host" : "10.71.45.100",
    "href" : "http://10.71.45.100/cstcx/web/index_cource.asp?"+
        "coid=15&coname=计算机体系结构&clsid=14&clsname=12-13计算机体系结构&flag=0&"+
        "techid=55&kcm=计算机体系结构[2012-2013春夏-王总辉 -12-13计算机体系结构]&df=7",

    "search" : "?coid=15&coname=计算机体系结构&clsid=14&"+
        "clsname=12-13计算机体系结构&flag=0&techid=55&"+
        "kcm=计算机体系结构[2012-2013春夏-王总辉 -12-13计算机体系结构]&df=7",

    "pathname" : "/cstcx/web/index_cource.asp"
};

var urlMatchData = {
    "index" : "/",
    "login" : "/cstcx/web/index.asp",
    "home" : "/cstcx/web/index_student.asp",
    "changePassword" : "/cstcx/web/login/ChangePwd.asp",
    "course" : "/cstcx/web/index_cource.asp",
    "examList": "/cstcx/web/jobexam/ExamList.asp",
    "examSubmit": "/cstcx/web/jobexam/uploadexamsub.asp",
};

var LoginPageDealer = function() {
    this.hack = function(url) {
        console.log("\t\tin login page hacker");
        var teacher = url.split('?')[1].split('&')[0].split('=')[1];
        var rnd = url.split('?')[1].split('&')[2];
        //console.log(teacher);
        //console.log(rnd);

        $("#form1").attr({
            "action": "login/check.asp?tn=" + teacher + "&" + rnd,
            "target": "checkff"
        });

        $("#form1").html(
                '<table style="font:12px Tahoma;" width="190" height="80px" border="0" cellspacing="0" cellpadding="0" bgcolor="LightBlue">'+
                '<tbody><tr>'+
                '<td width="60px" align="right">用户名：</td>'+
                '<td align="left"><input type="text" id="txtUser" name="txtUser" style="width:100px;height:18px;border:1 solid;"></td>'+
                '</tr>'+
                '<tr>'+
                '<td width="60px" align="right">密   码：</td>'+
                '<td align="left"><input id="txtPwd" name="txtPwd" type="password" style="width:100px;height:18px;border:1 solid;"></td>'+
                '</tr>'+
                '<tr>'+
                '<td colspan="2" align="center"><input type="button" value="登录" id="btnLogin" name="btnLogin" class="btn1">'+
                '</td>'+
                '</tr>'+
                '</tbody></table>'
                );
        $("#btnLogin").click(function() {
            $("#form1").submit();
            
            setTimeout(function() {
                window.location.replace("http://10.71.45.100/cstcx/web/index_student.asp?");
            }, 1000);
            
        });
    };

};

var examSubmitDealer = function() {
    var fileReg = /.*\.(rar|zip|docx|doc|xlsx|xls|pptx|ppt|txt|pdf|mdb|accdb|htm)/i;
    var isFileValid = function() {
        if ($("#fileExam").val().length == 0) {
            alert("file cannot be empty");
            return false;
        }
        else if ($("#fileExam").val().search(fileReg) == -1) {
            alert("unsupported file type");
            return false;
        }
        return true;
    }
    this.hack = function() {
        var fuckingVBS = $("#clientEventHandlersVBS").html();
        var action = fuckingVBS.slice(fuckingVBS.indexOf("document.frmExam.action"),
                fuckingVBS.indexOf("document.frmExam.target")).split('"')[1];
        alert(action);
        $("#btnUpload").click(function() {
            var $form = $("form[name='frmExam']");
            $form.attr({
                "action": action,
                "target": "ffUpLoad"
            });
            if (isFileValid()) {
                alert($("#fileExam").val());
                alert($form.attr("action"));
                alert($form.attr("target"));
                $form.submit();
            }
        });
    };
};

var URLDealer = function(url) {
    this.host = url.host;
    this.href = url.href;
    this.pathname = url.pathname;
    this.search = url.search;

    this.hackPage = function() {
        console.log("pathname:" + this.pathname);
        switch(this.pathname) {
            case urlMatchData.index:
                console.log("\tmatch index");
                break;
            case urlMatchData.home:
                console.log("\tmatch home");
                break;
            case urlMatchData.login:
                console.log("\tmatch login");
                new LoginPageDealer().hack(this.href);
                break;
            case urlMatchData.changePassword:
                console.log("\tmatch changePassword");
                break;
            case urlMatchData.course:
                console.log("\tmatch course");
                break;
            case urlMatchData.examList:
                console.log("\tmatch examList");
                break;
            case urlMatchData.examSubmit:
                console.log("\tmatch examSubmit");
                new examSubmitDealer().hack();
                break;
            default:
                console.log("\tmatch none");
                break;
        }
    };
};

var mainDealer = new URLDealer(window.location);
mainDealer.hackPage();
