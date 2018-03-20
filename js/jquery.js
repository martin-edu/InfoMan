var tabsGroup = ["PMtab","SStab","COtab","MOEtab","MCtab"];
var sections = ["PM","SS","CO","MOE","MC"];

$(document).ready(function(){
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

});

function cleanClasses(){
    for (var index = 0; index < tabsGroup.length; index++){
        $("#"+tabsGroup[index]).removeClass("active");
        $("#"+sections[index]).hide();
        $("#"+sections[index]).removeClass("notShownInitialClass");
    } 
}

