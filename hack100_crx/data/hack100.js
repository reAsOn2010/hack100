var urlMatchData = {
    "index" : "/",
    "login" : "/cstcx/web/index.asp",
    "logout" : "/cstcs/web/login/Logout.asp?Rnd.301948=.7747401",
    "home" : "/cstcx/web/index_student.asp",
    "changePassword" : "/cstcx/web/login/ChangePwd.asp",
    "course" : "/cstcx/web/index_cource.asp",
    "check" : "/cstcx/web/login/check.asp",
    "examList": "/cstcx/web/jobexam/ExamList.asp",
    "examSubmit": "/cstcx/web/jobexam/uploadexamsub.asp",
    "progressUpload" : "/cstcx/web/jobexam/Progress_upload.asp",
};

var UploadPageDealer = function() {
    this.hack = function() {
        console.log("\t\tin progress upload page hacker");
        /* TODO make a redirection to refresh current frame page */
    }
}

var CheckPageDealer = function() {
    this.hack = function() {
        console.log("\t\tin check page hacker");

        /* if login incorrect, there is an alert */
        if ($("script").html().search("alert") == -1) {
            /* top is used to jump out of frame page */
            window.top.location.replace("http://10.71.45.100/cstcx/web/index_student.asp?");
        }
    };
};

var HomePageDealer = function() {
    /* modify logout button */
    this.hack = function() {
        console.log("\t\tin home page hacker");

    };
};

var LoginPageDealer = function() {
    this.hack = function(url) {
        console.log("\t\tin login page hacker");

        /* tt = *** */
        var teacher = url.split('?')[1].split('&')[0].split('=')[1];
        /* Rnd.*******=.******* */
        var rnd = url.split('?')[1].split('&')[2];

        $("#form1").attr({
            "action": "login/check.asp?tn=" + teacher + "&" + rnd,
            "target": "checkff"
        });

        /* TODO: use a better way to modify #form1 */
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
        });
    };

};

var ExamSubmitDealer = function() {

    /* regular expression for file type check */
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
        console.log("\t\tin login page hacker");

        /* the url for submission is only in VBScript, find it */
        /* I find something wrong! */
        /* the url can be composed using this frame's url */
        /* TODO: use window.loaction to implement */
        var fuckingVBS = $("#clientEventHandlersVBS").html();
        var action = fuckingVBS.slice(fuckingVBS.indexOf("document.frmExam.action"),
                fuckingVBS.indexOf("document.frmExam.target")).split('"')[1];
        $("#btnUpload").click(function() {
            var $form = $("form[name='frmExam']");
            $form.attr({
                "action": action,
                "target": "ffUpLoad"
            });
            if (isFileValid()) {
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
                new ExamSubmitDealer().hack();
                break;
            case urlMatchData.check:
                console.log("\tmatch check");
                new CheckPageDealer().hack();
                break;
            case urlMatchData.progressUpload:
                console.log("\tmatch progress upload");
                new UploadPageDealer().hack();
                break;
            default:
                console.log("\tmatch none");
                break;
        }
    };
};

var mainDealer = new URLDealer(window.location);
mainDealer.hackPage();
