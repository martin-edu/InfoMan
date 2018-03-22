var tabsGroup = ["PMtab","SStab","COtab","MOEtab","MCtab"];
var sectionsID = [];

/*$(document).ready(function(){
    $("#"+tabsGroup[0]).click(function(){
        cleanClasses();
        $("#"+sections[0]).show();
        $("#"+sections[0]).show();
        $("#"+tabsGroup[0]).addClass("active");
    });
    $("#"+tabsGroup[1]).click(function(){
        cleanClasses();
        $("#"+sections[1]).show();
        $("#"+tabsGroup[1]).addClass("active");
    });
    $("#"+tabsGroup[2]).click(function(){
        cleanClasses();
        $("#"+sections[2]).show();
        $("#"+tabsGroup[2]).addClass("active");
    });
    $("#"+tabsGroup[3]).click(function(){
        cleanClasses();
        $("#"+sections[3]).show();
        $("#"+tabsGroup[3]).addClass("active");
    });
    $("#"+tabsGroup[4]).click(function(){
        cleanClasses();
        $("#"+sections[4]).show();
        $("#"+tabsGroup[4]).addClass("active");
    });

});*/

function cleanClasses(){
    for (var index = 0; index < tabsGroup.length; index++){
        $("#"+tabsGroup[index]).removeClass("active");
        $("#"+sectionsID[index]).hide();
        $("#"+sectionsID[index]).removeClass("notShownInitialClass");
    } 
}


var data;
$(document).ready(function() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://infoman-backend.mybluemix.net/conversation/form",
        success: function(data){  
           var indexAreas;
           var indexVariables;
           var sections = [];
           var classNotShown = "notShownInitialClass";
           for(indexAreas in data){
            sections[indexAreas] = data[indexAreas].area;
            if(indexAreas == 0){
                classNotShown = "";
            }
            else
            {
                classNotShown = "notShownInitialClass";
            }
            $("#sections").append('<div id="'+indexAreas+ '" class="row my-4 '+classNotShown+'"><h3 class="col-xl-12">'+data[indexAreas].area+'</h3>');
            sectionsID[indexAreas] = indexAreas;
            for(indexVariables in data[indexAreas].variables){
                //if(data[indexAreas].variables.length != 0){
                  $("#"+indexAreas).append('<div class="col-xl-6 my-1"><div class="input-group"><div class="input-group-prepend"><span class="input-group-text">'+data[indexAreas].variables[indexVariables].field.replace(/_/g," ")+'</span></div>'+'<input type="url" class="form-control" value="'+data[indexAreas].variables[indexVariables].currentValue+'"></div></div>');
                  //$("#"+indexAreas).append('<input type="url" class="form-control" value="'+data[indexAreas].variables[indexVariables].currentValue+'">');
                //console.log(data[indexAreas].variables[indexVariables]);  
                //}
                
            }
           }
           console.log(sections);
           console.log(sectionsID);
         }
        });


        $("#"+tabsGroup[0]).click(function(){
            cleanClasses();
            $("#"+sectionsID[0]).show();
            $("#"+tabsGroup[0]).addClass("active");
        });
        $("#"+tabsGroup[1]).click(function(){
            cleanClasses();
            $("#"+sectionsID[1]).show();
            $("#"+tabsGroup[1]).addClass("active");
        });
        $("#"+tabsGroup[2]).click(function(){
            cleanClasses();
            $("#"+sectionsID[2]).show();
            $("#"+tabsGroup[2]).addClass("active");
        });
        $("#"+tabsGroup[3]).click(function(){
            cleanClasses();
            $("#"+sectionsID[3]).show();
            $("#"+tabsGroup[3]).addClass("active");
        });
        $("#"+tabsGroup[4]).click(function(){
            cleanClasses();
            $("#"+sectionsID[4]).show();
            $("#"+tabsGroup[4]).addClass("active");
        });

        
});

