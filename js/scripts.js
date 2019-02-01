'use strict'


//  button event
var select_btn;
var h_race, h_class, h_spead;
// STR - сила, DEX - ловкість, CON - статура, INT - інтелект, WIS - мудрість, CHA - харизма, choice_stats - на вибір.
var STR,DEX,CON,INT,WIS,CHA, choice_stats;

var btn_class;                                                                              //кнопка підтвердженння вибору класу
var btn_now; 
var radio_fighter,radio_fighter_checked;

//  Choice race
var elementbutton = document.querySelectorAll('h2+ul>li>button');                           // беру кнопки які показують інфу про расу
for (var i = 0, lem = elementbutton.length; i < lem; i++) {
    elementbutton[i].onclick = function () {
        var list_name = this.nextElementSibling;                                            // Беру "наступний елемент" нажатої кнопки   
        if (btn_now !=null &&  btn_now!=this) {                                             // Робить перевірку на попередню кнопку чи вона була ввікнена чині
            btn_now.classList.remove('viewable');
            btn_now.nextElementSibling.classList.remove('openlist')                         // якщо була тоді із попередню кнопку закривається та видалацється класи
            btn_now.nextElementSibling.classList.add('closelist')
        }    
        btn_now = this;
        this.classList.toggle('viewable');                                                   // Додавю клас до кнопки яка була нажата яка означає що ця раса переглядається
        list_name.classList.toggle('openlist');                                              // Додаю до "наступного елемента клас якиій відкиває його"
        if (list_name.classList.contains('openlist'))                                        // Перевіряю чи в "Наступному елементі" є клас openlist для видалення closelist
        {
                list_name.classList.remove('closelist');                                     // якщо є видаляю клас openlist
        }
        else list_name.classList.add('closelist');                                           // якщо ні додаю closelist
        if(this.classList.contains('viewable'))                                              // починається перевірка на те чи ця раса переглядається
        {
            select_btn = document.querySelector('button.viewable + ul li button');              // Беру кнопку для відтверження вибору
            
            } else { select_btn = null; }                                                       // якщо не знайшло кнопку то "елемент" пустий
            if(select_btn != null)                                                              // Перевіряю чи зміна не пуста та починаю закривати вибрану расу
            {
                select_btn.onclick = function () {                                              
                    if (confirm('Ви впевнені що хочите вибрати расу '+select_btn.value)) {                // Виводжу останнє повідомлення про підвердження остаточно вибору раси
                        document.querySelector('.h-race').classList.add('selected');
                        document.querySelector('.h-race').classList.remove('expected');         // Закриваю блок із вибором рас 
                        document.querySelector('.h-class').classList.add('expected');
                        document.querySelector('.h-class').classList.remove('selected');        // Відкриваю блок із вибору класа
                    }
                
                }
            }
            btn_class = document.querySelector('.h-class button.viewable + ul li button');      // Бере кнопку підтвердження класу який зараз переглядається
            if(btn_class != null){
                btn_class.onclick = function () {
                    if (confirm('Ви впевені що хочити вибрати клас '+btn_class.value+' із бойовим стилем '+radio_fighter_checked.value)){
                        document.querySelector('.h-class').classList.add('selected');
                        document.querySelector('.h-class').classList.remove('expected'); 
                        document.querySelector('.h-backstory').classList.remove('selected'); 
                        document.querySelector('.h-backstory').classList.add('expected'); 
                        open_deteils();
                    };
                };
            };
        };   
}






// Choice 

radio_fighter = document.querySelectorAll('input[name="master-style"]');

for (var i = 0, array = radio_fighter.length; i < array; i++) {
    if(radio_fighter[i].checked){
        radio_fighter_checked = radio_fighter[i];
    }
   radio_fighter[i].onchange = function () { 
        var radio_next_tag = this.nextElementSibling;
        radio_next_tag.classList.add('openlist');  
        for (var j = 0, arry = radio_fighter.length; j < arry; j++){
            if(radio_fighter[j].checked)
            {
                radio_fighter[j].nextElementSibling.classList.add('openlist');  
                radio_fighter[j].nextElementSibling.classList.remove('closelist');
            }   
            else{
                radio_fighter[j].nextElementSibling.classList.add('closelist');  
                radio_fighter[j].nextElementSibling.classList.remove('openlist');
            }
        }
        radio_fighter_checked = this;
   } 
};


//    backstrory
var backstory;
var count_backstory = document.querySelectorAll('.h-backstory > div');      // беру кількість backstory для рандома

var button_random_story = document.querySelector('#random-backstory');      // головна кнопка для рандома
for (let i = 0; i < count_backstory.length; i++) {                          // цикл в якому перераховую кількість backstory 
    count_backstory[i].classList.add('backstory-'+i)                        // та да їм відповідні класи
}

button_random_story.onclick = function () {                                 // Дані для рандом-кнопкі
    var random = Math.floor(Math.random() * count_backstory.length);
    backstory = document.querySelector('.backstory-'+random+'');
    for (let i = 0; i < count_backstory.length; i++) {      
        if(i != random){
            count_backstory[i].classList.add('selected');
            count_backstory[i].classList.remove('expected');
        }else{
            count_backstory[i].classList.add('expected');
            count_backstory[i].classList.remove('selected');
        }
    }

}

function open_deteils() {
    var openCloseElement, prevOpenCloseElement;
    var btnOpentDeteils = document.querySelectorAll('.h-backstory > div > button')
    for (let i = 0; i < btnOpentDeteils.length; i++) {
        btnOpentDeteils[i].onclick = function() {
            openCloseElement = this.nextElementSibling;
            openCloseElement.classList.toggle('closelist');
            openCloseElement.classList.toggle('openlist');
            prevOpenCloseElement = openCloseElement;
            if (prevOpenCloseElement !== openCloseElement) {
                prevOpenCloseElement.classList.add('closelist');
                prevOpenCloseElement.classList.remove('openlist');   
            }
        }
    }
    
   
}