var botData;
$(document).ready(function () {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://infoman-backend.mybluemix.net/conversation/form",
        success: function (data) {
            botData = data;
            for (var indexAreas in data) {
                $("#sections").append('<div id="' + indexAreas + '" class="row my-4 ' /*+ classNotShown */ +
                    '"><h3 class="col-xl-12">' + data[indexAreas].area + '</h3>');
                for (indexVariables in data[indexAreas].variables) {
                    $("#" + indexAreas).append('<div class="col-xl-6 my-1">' +
                        '<div class="input-group"><div class="input-group-prepend">' +
                        '<span class="input-group-text">' +
                        data[indexAreas].variables[indexVariables].field.replace(/_/g, " ") +
                        '</span>' +
                        '</div>' +
                        '<input type="text" class="form-control" value="' +
                        data[indexAreas].variables[indexVariables].currentValue + '" id="' +
                        data[indexAreas].variables[indexVariables].field.replace(/ /g, "_") + '"></div></div>');
                }

                $("#sections").append('<button type="button" class="btn btn-primary"' +
                    'value="' + indexAreas + '">Enviar Cambios</button>');
            }
            $(".btn.btn-primary").click(function () {
                //alert($(this).attr('value'));
                sendJson($(this).attr('value'));
            });

        }
    });


});




function sendJson(number) {
    var packageArea = new Object;

    packageArea.area = botData[number].area;
    packageArea.variables = [];
    //packageArea.variables = botData[number].variables;
    //alert(packageArea[number].variables[index].currentValue);
    for (index in botData[number].variables) {
        var variablesObject = new Object;
        //console.log(botData[number].variables[index].field);
        //console.log(botData[number].variables);
        variablesObject.field = botData[number].variables[index].field;
        //console.log($("#" + botData[number].variables[index].field).val());
        variablesObject.currentValue = $("#" + botData[number].variables[index].field).val();
        //packageArea[number].variables[index].currentValue = $("#"+botData[number].variables[index].field).val();
        packageArea.variables.push(variablesObject);

    }
    console.log(packageArea);
    //alert(packageArea.variables);
    $.ajax({
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(packageArea),
        url: "https://infoman-backend.mybluemix.net/conversation/update",
        success: function(){
            console.log("success");
        },
        error: function(xhr, ajaxOptions, thrownError){
            console.log(xhr.status);
            console.log(thrownError);
        }
    })
}