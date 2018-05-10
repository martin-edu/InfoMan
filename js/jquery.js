var tabsGroup = ["COtab", "MCtab", "PPtab", "SStab", "PMtab", "MOEtab", ];
var sectionsID = [];
var mainObjects = [];
var sections = [];



var data;
$(document).ready(function () {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://infoman-backend.mybluemix.net/conversation/form",
        success: function (data) {
            var indexAreas;
            var indexVariables;
            
            var classNotShown = "notShownInitialClass";
            for (indexAreas in data) {
                sections[indexAreas] = data[indexAreas].area;
                mainObjects[indexAreas] =  sections[indexAreas];
                if (indexAreas == 0) {
                    classNotShown = "";
                } else {
                    classNotShown = "notShownInitialClass";
                }

                $("#sections").append('<div id="' + sections[indexAreas].replace(/ /g, "_") + '" class="row my-4 ' + classNotShown + 
                '"><h3 class="col-xl-12">' + data[indexAreas].area + '</h3>');
                sectionsID[indexAreas] = indexAreas;
                
                for (indexVariables in data[indexAreas].variables) {
                    $("#" + sections[indexAreas].replace(/ /g, "_")).append('<div class="col-xl-6 my-1">'+
                        '<div class="input-group"><div class="input-group-prepend">'+
                            '<span class="input-group-text">'
                             + data[indexAreas].variables[indexVariables].field.replace(/_/g, " ") + 
                             '</span>'+
                             '</div>' + 
                             '<input type="text" class="form-control" value="' + 
                             data[indexAreas].variables[indexVariables].currentValue + '" id="'+
                             sections[indexAreas].replace(/ /g, "_") + indexVariables+'">'+
                             '</div></div>');
                   

                }
                console.log(data[indexAreas].variables);
            }
            console.log(sections);
            console.log(sectionsID);
        }
    });


    $("#" + tabsGroup[0]).click(function () {
        cleanClasses();
        $("#" + sections[0].replace(/ /g, "_")).show();
        $("#" + tabsGroup[0]).addClass("active");
    });
    $("#" + tabsGroup[1]).click(function () {
        cleanClasses();
        $("#" + sections[1].replace(/ /g, "_")).show();
        $("#" + tabsGroup[1]).addClass("active");
    });
    $("#" + tabsGroup[2]).click(function () {
        cleanClasses();
        $("#" + sections[2].replace(/ /g, "_")).show();
        $("#" + tabsGroup[2]).addClass("active");
    });
    $("#" + tabsGroup[3]).click(function () {
        cleanClasses();
        $("#" + sections[3].replace(/ /g, "_")).show();
        $("#" + tabsGroup[3]).addClass("active");
    });
    $("#" + tabsGroup[4]).click(function () {
        cleanClasses();
        $("#" + sections[4].replace(/ /g, "_")).show();
        $("#" + tabsGroup[4]).addClass("active");
    });
    $("#" + tabsGroup[5]).click(function () {
        cleanClasses();
        $("#" + sections[5].replace(/ /g, "_")).show();
        $("#" + tabsGroup[5]).addClass("active");
    });

});

function cleanClasses() {
    for (var index = 0; index < tabsGroup.length; index++) {
        $("#" + tabsGroup[index]).removeClass("active");
        $("#" + sections[index].replace(/ /g, "_")).hide();
        $("#" + sections[index].replace(/ /g, "_")).removeClass("notShownInitialClass");
    }
}

function buildJ(){
    
}