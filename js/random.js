function randomAbillityPoint({boxName, maxRandom, minRandom, nameButton}){
    var boxName, nameButton,minRandom, maxRandom;
    var oldStatus;
    boxName     == null ? boxName       ='.randomBox'   : boxName; 
    nameButton  == null ? nameButton    = "random"      : nameButton;
    minRandom   == null ? minRandom     = 0             : minRandom;  
    maxRandom   == null ? maxRandom     = 6             : maxRandom;
    var boxElement = document.querySelector(boxName),
        numberBlocks = boxElement.querySelectorAll('*');

    checkBoxStatus("clean",boxElement);
    if(minRandom >=  maxRandom){
        return console.error("Minimul nubmer equals or more max number" );
    };
    
    if(boxElement == null || boxElement == undefined ){
        return console.error("Can find an element!!");
    };
    for (let i = 0; i < numberBlocks.length; i++) {
        numberBlocks[i].classList.add('block-'+i);
    };
    var randomBlock     = document.createElement('div'),
        customBlock     = document.createElement('div'),
        randomButton    = document.createElement('button'),
        custonButton    = document.createElement('button');
    
    

    randomButton.innerHTML = "Random";
    custonButton.innerHTML = "Custom";
    customBlock.appendChild(custonButton);
    randomBlock.appendChild(randomButton);
    boxElement.insertBefore(customBlock,boxElement.firstChild);
    boxElement.appendChild(randomBlock);   
    

    randomButton.onclick = function () {
        clickRandom();
    };
    custonButton.onclick = function () {
        clickCustom();
    }


    //  random click
    function clickRandom() {
        
        if ((boxElement.classList.contains("clean")) || (boxElement.classList.contains("random"))){
            for (let i = 0; i < numberBlocks.length; i++) {    
                if(numberBlocks[i].querySelector('span')){
                    numberBlocks[i].removeChild(numberBlocks[i].querySelector('span'));
                }
                numberBlocks[i].innerHTML += "<span>"+randomNumber(minRandom, maxRandom)+"</span>";
            }
            checkBoxStatus("random",boxElement);
        }else if(boxElement.classList.contains("custom")){
            for (let i = 0; i < numberBlocks.length; i++){
                numberBlocks[i].querySelector('input').value = randomNumber(minRandom, maxRandom);
            }
        }     
    };

    // custom click
    function clickCustom() {
        // checkBoxStatus("custom",boxElement);
        
        if ((boxElement.classList.contains("clean")) && (boxElement.classList.contains("custom") == false)) {
            createInput(numberBlocks,"number");
            checkBoxStatus("custom",boxElement);    
        }else if(boxElement.classList.contains("custom")){
            for (let i = 0; i < numberBlocks.length; i++) {
                numberBlocks[i].querySelector('input').value = '';
            }
        }else if(boxElement.classList.contains("random")){
            createInput(numberBlocks,"number");
            for (let i = 0; i < numberBlocks.length; i++) {
                var spanValue = numberBlocks[i].querySelector('span').textContent;
                numberBlocks[i].querySelector('input').value = spanValue;
                numberBlocks[i].querySelector('span').remove();
            }
            checkBoxStatus("custom",boxElement);
        }
    } 

    // set status
    function checkBoxStatus(elementStatus,element) { 
        var newStatus = elementStatus;
        if((element.classList.contains(newStatus))== false){
            element.classList.add(newStatus);
            element.classList.remove(oldStatus);
        };
        oldStatus = newStatus;
    }

    // create input
    function createInput(blocks,types) {
        for (let i = 0; i < blocks.length; i++) {    
            customField         = document.createElement('input');
            customField.type    = types;
            customField.min     = minRandom;
            customField.max     = maxRandom;
            blocks[i].appendChild(customField);
        } 
    }
    function randomNumber(min,max) {
        var random = (Math.floor(Math.random() * (max - min + 1 )) + min);
        return random;
    }   
}




randomAbillityPoint({
    boxName     : '.ability-scores',
    maxRandom   : 18,
    minRandom   : 3,
});