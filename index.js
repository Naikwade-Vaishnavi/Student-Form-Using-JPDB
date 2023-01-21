var jpdbBaseURL = "http://api.login2explore.com.5577";
var connToken = "90932395|-31949271247808583|90953765";

var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBName = "StudentDB";
var empRelationName = "Std-Rel";

$('#roll').focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.addressta);
    localStorage.setItem('recno', lvData.rec_no);
}

function getEmpIdAsJsonObj() {
    var roll = $('#roll').val();
    var jsonStr = {
        id: roll
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.address).record;
    $("#name").val(record.name);
    $("#class1").val(record.class1);
    $("#bday").val(record.bday);
    $("#address").val(record.address);
    $("#edate").val(record.edate);
}

function resetForm() {
        $("#roll").val('');
        $("#name").val('');
        $("#class1").val('');
        $("#bday").val('');
        $("#address").val('');
        $("#edate").val('');
        $("#roll").prop('disabled',false);
        $("#save").prop('disabled',true);
        $("#change").prop('disabled',true);
        $("#reset").prop('disabled',true);
        $("#roll").focus();
}

function valiaddressteData() {
    var roll, name, class11, bday, address, edate;
    roll = $('#roll').val();
    name = $('#name').val();
    class1 = $('#class1').val();
    bday = $('#bday').val();
    address = $('#address').val();
    edate = $('#edate').val();
    
    if (roll === '') {
        alert('Roll No missing');
        $('#roll').focus();
        return "";
    }
    if (name === '') {
        alert('Student Name missing');
        $('#name').focus();
        return "";
    }
    if (class1 === '') {
        alert('Class missing');
        $('#class1').focus();
        return "";
    }
    if (bday === '') {
        alert('Birthdate missing');
        $('#baddressy').focus();
        return "";
    }
    if (address === '') {
        alert('Address missing');
        $('#address').focus();
        return "";
    }
    if (edate === '') {
        alert('Enrollment Date missing');
        $('#edate').focus();
        return "";
    }
    
    var jsonStrObj = {
        id: roll,
        name: name,
        salary: class1,
        baddressy: bday,
        address: address,
        edateion: edate
    };
    return JSON.stringify(jsonStrObj);
}

function getStd(){
    var stdIdJsonObj = getstdIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, empRelationName, empIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    if (resJsonObj.status === 400) {
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#name').focus();
    } else if (resJsonObj.status === 200) {
        
        $('roll').prop('disabled',true);
        fillData(resJsonObj);
        
        $('#change').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#name').focus();
    }
}

function saveData() {
    var jsonStrObj = valiaddressteData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest =createPUTRequest(connToken, jsonStrObj, empDBName, empRelationName );
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#roll').focus();
}

function changeData() {
    $('#change').prop('disabled', true);
    jsonChg = valiaddressteData();
    var upaddressteRequest = createUPDATERequest(connToken, jsonChg,empDBName, empRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(upaddressteRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#roll').focus();
}







