$(function(){
    //    declare variables
        var myArray;
        var inputLength;
        var reading = false;
        var counter;
        var action;
        var frequency = 200;
        var percentage;
        var sliderValue;
    //    on page load hide elements we don'n need       leave only text area and start button
    $("#new").hide();
    $("#pause").hide();
    $("#resume").hide();
    $("#control").hide();
    $("#error").hide();
    $("#results").hide();
        //    click o Start reading
    $("#start").click(function(){
                //        get text and split it to words inside an array
                    ///\s matches tabs,spaces,new lines etc And + means one and more;
                myArray = $("#userInput").val().split(/\s+/);
                //get number of words
                inputLength = myArray.length; 
        if(inputLength>1){
            //there is enough input 
                //move to reading mode
                reading = true;
                    //hide Start,userInput,error,Show new,Resume,Controls,results
                $("#start").hide();
                $("#userInput").hide();
                $("#error").hide();
                $("#new").show();
                $("#pause").show();
                $("#control").show();
            
            //set progress slider max
                $("#progressSlider").attr("max",inputLength-1);
            
                //start counter to zero
                counter = 0;
             
                //show reading box with the first
                $("#results").show();
                $("#results").text(myArray[counter]);
            
                //start reading from the first word
                action = setInterval(read, frequency);
        }else{
            //not enough text input
            $("#error").show();
        }
        });
    
        //    click on New
            $("#new").click(function(){
                //reload page
                location.reload();
            });
        //    click on Pause
            $("#pause").click(function(){
                //stop reading and switch to on reading mode
                clearInterval(action);
                reading = false;
                $(this).hide();
                $("#resume").show();
                
            });
    
        //    click on Resume
                $("#resume").click(function(){
                    //gp back to reading mode
                    action = setInterval(read, frequency);
                    reading = true;
                    $(this).hide();
                    $("#pause").show();
            });
    
        //    change FontSize
            $("#fontSizeSlider").on("slidestop", function(event,ui){
                //refresh the slider
                    $("#fontSizeSlider").slider('refresh');
                //get the value of the slider
                   sliderValue = parseInt($("#fontSizeSlider").val());

                    $("#results").css("fontSize", sliderValue);

                    //change the value of the span element int font size of the slider 
                    $("#fontsize").text(sliderValue);

            });
    
        //    change Speed
            $("#speedSlider").on("slidestop", function(event,ui){
                //refresh the slider
                    $("#speedSlider").slider('refresh');
                //get the value of the slider
                   sliderValue = parseInt($("#speedSlider").val());

                    //change the value of the span element int font size of the slider 
                    $("#speed").text(sliderValue);
                
                //stop the reading
                    clearInterval(action);
                
                //change frequency
                    frequency = 60000/sliderValue;
                
                //Resume Reading
                    if(reading){
                        action = setInterval(read, frequency);
                    }
            });
    
        //    Progress Slider
                $("#progressSlider").on("slidestop", function(event,ui){
                //refresh the slider
                    $("#progressSlider").slider('refresh');
                //get the value of the slider
                   sliderValue = parseInt($("#progressSlider").val());

//                    //change the value of the span element int font size of the slider 
//                    $("#percentage").text(sliderValue);
                
                //stop the reading
                    clearInterval(action);
                    
                //Change Counter
                    counter = sliderValue;
                    
                //change Word
                    $("#results").text(myArray[counter]);
                    
                //change the value of the progress percetage 
                    $("#percentage").text(Math.floor((counter/(inputLength-1))*100));
                
//                //change frequency
//                    frequency = 60000/sliderValue;
                
                //Resume Reading
                    if(reading){
                        action = setInterval(read, frequency);
                    }
            });

//    functions
    function read(){
        if(counter == inputLength-1){
            //last word
            clearInterval(action);
            reading = false;//move to non reading mode
            $("#results").hide();
            $("#pause").hide();
            $("#control").hide();
        }else{
            //counter goes up by one
                counter++;
            //get word
                $("#results").text(myArray[counter]);
            
            //change progress slider value and refresh
                $("#progressSlider").val(counter).slider('refresh');
            
            //change percentage of process slider
            percentage = Math.floor((counter/(inputLength-1))*100);
            $("#percentage").text(percentage);
            
        }
    }
    
});