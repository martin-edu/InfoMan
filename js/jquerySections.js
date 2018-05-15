var section;
var botData;

$(document).ready(function (){
    $("#alert").hide();
    $(".nav-link").click(function (){
        $("#alert").hide();
        section = $(this).attr("id");
        $(this).addClass("active");
        quitActive($(this).attr("id"));
    getSection(section);
    });

    $("#0").click();
    
});



function quitActive(id){
    for(var index = 0; index < 6; index++){
        if(index != id)
        {
            $("#"+index).removeClass("active");
        }
    }
    
}

function getSection(id){
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://infoman-backend.mybluemix.net/conversation/form",
        success: function (data) {
            botData = data;
            $("#sections").replaceWith('<div class="row my-4" id="sections">'+
            '<h3 class="col-xl-12">' + data[section].area+'</h3>');

            for (indexVariables in data[id].variables) {
                $("#sections").append('<div class="col-xl-6 my-1">' +
                    '<div class="input-group"><div class="input-group-prepend">' +
                    '<span class="input-group-text">' +
                    data[id].variables[indexVariables].field.replace(/_/g, " ") +
                    '</span>' +
                    '</div>' +
                    '<input type="text" class="form-control" value="' +
                    data[id].variables[indexVariables].currentValue + '" id="' +
                    data[id].variables[indexVariables].field.replace(/ /g, "_") + '"></div></div></div></div>');
            }
            $("#sections").append('<div class="col-xl-6 my-1"><button type="button" class="btn btn-primary"' +
            'value="' + id + '">Enviar Cambios</button></div>');
         $(".btn.btn-primary").click(function () {
        sendJson($(this).attr('value'));
        
         });
        }
    });
   
}

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
            $("#alert").show();
            //location.reload();
            console.log("success");
        },
        error: function(xhr, ajaxOptions, thrownError){

            console.log(xhr.status);
            console.log(thrownError);
        }
            
    })
};


    