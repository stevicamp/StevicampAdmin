


// // ############## ENDPOINTS #################################################################################################
// let jsDelivr = 'https://cdn.jsdelivr.net/gh/';

// ############## DATABASE #################################################################################################
// var base_db = null; // Db moved to CRUD file

var locationInputChanged = false;

var prevUrl = "";

var popStateUrl = false;


var editItemImgArr = []; // Used to hold the links of add and edit view // Also used to display the images in the view image container // Also now sed for Add mode 

let deleteImagesEditArr = []; // Used to hold the deleted images links // it is used when editSave button is pressed loops the images and deletes them before saving the db. 

let imgCompressionSizeGlobal = 1000;

let imgCompressionPercentFixed = 70;

let imgCompressionExtensionGlobal = 'webp';
// function b64DecodeUnicode(str) {
//     // Going backwards: from bytestream, to percent-encoding, to original string.
//     return decodeURIComponent(atob(str).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
// }




function decodeBase64Unicode(base64) {
    const text = atob(base64);
    const length = text.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = text.charCodeAt(i);
    }
    const decoder = new TextDecoder(); // default is utf-8
    return decoder.decode(bytes);
}



// async function getDbAsync() {
//     if (base_db == null) {
//         // var jsDb = await fetch('https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp/resources/db/database.json?1', {cache: "reload"})
//         // var jsDb = await fetch('https://cdn.jsdelivr.net/gh/stevicamp/Stevicamp/resources/db/database.json?1', { cache: "reload" })
//         // var jsDb = await fetch('https://raw.githubusercontent.com/stevicamp/Stevicamp/33894efc327a4fe0c3543e46c854a65b413edf74/resources/db/database.json?2', { cache: "reload" })
//         // var jsDb = await fetch('https://raw.githubusercontent.com/stevicamp/Stevicamp/refs/heads/main/resources/db/database.json',

//         // https://corsproxy.io/?url=https://example.com
//         // var jsDb = await fetch('https://corsproxy.io/?url=https://raw.githubusercontent.com/stevicamp/Stevicamp/refs/heads/main/resources/db/database.json', 
//         //     {
//         //         method: "GET", 
//         //         headers: {"cache": "reload", "Pragma": "no-cache", "Expires": '-1',"Cache-Control": "no-store, no-cache, max-age=0"}
//         //     })

//         // var jsDb = await fetch('https://raw.githubusercontent.com/stevicamp/Stevicamp/refs/heads/main/resources/db/database.json',{cache: "no-store"})
//         var jsDb = await fetch('https://raw.githubusercontent.com/stevicamp/Stevicamp/refs/heads/main/resources/db/database.json',{cache: "no-store"})
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 return response.json(); // Probably here it parses the json to js object, so we dont need to use JSON.parse();
//             })
//             .catch(error => {
//                 console.error('Fetch error:', error);
//             });

//         base_db = jsDb;

//         console.log(jsDb);
//         return jsDb;
//     }
//     else {
//         return base_db;
//     }
// }




// ############## HTML LAYOUT - Toggle Bars & LoadBars state from local storage #################################################################################################
loadMainBarsState();


// FUNCTIONS --------------------------------------------------------------------------------------------------

// TOGGLE BARS ========================================================================================
function toggleBars(e) {
    let current = e.currentTarget;
    let currentBar = document.getElementById(current.value); // The toggler buttons have assigned value for the specific bar they need to toggle ex. toggler value for topbar is value="top-bar", the toggler id is id="top-bar-toggler" than later evt. you can use the value "top-bar"+"toggler" to get the toggler, but in this case we just pass it to the next funktion to use it insteat of doing getElement

    if (currentBar.style.display === 'none') {
        currentBar.style.display = 'block';
        localStorage.setItem(currentBar.id, 'block'); // Save bar state to local storage 
    }
    else {
        currentBar.style.display = 'none';
        localStorage.setItem(currentBar.id, 'none'); // Save bar state to local storage 
    }

    // changeToggleBarIcon(current.value);
    changeTogglerIcon(current);
}




// Change Togglebar Icon ==========================================================================================
function changeTogglerIcon(toggler) {
    // let barToggler = document.getElementById(bar+"-toggler").children[0]; // Get the toggler 
    let barTogglerText = toggler.children[0]; // Get the toggler text, which is the first child the arrow text ">>" 

    if (barTogglerText.innerHTML == "‹‹") {
        barTogglerText.innerHTML = "››";
    }
    else {
        barTogglerText.innerHTML = "‹‹";
    }
}





// SCROLLING HORIZONTALY - USED IN TOP / BOTTOM BAR =================================================================
scrollHorizontal = (e) => {
    // e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
}





// LOCAL STORAGE :: START::
// Load Bar State from local storage  ===============================================================================
function loadBarState(barId) {
    let currentBar = document.getElementById(barId);
    let currentBarLStorageState = localStorage.getItem(barId);

    if (currentBarLStorageState !== null) {
        currentBar.style.display = currentBarLStorageState;

        if (currentBarLStorageState == 'none') {
            changeTogglerIcon(document.getElementById(barId + "-toggler")); // Change toggler arrows
        }
    }
}






// LOAD ALL BARS STATE - FROM LOCAL STORAGE - On Page Load ==========================================================
function loadMainBarsState() {
    loadBarState("left-bar");
    loadBarState("right-bar");
    loadBarState("top-bar");
    loadBarState("bottom-bar");
}
// LOCAL STORAGE :: END::






// ####### HTML LAYOUT - Event Listeners ###########################################################################
// "TopBar, BottomBar, LeftBar, RightBar, Arrows for opening and clising the bars" 
// LEFTBAR-TOGGLE-BTN
document.getElementById('left-bar-toggler').addEventListener("click", toggleBars);

//RIGHTBAR-TOGGLE-BTN
document.getElementById('right-bar-toggler').addEventListener("click", toggleBars);

//TOPBAR-TOGGLE-BTN
document.getElementById('top-bar-toggler').addEventListener("click", toggleBars);

//BOTTOMBAR-TOGGLE-BTN
document.getElementById('bottom-bar-toggler').addEventListener("click", toggleBars);


// TOPBAR
document.getElementById('top-bar-wrapper').addEventListener("wheel", scrollHorizontal, { passive: true });

// BOTTOMBAR
document.getElementById('bottom-bar-wrapper').addEventListener("wheel", scrollHorizontal, { passive: true });



// Search Input eventlistener
document.getElementById('global-search-input').addEventListener("input", searchItems);

document.getElementById('current-items-search-input').addEventListener("input", searchItems);



window.addEventListener("load", checkForSearchKeywords);

document.getElementById('modalWindow').addEventListener("click", e => { closeItemModal(e) }); // Close modal // fun to prevent on click childs to lo


// document.getElementById('modalContentContainer').addEventListener("click", (e)=> { e.stopPropagation();});

window.addEventListener('popstate', closeItemModalOnPopState);


// Translate -----------------------------------------------------------
document.getElementById('translate').addEventListener("click", initTranlate);




// Listen for keypress ..............................................................................
document.body.addEventListener('keydown', async function (e) {
    e = e || window.event;

    let modal = document.getElementById("modalWindow");
    if (e.key === "ArrowLeft" && modal.style.display == "flex") // Change image prev
    {
        await toggleSlideImg(-1); // Change img 
        document.activeElement.blur();
    }
    else if (e.key === "ArrowRight" && modal.style.display == "flex") // Change image next
    {
        await toggleSlideImg(1); // Change img
        document.activeElement.blur();
    }
    else if (e.key === "ArrowUp" && modal.style.display == "flex") // Scroll up item details with arrow up
    {

        let itemDetailsContainer = document.getElementsByClassName("modalItemDetails")[0];
        itemDetailsContainer.focus();
    }
    else if (e.key === "ArrowDown" && modal.style.display == "flex") // Scroll down item details with arrow down
    {
        let itemDetailsContainer = document.getElementsByClassName("modalItemDetails")[0];
        itemDetailsContainer.focus();
    }
    else if (e.key === "Tab" && modal.style.display == "flex") // Tab only modal when it is opened
    {
        let modalItemContainer = document.getElementsByClassName("modalItemContainer")[0];

        if (!modalItemContainer.contains(e.target)) {
            modalItemContainer.focus();
        }
    }
});



// function keyPress(e) {

// }
// document.addEventListener("keypress", checkKeypress(e));

// function checkKeypress(e)
// {
//     e = e || window.event;

//     if(e.keyCode === 9)
//     {
//       alert("tab");
//     }
// }




// // Modal focus always
// document.getElementById('modalItemContainer').addEventListener('focusout', function(e) 
// {
//     // let modalItemContainer = document.getElementById('modalItemContainer');
//     // // event.stopPropagation();
//     // // if (modal.contains(event.relatedTarget)) {  // if focus moved to another 

//     // // // modal.parentElement.tabIndex = -1;

//     // //     return;
//     // // }

//     // modalItemContainer.tabIndex = 1;
//     // modal.focus();  // otherwise focus on parent or change to another dom

// });



// ####### Copy to clipboard share link ###########################################################################
function copyToClipboard(str) {

    window.navigator.clipboard.writeText(str);
}


// Copy element textnode ....................................
function copyElementTextById(id) {
    let element = document.getElementById(id);
    return element.textContent;
}


// ----- MODAL ---------------------------------------------------------------------------------------------------------

// The Item Modal - the modal that shows the selected item -------------------------------
async function itemModalNavigation(itemId) {
    prevUrl = window.location.href; // Used in closeItemModal so to return to original adress and have it in the history so to navigate with the browser buttons back forth
    showModal(itemId);
    // document.getElementById('overlayImg').src = window[imgName]; // Static img Tag

    window.history.pushState({}, "", `?search=${itemId}`);
}



// COMMON ........................................................
// Share buttons for the current item in the modal -----------------------------------------------------------------------------------
function modalItemShareButtonsHtml(itemLink, title) {
    return `<div style="display:inline-block; position: absolute; bottom: 0; left:0; right:0; margin-inline: auto; 
                        min-width: 100%; text-align:center; background-color: transparent;"> 

     <a class="item_share_button" style="background-image: url('static/img/icons/copy.png');" href="javascript:copyToClipboard('${itemLink}');" title="Натиснете за да Копирате линка"></a>
     <a class="item_share_button" style="background-image: url('static/img/icons/viber.png');"href="viber://forward?text=${itemLink}" title="Споделете във Вибър"></a>
     <a class="item_share_button" style="background-image: url('static/img/icons/whatsapp.png');" target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?text=${itemLink}" title="Споделете в Уатсап"></a>
     <a class="item_share_button" style="background-image: url('static/img/icons/messenger.png');" href="fb-messenger://share/?link=${itemLink}" title="Споделете в Месинджър"></a>
     <a class="item_share_button" style="background-image: url('static/img/icons/email.png');" href="mailto:?subject=${title}&amp;body=${title},${itemLink}" title="Пратете по имейл"></a>
     <a class="item_share_button" style="background-image: url('static/img/icons/sms.png');" href="sms:?&body=${title},${itemLink}" title="Пратете по СМС"></a>
     <a class="item_share_button" style="background-image: url('static/img/icons/delete.png');" href="javascript:deleteItemByItemLink('${itemLink}');" title="Изтриване!!!"></a>
     <a class="item_share_button" style="background-image: url('static/img/icons/edit.png');" href='/Edit?${itemLink.split('?search=')[1]}' data-link title="Редактиране!"></a>
     
    <span style="float:right; margin-right:2%; margin-top: 10px;" id="imgCount"></span>
    </div>`;
}



// The image slide arrow buttons
function imgSlideArrowButtons() {
    return `<button id="arrow-leftSlideImg" class="arrow-left prevent-select">&#10094;</button>
    <button id="arrow-rightSlideImg" class="arrow-right prevent-select">&#10095;</button> `;
}

// Phone number and viber number --------------------------------------------------------------------------
function phoneViberNumberInfoHtml(phone, viberPhone) {
    return ` <span title="Натиснете за да звъннете по телефона"><a href="tel:${phone}"><img src="static/img/icons/phone.png"><font size="2"><b>Тел: </b><u>${phone}</u></font></a></span>
    <span title="Натиснете за да пишете на Вайбър"><a href="viber://chat?number=%2B${viberPhone}"><img src="static/img/icons/viber.png"><font size="2"><b>Вайбър: </b>+<u>${viberPhone}</u></font></a></span>
`;
}


function htmlItemSold(item) {
    if (item.sold == "true") {
        return `<hr><span><b><font size="6"><i class="red">Продадено</i></font></b></span>`;
    }
    else {
        return ``;
    }
}


// Base HTML For caravans -----------------------------------------------------------------------
async function caravansHtmlTemplate(obj) {
    let db = await getDbAsync();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
        // if(h == 0) // If first image make visible
        // {
        //     imgagesHtml += `<img class="slide" style="display:flex;" src='${obj.photos[h]}'>`;
        // }
        // else
        // {
        //     imgagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
        // }
    }
    // need to add script for getting all images and generating html code because there is no fixed amount of images can be more can be less every time
    return `<div class="modalItemContainer" tabindex="0">


   <div class="img-preview-container">
       ${imagesHtml}

      ${imgSlideArrowButtons()} 
       
        ${modalItemShareButtonsHtml(itemLink, obj.title)} 
   
    </div>
  
   
    
   <div id="modalItemDetails" class="modalItemDetails" tabindex="0">
   
   <h3 class="item-title">
   <img src="static/img/icons/caravan.png"><u>${obj.title}</u></h3> 
   <span style="margin: 0 0 0 auto;"><a class="item_share_button" href="javascript: copyToClipboard(copyElementTextById('modalItemDetails'));" title="Натиснете за да Копирате описанието"><img src="static/img/icons/copy.png"></a></span>
       <hr> 
       ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}
       
        ${htmlItemSold(obj)}
       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/ruler.png"><b>Дължина:</b> ${obj.length}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/toilet.png"><b>Тоалетна:</b> ${obj.toilet}</span>
       <hr>
       <span><img src="static/img/icons/bath.png"><b>Баня:</b> ${obj.bath}</span>
       <hr>
       <span><img src="static/img/icons/heater.png"><b>Отопление:</b> ${obj.heating}</span>
       <hr> 
       <span><img src="static/img/icons/hotplates.png"><b>Котлони:</b> ${obj.hotplates}</span>
       <hr>
       <span><img src="static/img/icons/stove.png"><b>Печка:</b> ${obj.stove}</span>
       <hr>
       <span><img src="static/img/icons/boiler.png"><b>Боийлер:</b> ${obj.boiler}</span>
       <hr>
       <span><img src="static/img/icons/electricity.png"><b>Ток:</b> ${obj.electricity}</span>
       <hr>
       <span><img src="static/img/icons/battery.png"><b>Акумулатор:</b> ${obj.battery}</span>
       <hr>
       <span><img src="static/img/icons/solar-panel.png"><b>Солар:</b> ${obj.solar}</span>
       <hr>
       <span><img src="static/img/icons/mover.png"><b>Мувер:</b> ${obj.mover}</span>
       <hr>
       <span><img src="static/img/icons/water-inlet.png"><b>Тв. врз. вода:</b> ${obj.waterInlet}</span>
       <hr>
       <span><img src="static/img/icons/water-container.png"><b>Съд за вода:</b> ${obj.waterContainer}</span>
       <hr>
       <span><img src="static/img/icons/snowflake.png"><b>АС/Климатик:</b> ${obj.ac}</span>
       <hr>
       <span><img src="static/img/icons/bed.png"><b>Спални места:</b> ${obj.sleepingPlaces}</span>
       <hr>
       <span><img src="static/img/icons/tent.png"><b>Форселт:</b> ${obj.fortelt}</span>
       <hr>
       <span><img src="static/img/icons/markise.png"><b>Маркиза:</b> ${obj.markise}</span>
       <hr>
       <span><img src="static/img/icons/documents.png"><b>Документи:</b> ${obj.documents}</span>
       <hr>
       <span><img src="static/img/icons/plate.png"><b>Номер:</b> ${obj.plate}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr> 
   </div>
</div>`;
}







// Base HTML For cars -----------------------------------------------------------------------
async function carsHtmlTemplate(obj) {
    let db = await getDbAsync();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }

    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       ${imgSlideArrowButtons()} 
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div id="modalItemDetails" class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/car.png"><u>${obj.title}</u></h3>
   <span style="margin: 0 0 0 auto;"><a class="item_share_button" href="javascript: copyToClipboard(copyElementTextById('modalItemDetails'));" title="Натиснете за да Копирате описанието"><img src="static/img/icons/copy.png"></a></span>  
    <hr> 
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

        ${htmlItemSold(obj)}
       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/kind.png"><b>Тип:</b> ${obj.kind}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/engine.png"><b>Двигател:</b> ${obj.engine}; ${obj.hp}</span>
       <hr>
       <span><img src="static/img/icons/km.png"><b>Пробег:</b> ${obj.km}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/parctronic.png"><b>Парктроник:</b> ${obj.parktronic}</span>
       <hr>
       <span><img src="static/img/icons/gears.png"><b>Скорости:</b> ${obj.gears}</span>
       <hr>
       <span><img src="static/img/icons/car-door.png"><b>Врати:</b> ${obj.doors}</span>
       <hr>
       <span><img src="static/img/icons/particlefilter.png"><b>Партикфилтър:</b> ${obj.particulateFilter}</span>
       <hr>
       <span><img src="static/img/icons/snowflake.png"><b>АС/Климатик:</b> ${obj.ac}</span>
       <hr>
       <span><img src="static/img/icons/tow.png"><b>Теглич:</b> ${obj.tow}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>ГПС:</b> ${obj.gps}</span>
       <hr>
       <span><img src="static/img/icons/car-seat.png"><b>Места:</b> ${obj.seats}</span>
       <hr>
       <span><img src="static/img/icons/type.png"><b>Вид:</b> ${obj.type}</span>
       <hr>
       <span><img src="static/img/icons/documents.png"><b>Документи:</b> ${obj.documents}</span>
       <hr>
       <span><img src="static/img/icons/plate.png"><b>Номер:</b> ${obj.plate}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr> 
   </div>
</div>`;
}



// Base HTML For microbuses -----------------------------------------------------------------------
async function microbusHtmlTemplate(obj) {
    let db = await getDbAsync();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }

    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

      ${imgSlideArrowButtons()} 
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div id="modalItemDetails" class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/microbus.png"><u>${obj.title}</u></h3>
   <span style="margin: 0 0 0 auto;"><a class="item_share_button" href="javascript: copyToClipboard(copyElementTextById('modalItemDetails'));" title="Натиснете за да Копирате описанието"><img src="static/img/icons/copy.png"></a></span>  
       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

        ${htmlItemSold(obj)}
       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/engine.png"><b>Двигател:</b> ${obj.engine}; ${obj.hp}</span>
       <hr>
       <span><img src="static/img/icons/km.png"><b>Пробег:</b> ${obj.km}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/ruler.png"><b>Размер:</b> ${obj.size}</span>
       <hr>
       <span><img src="static/img/icons/parctronic.png"><b>Парктроник:</b> ${obj.parktronic}</span>
       <hr>
       <span><img src="static/img/icons/gears.png"><b>Скорости:</b> ${obj.gears}</span>
       <hr>
       <span><img src="static/img/icons/car-door.png"><b>Врати:</b> ${obj.doors}</span>
       <hr>
       <span><img src="static/img/icons/particlefilter.png"><b>Партикфилтър:</b> ${obj.particulateFilter}</span>
       <hr>
       <span><img src="static/img/icons/snowflake.png"><b>АС/Климатик:</b> ${obj.ac}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>ГПС:</b> ${obj.gps}</span>
       <hr>
       <span><img src="static/img/icons/car-seat.png"><b>Места:</b> ${obj.seats}</span>
       <hr>
       <span><img src="static/img/icons/type.png"><b>Тип:</b> ${obj.type}</span>
       <hr>
       <span><img src="static/img/icons/tow.png"><b>Теглич:</b> ${obj.tow}</span>
       <hr>
       <span><img src="static/img/icons/load.png"><b>Товарене:</b> ${obj.loading}</span>
       <hr>
       <span><img src="static/img/icons/documents.png"><b>Документи:</b> ${obj.documents}</span>
       <hr>
       <span><img src="static/img/icons/plate.png"><b>Номер:</b> ${obj.plate}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span> 
       <hr>
   </div>
</div>`;
}




// Base HTML For scooters -----------------------------------------------------------------------
async function scootersHtmlTemplate(obj) {
    let db = await getDbAsync();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }

    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       ${imgSlideArrowButtons()} 
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div id="modalItemDetails" class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/scooter.png"><u>${obj.title}</u></h3>
   <span style="margin: 0 0 0 auto;"><a class="item_share_button" href="javascript: copyToClipboard(copyElementTextById('modalItemDetails'));" title="Натиснете за да Копирате описанието"><img src="static/img/icons/copy.png"></a></span>  
       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

        ${htmlItemSold(obj)}
       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/wheel.png"><b>Колела:</b> ${obj.wheels}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span> 
       <hr>
       <span><img src="static/img/icons/km.png"><b>Пробег:</b> ${obj.km}</span>
       <hr>
       <span><img src="static/img/icons/fuel.png"><b>Гориво:</b> ${obj.fuel}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span> 
       <hr>   
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr> 
   </div>
</div>`;
}



// Base HTML For trailers -----------------------------------------------------------------------
async function trailersHtmlTemplate(obj) {
    let db = await getDbAsync();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }

    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

      ${imgSlideArrowButtons()}  
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div id="modalItemDetails" class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/trailer.png"><u>${obj.title}</u></h3>
   <span style="margin: 0 0 0 auto;"><a class="item_share_button" href="javascript: copyToClipboard(copyElementTextById('modalItemDetails'));" title="Натиснете за да Копирате описанието"><img src="static/img/icons/copy.png"></a></span>  
       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

        ${htmlItemSold(obj)}

       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr> 
       <span><img src="static/img/icons/axle.png"><b>Оси:</b> ${obj.axles}</span>
       <hr>
       <span><img src="static/img/icons/ruler.png"><b>Размер:</b> ${obj.size}</span>
       <hr>
       <span><img src="static/img/icons/load.png"><b>Товарене:</b> ${obj.loading}</span>
       <hr>
       <span><img src="static/img/icons/documents.png"><b>Документи:</b> ${obj.documents}</span>
       <hr>
       <span><img src="static/img/icons/plate.png"><b>Номер:</b> ${obj.plate}</span>
       <hr>
       <span><img src="static/img/icons/kind.png"><b>Тип:</b> ${obj.type}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange">  
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr> 
   </div>
</div>`;
}





// Base HTML For Tyres -----------------------------------------------------------------------
async function wheelsHtmlTemplate(obj) {
    let db = await getDbAsync();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }

    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       ${imgSlideArrowButtons()}  
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div id="modalItemDetails" class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/wheel.png"><u>${obj.title}</u></h3>
   <span style="margin: 0 0 0 auto;"><a class="item_share_button" href="javascript: copyToClipboard(copyElementTextById('modalItemDetails'));" title="Натиснете за да Копирате описанието"><img src="static/img/icons/copy.png"></a></span>  

       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

        ${htmlItemSold(obj)}

       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/ruler.png"><b>Мярка:</b> ${obj.measure}</span>
       <hr>
       <span><img src="static/img/icons/wheel.png"><b>Големина:</b> ${obj.size}</span>
       <hr>
       <span><img src="static/img/icons/et.png"><b>ET:</b> ${obj.et}</span>
       <hr> 
       <span><img src="static/img/icons/bolt-holes.png"><b>Разс. на Болт.:</b> ${obj.boltHoles}</span>
       <hr>
       <span><img src="static/img/icons/center-hole.png"><b>Център:</b> ${obj.centerHole}</span>
       <hr>
       <span><img src="static/img/icons/tread.png"><b>Грайфер:</b> ${obj.tread}</span>
       <hr>
       <span><img src="static/img/icons/seasson.png"><b>Сезон:</b> ${obj.seasson}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/wheels-type.png"><b>Вид:</b> ${obj.type}</span>
       <hr>
       <span><img src="static/img/icons/wheels.png"><b>Брой:</b> ${obj.pcs}</span>
       <hr>
       <span><img src="static/img/icons/car.png"><b>От/За:</b> ${obj.fromCar}</span>
       <hr>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr> 
   </div>
</div>`;
}




// Base HTML For products -----------------------------------------------------------------------
async function productsHtmlTemplate(obj) {
    let db = await getDbAsync();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }

    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       ${imgSlideArrowButtons()} 
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div id="modalItemDetails" class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/boxes.png"><u>${obj.title}</u></h3>
   <span style="margin: 0 0 0 auto;"><a class="item_share_button" href="javascript: copyToClipboard(copyElementTextById('modalItemDetails'));" title="Натиснете за да Копирате описанието"><img src="static/img/icons/copy.png"></a></span>  

       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

        ${htmlItemSold(obj)}

       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/ruler.png"><b>Размер:</b> ${obj.size}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr>
   </div>
</div>`;
}






// Base HTML For equipment -----------------------------------------------------------------------
async function equipmentHtmlTemplate(obj) {
    let db = await getDbAsync();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }

    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

       ${imgSlideArrowButtons()} 
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div id="modalItemDetails" class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/reol.png"><u>${obj.title}</u></h3>

   <span style="margin: 0 0 0 auto;"><a class="item_share_button" href="javascript: copyToClipboard(copyElementTextById('modalItemDetails'));" title="Натиснете за да Копирате описанието"><img src="static/img/icons/copy.png"></a></span>  

       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

        ${htmlItemSold(obj)}

       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/ruler.png"><b>Размер:</b> ${obj.size}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span> 
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr>
   </div>
</div>`;
}



// Base HTML For appliances -----------------------------------------------------------------------
async function appliancesHtmlTemplate(obj) {
    let db = await getDbAsync();
    let imagesHtml = "";
    let itemLink = window.location.host + '?search=' + obj.id; // Construct the link for the current item

    for (let h = 0; h < obj.photos.length; h++) // To handle the images, dynamic range there could be 1 or 3 or 10 etc. There is no fixed number of images
    {
        imagesHtml += `<img class="slide" src='${obj.photos[h]}'>`;
    }

    return `<div class="modalItemContainer" tabindex="0">

   <div class="img-preview-container">
       ${imagesHtml}

      ${imgSlideArrowButtons()}
       
       ${modalItemShareButtonsHtml(itemLink, obj.title)}
    </div>
  
   
     
   <div id="modalItemDetails" class="modalItemDetails" tabindex="0">
   <h3 class="item-title"><img src="static/img/icons/appliances.png"><u>${obj.title}</u></h3>
   <span style="margin: 0 0 0 auto;"><a class="item_share_button" href="javascript: copyToClipboard(copyElementTextById('modalItemDetails'));" title="Натиснете за да Копирате описанието"><img src="static/img/icons/copy.png"></a></span>  

       <hr>
      
        ${phoneViberNumberInfoHtml(db.phone, db.viberPhone)}

        ${htmlItemSold(obj)}

       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> ${obj.price}</span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> ${obj.brand}</span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> ${obj.model}</span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> ${obj.year}</span>
       <hr>
       <span><img src="static/img/icons/kind.png"><b>Тип:</b> ${obj.type}</span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> ${obj.condition}</span>
       <hr>
       <span><img src="static/img/icons/ruler.png"><b>Размер:</b> ${obj.size}</span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> ${obj.location}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> ${obj.description}</span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">${obj.id}</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"> ${obj.keywords}</span>
       <hr>
   </div>
</div>`;
}




// ### MODAL ### --------------------------------------------------------------------------------------------------------------
async function showModal(itemId) // Show modal is used so when navigating trough the back forward buttons to only show the modal and not push state differnt paths - other wise it does not work
{
    let db = await getDbAsync(); // Get the singleton db
    let rawItem = await recursiveSearchObj(db.items, itemId); // Search and get the matched item // Consider seperate search for the modal to search only in id keys for eventually better performance
    let item = Object.values(rawItem)[0][0];

    // window.history.replaceState( {} , "title", `?search=${item.id}`);
    let generatedItemHtml = '';
    if (item.category == "caravans") // If Caravan
    {
        generatedItemHtml = await caravansHtmlTemplate(item);
    }
    else if (item.category == "cars") // If Car
    {
        generatedItemHtml = await carsHtmlTemplate(item);
    }
    else if (item.category == "microbuses") {
        generatedItemHtml = await microbusHtmlTemplate(item);
    }
    else if (item.category == "trailers") {
        generatedItemHtml = await trailersHtmlTemplate(item);
    }
    else if (item.category == "products") {
        generatedItemHtml = await productsHtmlTemplate(item);
    }
    else if (item.category == "equipment") {
        generatedItemHtml = await equipmentHtmlTemplate(item);
    }
    else if (item.category == "scooters") {
        generatedItemHtml = await scootersHtmlTemplate(item);
    }
    else if (item.category == "wheels") {
        generatedItemHtml = await wheelsHtmlTemplate(item);
    }
    else if (item.category == "appliances") {
        generatedItemHtml = await appliancesHtmlTemplate(item);
    }

    let modal = document.getElementById("modalWindow");
    // modal.innerHTML = 
    modal.innerHTML = `<div class="modalContentContainer">${generatedItemHtml}</div>`;
    modal.style.display = 'flex'; // Show modal 
    // modal.tabIndex = 1;
    // modal.focus();
    await toggleSlideImg(0);

    document.getElementById("app").style.overflow = "hidden"; // hide the overflow for the app container so it is not triggered while the modal is open

    document.getElementById('arrow-leftSlideImg')?.addEventListener('click', async () => { await toggleSlideImg(-1) }); // The img slide left button
    document.getElementById('arrow-rightSlideImg')?.addEventListener('click', async () => { await toggleSlideImg(1) }); // The img slide right button

}





async function closeItemModal(e) {
    if (e.target !== e.currentTarget) { return; } // If child is clicked dont close the modal

    let modal = document.getElementById("modalWindow");
    modal.style.display = 'none';

    history.pushState({}, "", prevUrl); // Push the prev url so it can be retrived by using back and forward buutosn on the browser
    // window.history.back();
    // window.history.replaceState({} , '', `${prevUrl}` );
    // prevUrl ="";
    // history.go(-1);
    slideImgIndex = 0; // Reset the image tab index on modal close
    document.getElementById("app").style.overflowY = "auto"; // Reset the overflow for the app, so it can be scrolled

    removeViewSessionElements();
}


function closeItemModalOnPopState() // Close the modal on prev forward button
{
    // slideImgIndex = 0; // Reset the index for the images preview container
    popStateUrl = true;
    prevUrl = window.location.href; // For the modal to get the prev url

    let modal = document.getElementById("modalWindow");
    modal.style.display = 'none';
    removeViewSessionElements();
}




// Swipe for the Modal images ......................................................................
let touchstartX = 0
let touchendX = 0

async function checkDirection() {
    // Left .....................
    if (touchendX < touchstartX && (touchstartX - touchendX) > 50) {
        await toggleSlideImg(-1);
    }
    else if (touchendX > touchstartX && (touchendX - touchstartX) > 50) // Right ..................
    {
        await toggleSlideImg(1);
    }

}




document.getElementById('modalWindow').addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

document.getElementById('modalWindow').addEventListener('touchend', async (e) => {
    touchendX = e.changedTouches[0].screenX;
    await checkDirection();
});





// document.getElementById('modalWindow').addEventListener('swiped-left', function(e) {
//     // console.log(e.target); // the element that was swiped
//     checkDirection(-1);
// });


// document.addEventListener('swiped-left', function(e) {
//     // console.log(e.target); // the element that was swiped
//     checkDirection(-1);
// });



// document.addEventListener('swiped-right', function(e) {
//     // console.log(e.target); // the element that was swiped
//     checkDirection(1);
// });



// Changing images in modal ------------------------------------------------------------------------
var slideImgIndex = 0; // Hold track of the current img index - showed image

async function toggleSlideImg(n) {

    let images = document.getElementsByClassName("slide"); // Get the images

    if (images.length !== 0) // If there are no images in the image container / the slide then do not execute the code since there is no image and error comes up
    {
        if (images.length !== 1) {

            if (images[slideImgIndex].style.display !== undefined) // If deleting image the image is deleted and can not be hidden
            {
                images[slideImgIndex].style.display = "none"; // Hide the image
            }

            if (images.length - 1 == slideImgIndex && n !== -1)  // If Last image and is not back button
            {
                slideImgIndex = -1;
            }
            else if (slideImgIndex == 0 && n == -1)// If Back button and reached the first image go to the last
            {
                slideImgIndex = images.length;
            }

            images[slideImgIndex + n].style.display = "block"; // Show img n can be -1
            slideImgIndex += n; // n can be -1
            // alert(images.length + "-" + slideImgIndex);
        }
        else {
            images[0].style.display = "block"; // Show first image wich is also the last because there is only 1
        }

        // document.getElementById("imgCount").innerHTML = `${slideImgIndex + 1}/${images.length}`; // Change the image count value that is shown over the image the span
    }
    // if(images.length == 0) // Used for the image count indicator for the user where the user can see how many images there ar in total and the current viewing image // If there are 0 images then sho 0/0
    // {
    //   document.getElementById("imgCount").innerHTML = '0/0'; // Show 0/0 when no image
    // }
    updateViewImageIndexIndication();


    if (window.location.pathname == "/Add" || window.location.pathname == "/Edit") // Only in Add or Edit View otherwise can not find the fields undefined
    {
        resetImgCompressionFields(); // Reset the fields and the rotation variable on img change
        await executeCompression(imgCompressionSizeGlobal, imgCompressionExtensionGlobal, false, false);
    }

}

function updateViewImageIndexIndication() {
    let images = document.getElementsByClassName("slide"); // Get the images
    if (images.length !== 0) // Used for the image count indicator for the user where the user can see how many images there ar in total and the current viewing image // If there are 0 images then sho 0/0
    {
        document.getElementById("imgCount").innerHTML = `${slideImgIndex + 1}/${images.length}`; // Change the image count value that is shown over the image the span 
    }
    else {
        document.getElementById("imgCount").innerHTML = '0/0'; // Show 0/0 when no image
    }
}

// Navigate to the specific image in the slide
function imgSlideNavigation(index) // Not working to navigate to specific image - only on initial load & after delete
{
    let images = document.getElementsByClassName("slide"); // Get the images from the slide the generated html images in the slide
    // slideImgIndex = index;
    if (images.length !== 0) {
        if (images.length > index) {
            // images[index-1].style.display = "none"; // Hide the image
            images[index].style.display = "block"; // Show img n can be -1
            // slideImgIndex = slideImgIndex-1;
        }
        // else if(images.length == index && images.length !== 0)
        // {
        //     images[index-1].style.display = "block"; // Show img n can be -1
        // }
        // else if(images.length == index)
        // {
        //     images[index-1].style.display = "block"; // Show img n can be -1
        // }
        // else
        // {
        //     images[index-1].style.display = "block"; // Show img n can be -1
        // }

        // slideImgIndex = slideImgIndex-1;
    }

    // console.log('index:' + index);
    // console.log('slideImgIndex' + slideImgIndex);
}



function removeViewSessionElements() {
    removeElementsByClassName('slide'); // Remove image elements of specific item on close modal
    // document.getElementById("imgCount")?.remove(); // Remove image count element of specific item on close modal

    document.getElementsByClassName("img-preview-container")[0]?.remove(); // Remove Remove the element so that it is reseted in the next view

    slideImgIndex = 0; // So that the imgCount is not lagging - otherwise there is a bug. When opening the item going to second image, then edit and the count shows img 2, but is viewing img on in the edit mode
    editItemImgArr.length = 0; // Reset the array so that nothing from other view be in it. Otherwise there is a problem with micing thr view and Add view img preview container
}

// Used to remove image elements so the about slide can work - otherwise it interfers - this is used on close modal
function removeElementsByClassName(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) elements[0].remove();
}



async function checkForSearchKeywords() // Check for keywords in the adressbar also used for the modal
{
    const search = decodeURI(window.location.search);

    // If search keywords in the path
    if (search !== "") {

        if (search.match("id_")) // If id_ then open modal
        {
            const itemId = search.split('?search=')[1]; // If it includes id_ than after the search is the id including id_ it is part of every id 
            await showModal(itemId);
        }

        const searchKeyword = search.split('?search=')[1];
        let e = { "currentTarget": { "value": `${searchKeyword}`, "id": "searchKeywordFromUrl" } } // Mimic the pattern that the search function accepts
        await searchItems(e);

    }
}

// async function constructItemsListAllTypes() // Item list with 
// {
//     db = await getDbAsync(); // The singleton Database - fetch if not already fetched - it is in the other file 

//     let allDbItems = [];
//     for (let i = 0; i < Object.keys(db).length; i++) 
//     {
//         for (let a = 0; i <  db[i].length; a++) 
//         {
//             allDbItems.push(db[i][a]);
//         } 
//     }
// // Object.values(person);
//     return allDbItems;
// }



// Get available Db types - cars, caravans, products etc. 
async function getAvailableDbTypes() {
    let db = await getDbAsync();
    let availableDbTypes = Object.keys(db.items);

    return availableDbTypes; // AllDbTypes - cars, caravans, products as strings
}


// Check if the route - the url ending is caravans, cars, products etc. 
// If it is unknouns like index.html or asdfd or something that is not found in the db as product return false
// async function checkRouteWithDbTypes(itemType) 
// {
//     let availableDbTypes = getAvailableDbTypes();
//     for (let i = 0; i < availableDbTypes.length; i++) 
//     {
//        if(itemType == aviableDbTypes[i])
//        {
//         return true;
//        }
//     }
//     return false;
// }



// Get Items - Construct html items
async function getItems(itemType, itemsList)  // ItemType = car, caravan, products etc.
{
    let db = await getDbAsync();

    // if(!Object.hasOwn(db, `${itemType}`) && itemsList !== undefined) // If there is no such item type in the db and if items list is empty. This may mean no search result in home vire search
    // {
    //     itemsList
    // }
    if (itemsList == null && Object.hasOwn(db.items, `${itemType}`)) // If there is no provided item list but only type and if the type is found in the db
    {
        itemsList = { [`${itemType}`]: db.items[`${itemType}`] } // Get the itemList from the Db by using the known type that is provided and use the type as key entry for the list
    }
    else if (!Object.hasOwn(db.items, `${itemType}`) && itemsList == undefined) // If the item type is not found in the db and if there is no provided items list
    // If Home - In Home search all items - Or If it is unknown itemType - known item types are caravans, cars, products etc. 
    //Unknoun are any other string that is not found in the db as item. This item type is gotten from the url, the url can end /Caravans, /Cars etc. unknown /ssdfsdfsdf etc.
    {
        // itemsList = Object.entries(db).map(); // Get All items from the different types in 1 list  
        // itemsList = Object.entries(db).map(([key, value]) => {[key],[value]});
        itemsList = db.items;
    }
    // else
    // {
    //     itemsList = itemsList; 
    //     itemsList = db;
    // }



    // Use of string for better performance instead of using .innerHTML += 
    var combined_items = ''; // Holder of the items, that are constructed and put in this variable
    var itemLink = ''; // Holder for the constructing of a link for every item 

    for (let g = 0; g < Object.keys(itemsList).length; g++) {
        itemType = Object.keys(itemsList)[g];


        // // Object.keys(db)[0];
        // // Object.keys(obj).length

        // <div onmousedown="itemModal('')"></div>

        for (let i = 0; i < itemsList[`${itemType}`].length; i++) {
            itemLink = window.location.host + '?search=' + itemsList[`${itemType}`][i].id; // Construct the link for the current item // ItemsType is for the item type. caravan, car etc.

            // For every iteration there is constructed item an put in the variable "combined_items".
            combined_items += (`<div class="content_container_item">
         <a href="javascript:itemModalNavigation('${itemsList[`${itemType}`][i].id}');">
             <img class="item_img" src="${itemsList[`${itemType}`][i].photos[0]}"> </img>
             <p>${itemsList[`${itemType}`][i].title}</p>
         </a>
       
         <span class="price">${itemsList[`${itemType}`][i].price}</span>
         

         <div class="item_buttons_wrapper"> 
             <a class="item_share_button" style="background-image: url('static/img/icons/copy.png');" href="javascript:copyToClipboard('${itemLink}');"></a>
             <a class="item_share_button" style="background-image: url('static/img/icons/viber.png');"
                 href="viber://forward?text=${itemLink}"></a>
             <a class="item_share_button" style="background-image: url('static/img/icons/whatsapp.png');"
             target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?text=${itemLink}"></a>
             <a class="item_share_button" style="background-image: url('static/img/icons/messenger.png');"
                 href="fb-messenger://share/?link=${itemLink}"></a>
         </div>
        
         <a class="item_share_button" style="background-image: url('static/img/icons/delete.png'); margin-top: 20px;" href="javascript:deleteItemByItemLink('${itemLink}');" title="Изтриване!!!"></a>
         <a class="item_share_button" style="background-image: url('static/img/icons/edit.png'); margin-top: 20px;" href='/Edit?${itemsList[`${itemType}`][i].id}' data-link title="Редактиране"></a>
 
                      </div>`);

        }
    }

    return combined_items;
}

//  <a class="item_share_button" style="background-image: url('static/img/icons/edit.png'); margin-top: 20px;" href="javascript:editItemByItemLink('${itemLink}');" title="Редактиране"></a>


// Search - current items - when in ex. caravans View, Cars View, Prodicts View etc. ###########################################################################
async function searchItems(e) {
    let db = await getDbAsync(); // Get the singleton db
    var searchTxt = e.currentTarget.value; // Get the txt from the search textbox or the url depending on e


    var currentItemsType = (window.location.pathname).substring(1).toLocaleLowerCase(); // Get the current items Type from the url
    var data = null;

    // Search if there is provided type "currentItemsType = caravans, cars etc."
    if (Object.hasOwn(db.items, `${currentItemsType}`) && e.currentTarget.id !== "global-search-input") // If there is such property - search by usning the property otherwise search in the whole db everything.
    {
        document.getElementById('global-search-input').value = ""; // Reset the global-search-input - when using  the current search input

        let items = await searchArray(db.items[`${currentItemsType}`], searchTxt); // Search and get the matched items 
        data = { [`${currentItemsType}`]: items } // Construct object - so it looks like the db pattern object, so the same code for get items can be used for search too
    }
    else // GLobal Search 
    {
        if (e.currentTarget.id !== "current-items-search-input") {
            document.getElementById('current-items-search-input').value = ""; // Reset the current-items-search-input / on global search
        }
        else {
            document.getElementById('global-search-input').value = "";
        }
        if (e.currentTarget.id !== "searchKeywordFromUrl") //  If there is not search keyword "?search=mysearchkeyword" // Consider else if
        {
            // const state = { page_id: 1};

            // history.pushState(state, "", '/'); // Navigate to Home View and search in all  
            // var data = {rand: Math.random()};
            // window.history.pushState(data, '', '/');
            // // location.replace("https://www.w3schools.com");
            // // window.location.assign("/index.html",);


            // history.pushState(state, '', "/");
            if (window.location.pathname != "/") {
                locationInputChanged = true; // It is used in the Common View to prevent global search being erased
                document.getElementById('home-button').click(); // Simulate click so the main.js route is triggered to navigate to home, view. Tried with pushstate but did not work well.

                // window.location.search = searchTxt; 
            }
        }
        // window.location.pathname = '/index.html'; // Change to Home View path
        if (searchTxt == "") {
            window.history.replaceState({}, "title", "/");
        }
        else {
            window.history.replaceState({}, "title", `?search=${searchTxt}`);
        }
        // window.history.replaceState( {} , "title", `?search=${searchTxt}`);
        let items = await recursiveSearchObj(db.items, searchTxt); // Search and get the matched items
        data = items; // Construct object - so it looks like the db pattern object, so the same code for get items can be used for search too
    }




    document.getElementById('app').innerHTML = await getItems(currentItemsType, data); // Inject the items in the app container
}



// ####### Search Script ###########################################################################

// It looks like this is not nececery because the .includes(match) does the search. obj[p].toLocaleLowerCase().includes(match).
// async function deepSearch(data, searchTxt) 
// { 
//     let searchTxtFirstChar = searchTxt[0];
//     var searchResult = "";

//     if (searchTxtFirstChar !== undefined) // If not empty string
//     {
//         for (let t = 0; t < data.length; t++) // Loop data to check each char and compare with the Search text first char
//         {
//             if (searchTxtFirstChar == data[t]) // Compare data with search txt first char. If there is match 
//             {
//                 for (let y = 0; y < searchTxt.length; y++) // Try to match the search word with the next chars in the data
//                 {

//                     if (searchTxt[y] == data[t + y]) // Try to match the search word from the data provided
//                     {
//                         searchResult += data[t + y]; // Add the matched char to searchResult string [n],[a],[m],[e]
//                     }
//                     else // if there was no word match // Reset the result to be ready for the next try // At this point here there have been no char match, no full match
//                     {
//                         searchResult = ""; // There is no full match, but partly only some chars, thats why reset the searchResult to continue to the new try, no need to check further there was no match, but partial match let say nam was matched but we need name to be matched as whole word 
//                         break;
//                     }
//                     if (searchResult.length == searchTxt.length) // Check if there is a whole match
//                     {
//                         return true; // Stop everything and return true - there was match
//                     }
//                 }
//             }

//         }
//         return false; // No match, At this point the whole data was looped and there is no match
//     }
//     else 
//     {
//         return false;
//     }
// }


// To check if object is empty
function isObjEmpty(obj) {
    for (var x in obj) {
        return false;
    }
    return true;
}



// Search Object - Only clean object
async function searchObject(obj, match) {

    let resultObjDb = {}; // Hold the results


    for (const p in obj) {
        let type = typeof obj[p];

        // String
        if (type === 'string') // Whole word match
        {
            if (obj[p].toLocaleLowerCase().includes(match) === true) {
                return obj;
            }
        }
        // Int, Float, Bool, BigInt
        else if (type === 'number' || type === 'boolean' || type === 'bigint') {
            if (obj[p].toString().toLocaleLowerCase().includes(match) === true) {
                return obj;
            }
        }
        // Object
        else if (type === 'object') {
            let subResult = await searchObject(obj[p], match); // Returns sub object
            if (subResult !== undefined && subResult.id !== undefined) {
                if (Object.hasOwn(resultObjDb, [subResult.category])) // Check if there is already such property in the resultObjDb
                {
                    // Ex: db.caravans = db.caravans + caravans;
                    // resultObjDb[subResult.category] = resultObjDb[subResult.category] + [subResult.category][subResult]; // Merge the props
                    // Object.assign(resultObjDb[subResult.category], [subResult.category][subResult]);
                    // Array.prototype.push.apply(arr1,arr2);
                    if (Array.isArray(resultObjDb[subResult.category])) {
                        resultObjDb[subResult.category] = resultObjDb[subResult.category].concat(subResult);
                        // resultObjDb[subResult.category] = resultObjDb[subResult.category].concat(resultObjDb[subResult.category]);
                    }
                    // resultObjDb[subResult.category] = {...[subResult.category][subResult], ...resultObjDb[subResult.category]}; 
                }
                else {
                    subResult.index = p; // Used to help deletion - finding the object in the db and delete. Only Used in Admin site.
                    let constructedSubResult = { [subResult.category]: [subResult] };
                    resultObjDb = { ...resultObjDb, ...constructedSubResult };    // Merge to the resultObjDb if prop does not excists
                }
            }
        }
    }

    return resultObjDb;
}




async function recursiveSearchObj(obj, match) {
    match = match.toLocaleLowerCase(); // In the search all the string are made to lowerCase, here if this is missing searching with capital letter will not find results 

    let resultObjDb = {}; // Hold the results

    for (const p in obj) // loop the props and check if it is object
    {
        if (Object.prototype.hasOwnProperty.call(obj, p)) // If Only own props, not inherited
        {
            let type = typeof obj[p];

            // If Object
            if (type === 'object') {
                let subResult = await searchObject(obj[p], match); // Returns sub object
                if (subResult !== undefined && !isObjEmpty(subResult)) {

                    //   Object.assign(resultObjDb, [subResult.category][subResult]); // Ex. caravans:{category:caravans, brand:hobby,....}

                    // let constructedSubResult = {[subResult.category]:[subResult]};
                    // resultObjDb = {...resultObjDb, ...constructedSubResult};               
                    resultObjDb = { ...resultObjDb, ...subResult };
                    // [resultObjDb][[obj[p].category]:[obj[p]]]  // Try to add new item to let say caravans if. This is serach result if already has caravans than add the new result to the old result
                    // resultArray.push(constructedObj);
                }
            }
        }
    }

    return resultObjDb;
}


// // TEST=OBJ===========================================
// let testObj = 
// { 
//     name: "Dodo", 
//     isLogged: true, 
//     id: "2", 
//     domains: [
//     { domainId: 123, domainName: "www.domainOfMine.com", customerId: '765' },
//     { domainId: 3456, domainName: "www.domain2.com", customerId: '34' }], 
//     role:{roleName:'user', roleQuant:[{qName:'Q1', quantity: 5, cNa:{bName:'B1', bArr:[{jk: 9}]}}]} 
// }

// let resultOBJ = searchObject(testObj, "q1".toLocaleLowerCase());
// console.log(resultOBJ);
// // TEST END ===OBJ===================================





// Search Array
async function searchArray(arr, match) {

    match = match.toLocaleLowerCase(); // In the search all the string are made to lowerCase, here if this is missing searching with capital letter will not find results 
    console.time();
    let resultArr = [];
    for (let b = 0; b < arr.length; b++) {
        let type = typeof arr[b];
        // Object
        if (type === 'object') {
            let result = await searchObject(arr[b], match);
            if (result !== undefined && !isObjEmpty(result)) {
                resultArr.push(result);
            }
        }
        else if (type === 'string') {
            if (arr[b].toLocaleLowerCase().includes(match) === true) {
                resultArr.push({ stringValue: arr[b] });
            }
        }
        // Int, Float, Bool, BigInt
        else if (type === 'number' || type === 'boolean' || type === 'bigint') {
            if (arr[b].toString().toLocaleLowerCase().includes(match) === true) {
                resultArr.push({ [type + 'Value']: arr[b] });
            }
        }
    } console.timeEnd();
    return resultArr;
}





// Check day difference ------------------------------------------------------------------------------------------
function checkDiffDays(date1, date2) {
    const oneDayInMilliseconds = 24 * 3600 * 1000; // One day in miliseconds

    const diffInMilliseconds = new Date(date1).getTime() - new Date(date2).getTime(); // Difference in miliseconds between the two dates

    const diffInDays = diffInMilliseconds / oneDayInMilliseconds; // Get Days out from the diff. miliseconds by dividing one day miliseconds

    return diffInDays;
}



// // TEST========ARR====================================
// let testArr =
//     [
//         "777",
//         6548452,
//         ["wer", "yter", { er: "hhh" }],
//         {
//             name: "Dodo",
//             isLogged: true,
//             id: "2",
//             domains: [
//                 { domainId: 123, domainName: "www.domainOfMine.com", customerId: '765' },
//                 { domainId: 687, domainName: "www.domain2.com", customerId: '34' }],
//             role: { roleName: 'user', roleQuant: [{ qName: 'Q1', quantity: 5, cNa: { bName: 'B1', bArr: [{ jk: 45 }] } }] }
//         },
//         {
//             name: "Boby",
//             isLogged: true,
//             id: "3",
//             domains: [
//                 { domainId: 123, domainName: "www.dom1.com", customerId: '87' },
//                 { domainId: 358456, domainName: "www.dom3.com", customerId: '45' }],
//             role: { roleName: 'user', roleQuant: [{ qName: 'HJ', quantity: 34, cNa: { bName: 'SXwer1', bArr: [{ jk: 9 }] } }] }
//         },
//         {
//             name: "Didi",
//             isLogged: true,
//             id: "4",
//             domains: [
//                 { domainId: 123, domainName: "www.ecomi3.com", customerId: '2321' },
//                 { domainId: 3456, domainName: "www.toti.com", customerId: '87' }],
//             role: { roleName: 'user', roleQuant: [{ qName: 'RT', quantity: 5, cNa: { bName: 'L1', bArr: [{ jk: 12 }] } }] }
//         }
//     ];


// let resultArr = searchArray(testArr, "87".toLocaleLowerCase());


// console.log(resultArr);
// TEST END ======ARR================================




// Google tranlate ------------------------------------------------------ 
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'bg' }, 'google_translate_element');
}


let translating = false;
function initTranlate() {

    if (translating == false) {

        // Start translating -----------------------------------------------------------------------------------------
        // Load dynamic script - google tranlate script load dynamic
        var translateScript = document.createElement("script");
        translateScript.type = "text/javascript";
        translateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        translateScript.id = 'googleTranslateScript';
        translateScript.onload = function () {
            // alert("Script is ready!"); 
            //     var trnalateDropdown = document.getElementById(":0.targetLanguage"); // Get the dropdown
            // document.getElementById('translate').innerHTML+=`${trnalateDropdown}`;

        };
        document.body.appendChild(translateScript); // Append the script
        translating = true;

        // Change Translate button icon and txt
        let tranlateImg = document.getElementById('translateStatusImg');
        tranlateImg.src = 'static/img/icons/translating.png';// Change tranlate icon on the <a>

        let tranlateLinkButton = document.getElementById('translate');
        tranlateLinkButton.innerHTML = `${tranlateImg.outerHTML}</br>Reset`;
        tranlateLinkButton.style.color = "red";
    }
    else // Stop Translate
    {
        //   document.getElementById('translateStatusImg').src = 'static/img/icons/translate.png'; // Change the img to blue not translating

        let translateScript = document.getElementById('googleTranslateScript'); // Get the script
        translateScript.remove();
        document.getElementById('google_translate_element').innerHTML = "";


        var trnalateIframe = document.getElementById(":1.container"); // Get the google tranlate iframe - that is hidden with css in the top of the window
        if (trnalateIframe !== null) {
            trnalateIframe.contentWindow.document.getElementById(':1.restore').click(); // Get the restore to original language button and simulate click
        }
        document.getElementById(":0.targetLanguage").innerHTML = "";


        // Resete tranlate button img and text
        let tranlateImg = document.getElementById('translateStatusImg');
        tranlateImg.src = 'static/img/icons/translate.png';// Change tranlate icon on the <a>

        let tranlateLinkButton = document.getElementById('translate');
        tranlateLinkButton.innerHTML = `${tranlateImg.outerHTML}</br>Translate`;
        tranlateLinkButton.style.color = '';


        translating = false; // Change the status
    }




}


// let imgSrcArray = [];
// // For The Image picker ......................................................................
// async function handleImages() {
// // Can not chose again deleted image, this is why we need to use the localEditArray instead of imgPicker.Files
//     let imgPrevContainer = document.getElementById('previewImgHolder');

//     let imgPicker = document.getElementById('imgPicker');

//     let imgHtml = '';
//     let imgSrc = '';

//     //    imgPrevContainer.innerHTML = ""; // Earease if there are old images

//     for (let i = 0; i < imgPicker.files.length; i++) {
//         imgSrc = window.URL.createObjectURL(imgPicker.files[i]);
//         // imgSrcArray.push(imgSrc); // Add the generated img url
//         imgHtml += `<img class="slide" src="${imgSrc}">`;
//     }

//     imgPrevContainer.innerHTML += imgHtml; // Add the image as html to the container to display it

//     await toggleSlideImg(0); // Refresh the image holder
// }












// For converting the local image to Base64 - and uploding it to the github #######################################################
// Get the image as Base64
async function readImgAsBase64AndUpload(file, imgComment, githubFilePathImg) {
    // let testImg = document.getElementById('imgPicker').files[0] // Get the image from the "input with type="file""

    let readerFile = await readFileAsync(file); // Read Img as base 64 from async reader

    // Base64
    let dataBase64Img = readerFile.split(',')[1]; // Remove "data:image/png;base64," so it is raw image base64
    return await uploadImgAsync(githubUser, githubRepo, githubFilePathImg, githubToken, dataBase64Img, '', imgComment); // Upload the image to the server
}


// Read Async file...............................................
async function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;

        if (file) {
            reader.readAsDataURL(file);
        }
    })
}


async function delay(ms) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, ms);
    })
}



// Get From Data as Json ---------------------------------------------
function convertFormToJsonById(formId) {
    let divForm = document.getElementById(formId); // Using div as form
    // let childElements = divForm.childNodes;
    let childElements = divForm.getElementsByTagName("*");
    //  let childElements = document.getElementById('parentContainer').children;
    let formData = {};

    for (let i = 0; i < childElements.length; i++) {
        if (childElements[i].name !== "" && childElements[i].name !== undefined) // If the element of the form that is a Div has a name property atribute attached to id then use it
        {
            let element = childElements[i];
            formData[element.name] = element.value;
        }
    }

    // let jsonData = JSON.stringify(formData);
    //  return jsonData;
    console.log('form................................');
    console.log(formData);
    return formData;
}








// Base HTML For caravan -----------------------------------------------------------------------
async function caravansHtmlTemplateFields() {

    //  <img class="slide" src='${obj.photos[h]}'></img>

 //<div class="admin-content-holder modalItemContainer" tabindex="0" style="margin-top: 0;">
    return `  
   
    
    <input id="imgPicker" type="file" accept="image/*;capture=camera" multiple="multiple">
    
     
   <div class="img-preview-container">
       <div style="width: 100%; height: 100%;" id="previewImgHolder"></div>   
       ${imgSlideArrowButtons()}
       <button id="rotateImgView" class="item_share_button" style="position: absolute; left:100px; right:0; margin-inline: auto; bottom: 25px; cursor: pointer; padding: 0; border: 0; outline: none; background-color: transparent; background-image: url('static/img/icons/rotate.png');"></button>
       <a class="item_share_button" style="position: absolute; left:0; right:0; margin-inline: auto; bottom: 25px; background-image: url('static/img/icons/del-img.png');" href="javascript:deleteCurrentImg();" title="Изтриване на снимката!!!"></a>
       <span style="margin: auto;" id="imgCount"></span>
    </div> 
   
    
   <div id="modalItemDetailsEdit" class="modalItemDetails" tabindex="0">
   
         <h3 class="item-title"><img src="static/img/icons/caravan.png"><u></br>Категория каравани:</u></h3> 
       
       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> </br><input id="price" name="price" placeholder="Цена"></span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> </br><input id="caravanBrand" name="brand" type="text" placeholder="Марка" list="caravanBrands"></span>
            <datalist id="caravanBrands">
                <option value="Hobby"></option>
                <option value="Knaus"></option>
                <option value="Adria"></option>
                <option value="LMC"></option>
                <option value="Tabbert"></option>
                <option value="Fendt"></option>
                <option value="Dethleffs"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> </br><input id="caravanModel" name="model" placeholder="Модел"></span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> </br><input id="caravanYear" name="year" placeholder="Година" list="caravanYearList"></span> 
       <datalist id="caravanYearList">
                <option value="1990г."></option>
                <option value="1991г."></option>
                <option value="1996г."></option>
                <option value="1998г."></option>
                <option value="1999г."></option>
                <option value="2000г."></option>
                <option value="2001г."></option>
                <option value="2002г."></option>
                <option value="2003г."></option>
                <option value="2004г."></option>
                <option value="2005г."></option>
                <option value="2006г."></option>
                <option value="2007г."></option>
                <option value="2008г."></option>
                <option value="2009г."></option>
                <option value="2010г."></option>
                <option value="2011г."></option>
                <option value="2013г."></option>
                <option value="2014г."></option>
                <option value="2015г."></option>
                <option value="2016г."></option>
                <option value="2017г."></option>
                <option value="2018г."></option>
            </datalist
       <hr>
       <span><img src="static/img/icons/ruler.png"><b>Дължина:</b> </br><input id="caravanLength" name="length" placeholder="Дължинна" list="caravanLengthList"></span>
       <datalist id="caravanLengthList">
                <option value="380см"></option>
                <option value="390см"></option>
                <option value="450см"></option>
                <option value="460см"></option>
                <option value="495см"></option>
                <option value="500см"></option>
                <option value="502см"></option>
                <option value="520см"></option>
                <option value="530см"></option>
                <option value="540см"></option>
                <option value="560см"></option>
                <option value="590см"></option>
                <option value="610см"></option>
            </datalist>
            
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> </br><input id="condition" name="condition" placeholder="Състояние" value="Използванo"></span>
       <hr>
       <span><img src="static/img/icons/toilet.png"><b>Тоалетна:</b> </br><input id="toilet" name="toilet" placeholder="Тоалетна" list="caravanToilet"></span>
            <datalist id="caravanToilet">
                <option value="Да"></option>
                <option value="Не"></option>
                <option value="Химическа"></option>
                <option value="Проточна"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/bath.png"><b>Баня:</b> </br><input id="bath" name="bath" placeholder="Баня" list="caravanBath"></span>
            <datalist id="caravanBath">
                <option value="Да-душ"></option>
                <option value="Да-душ кабина"></option>
                <option value="Само тоалетна без душ"></option>
                <option value="Не"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/heater.png"><b>Отопление:</b> </br><input id="heating" name="heating" placeholder="Отопление" list="caravanHeating"></span>
            <datalist id="caravanHeating">
                <option value="Да"></option>
                <option value="Не"></option>
                <option value="Газово"></option>
                <option value="Електрическо"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/boiler.png"><b>Боийлер:</b> </br><input id="boiler" name="boiler" placeholder="Бойлер" list="caravanoBiler"></span>
       <datalist id="caravanoBiler">
                <option value="Да"></option>
                <option value="Не"></option>
                <option value="Газов"></option>
                <option value="Електрически 230V"></option>
            </datalist>
       <hr>
        <span><img src="static/img/icons/water-inlet.png"><b>Твр. врз. Вода:</b> </br><input id="waterInlet" name="waterInlet" placeholder="Твърда връзка вода" list="caravanWaterInlet"></span>
       <datalist id="caravanWaterInlet">
                <option value="Да"></option>
                <option value="Не"></option> 
            </datalist>
       <hr>
        <span><img src="static/img/icons/water-container.png"><b>Контейнер за вода:</b> </br><input id="waterContainer" name="waterContainer" placeholder="Резервар за вода" list="caravanWaterContainer"></span>
       <datalist id="caravanWaterContainer">
                <option value="Да"></option>
                <option value="Да - 20 литра"></option>
                <option value="Да - 40 литра"></option>
                <option value="Да - 60 литра"></option>
                <option value="Да - 120 литра"></option>
                <option value="Не"></option> 
            </datalist>
       <hr>
         <span><img src="static/img/icons/electricity.png"><b>Ток:</b> </br><input id="electricity" name="electricity" value="Да - 230V / 12V" placeholder="Ток" list="caravanЕlectricity"></span>
       <datalist id="caravanЕlectricity">
                <option value="Да - 230V / 12V"></option>
                <option value="Не"></option> 
            </datalist>
       <hr>
         <span><img src="static/img/icons/battery.png"><b>Акумулатор:</b> </br><input id="battery" name="battery" placeholder="Акумулатор" list="caravanBattery"></span>
       <datalist id="caravanBattery">
                <option value="Да - 12V"></option>
                <option value="Не"></option> 
            </datalist>
       <hr>
       <span><img src="static/img/icons/snowflake.png"><b>АС/Климатик:</b> </br><input id="ac" name="ac" placeholder="Климатик" list="caravanAc"></span>
       <datalist id="caravanAc">
                <option value="Да"></option>
                <option value="Не"></option>
                <option value="Да - Топлене / Студене"></option>
                <option value="Да - Само Студене"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/stove.png"><b>Печка:</b> </br><input id="stove" name="stove" placeholder="Печка" list="caravanStove"></span>
       <datalist id="caravanStove">
                <option value="Да"></option>
                <option value="Не"></option>
                <option value="Да - на ток"></option>
                <option value="Да - на газ"></option>
                <option value="Да - Микровълнова"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/hotplates.png"><b>Котлони:</b> </br><input id="hotplates" name="hotplates" value="Да - газ" placeholder="Котлони" list="caravanHotplates"></span>
       <datalist id="caravanHotplates">
                <option value="Да - газ"></option>
                <option value="Да - ток"></option>
                <option value="Не"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/mover.png"><b>Мувер:</b> </br><input id="mover" name="mover" placeholder="Мувер" list="caravanMover"></span>
       <datalist id="caravanMover">
                <option value="Да"></option>
                <option value="Не"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/solar-panel.png"><b>Солар:</b> </br><input id="solar" name="solar" placeholder="Солар" list="caravanSolar"></span>
       <datalist id="caravanSolar">
                <option value="Да"></option>
                <option value="Не"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/bed.png"><b>Спални места:</b> </br><input id="sleepingPlaces" name="sleepingPlaces" placeholder="Места за спане" list="caravanSleepingPlaces"></span>
        <datalist id="caravanSleepingPlaces">
                <option value="2 души"></option>
                <option value="3 души"></option>
                <option value="4 души"></option>
                <option value="4 души: Френско леголо х2 места; Сепаре х2 места"></option>
                <option value="4 души: Сепаре - х2 места; Сепаре х2 места;"></option>
                <option value="4 души: (2 единични легла) - х2 места; Сепаре х2 места"></option>
                <option value="5 души"></option>
                <option value="5 души: Френско леголо х2 места; Сепаре х2 места; Кушетка 1х място"></option>
                <option value="5 души: (2 единични легла) - х2 места; Сепаре х2 места; Кушетка 1х място"></option>
                <option value="5 души: Двуетажно легло - х2 места; Сепаре х2 места; Кушетка 1х място"></option>
                <option value="6 души"></option>
                <option value="6 души: Двуетажно легло - х2 места; Сепаре х2 места; Кушетка 2х места"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/tent.png"><b>Форселт:</b> </br><input id="fortelt" name="fortelt" placeholder="Форселт" list="caravanFortelt"></span>
           <datalist id="caravanFortelt">
                <option value="Да"></option>
                <option value="Не"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/markise.png"><b>Маркиза:</b> </br><input id="markise" name="markise" placeholder="Маркиза" list="caravanMarkise"></span>
           <datalist id="caravanMarkise">
                <option value="Да"></option>
                <option value="Не"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/documents.png"><b>Документи:</b> </br><input id="documents" name="documents" placeholder="Документи" value="Да"></span>
       <hr>
       <span><img src="static/img/icons/plate.png"><b>Номер:</b> </br><input id="plate" name="plate" placeholder="Номер" list="caravanPlate"></span>
           <datalist id="caravanPlate">
                <option value="Да"></option>
                <option value="Не"></option>
            </datalist>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b></br><input id="location" name="location" placeholder="Местоположение" value="България - Обл. Перник"></span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> </br><textarea id="description" name="description" placeholder="Описание"></textarea ></span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><input style="font-size:7px;" name="id"></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"></br><input id="keywords" name="keywords" placeholder="Ключови думи" value="каравана, каравани, karavana, karavani, caravans, caravan"></span>
       <hr> 
       
       <h3 class="item-title"><img src="static/img/icons/caravan.png"><u></br><input id="title" name="title" placeholder="Заглавие"></u></h3> 
       <button id="generateCaravanTitleBtn">Генер. заглавие</button>

       <hr>
         <span>Категория:</span><input id="categoryInput" name="category" readonly> 
         <span>Дата:</span><input id="dateInput" name="date" readonly> 

       <button id="saveItemButton">Запази</button>
    
   </div>
   ${imgCompressionHtml()}
`;


}






//:::::::::::::::::::::::::: USED FOR ADD & EDIT :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
async function loadAppropriateFields(itemTypePass) {

    let apFields = document.getElementById("aproppiriateFieldsContainer");
    let itemType = itemTypePass;

    if (itemType == null) {
        itemType = document.getElementById("itemType").value;
    }


    if (itemType == "caravans") {
        apFields.innerHTML = await caravansHtmlTemplateFields();
        document.getElementById("saveItemButton")?.addEventListener("click", (e) => { saveItem(e) }); // For upload
        document.getElementById("generateCaravanTitleBtn")?.addEventListener("click", generateCaravanTitle); // Generate caravan title
        //  document.getElementById("imgPicker").addEventListener("change", handleImages); // For the modal
        document.getElementById("imgPicker")?.addEventListener("change", async () => { await imgPickerHandler() }); // Imgpicker handler  // Common for all categories
        imgCompressionEventDeclaraton();
    }
    document.getElementById('arrow-leftSlideImg')?.addEventListener('click', async () => { await toggleSlideImg(-1) }); // The img slide left button
    document.getElementById('arrow-rightSlideImg')?.addEventListener('click', async () => { await toggleSlideImg(1) }); // The img slide right button
    document.getElementById('rotateImgView')?.addEventListener('click', async () => { await executeCompression(imgCompressionSizeGlobal, imgCompressionExtensionGlobal, true, false) }); // THe img rotate button

}

// Generate Title ================================================================
function generateCaravanTitle() {
    let brand = document.getElementById('caravanBrand');
    let model = document.getElementById('caravanModel');
    let length = document.getElementById('caravanLength');
    let year = document.getElementById('caravanYear');
    let genTitle = `${brand.value}-${model.value}-${length.value}-${year.value}`;

    document.getElementById('title').value = genTitle;
}




// Update the json file - The DB
async function constructUpdateAndUpdate(jsonData, filePath, msg) {
    await updateJsonFileAsync(githubUser, githubRepo, filePath, githubToken, jsonData, msg);
}

// Function for Saving Add Action logic ----------------------------------------------------------------
async function AddSave() {
    let type = document.getElementById('itemType').value; // Used - constructin obj and For saving it in github in specific folder type - caravans, cars, products etc.
    let itemName = document.getElementById('title').value; // For Creating Id
    const formData = convertFormToJsonById('modalItemDetailsEdit'); // Converting the div html to json - the input ---> to json
    let itemId = null;


    itemId = formData.id = createId(itemName); // Creating the id


    // let imagesJsDelivrPathArray = await handleItemImages(itemId, type);// Upload Images and return jsDelivr path for the images
    let imagesJsDelivrPathArray = await handleItemImagesEdit(itemId, type); // Upload Images and return jsDelivr path for the images // Used also for edit

    formData.photos = imagesJsDelivrPathArray; // Add the photos array to the json object that will be uploaded
    formData.id = itemId;
    formData.category = type; // Add the type to the item itself - where the id, title, price etc. is. It is used un the logic to show the modal
    formData.sold = "false";

    let db = await getDbAsync();

    db.items[type].push(formData); // Add the item to the local db - later the whole db will be uploaded

    let jsonDb = JSON.stringify(db);
    document.getElementById("developerInput").value = jsonDb;  // Populate the textbox that shows the db in developer mode
    await constructUpdateAndUpdate(jsonDb, githubFilePathDb, `Admin - Added new item in APP: ${formData.id}`);

    // Check
    console.log("Form Data:" + formData);
    console.log("Json DB:" + jsonDb);
}




function convertToGithubPathArr(arr) {
    let githubPathArr = [];
    //     // let jsDelivr = 'https://cdn.jsdelivr.net/gh/stevicamp/Stevicamp@main/index.html';
    // https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${githubPathFileToDelete}
    // https://cdn.jsdelivr.net/gh/stevicamp/Stevicamp/resources/img/caravans/id_LMC-%D0%94%D0%B5%D0%BB%D1%83%D0%BA%D1%81-520%D1%81%D0%BC-2001%D0%B3.-D2025-12-03T19-05-05.232Z/id_LMC-%D0%94%D0%B5%D0%BB%D1%83%D0%BA%D1%81-520%D1%81%D0%BC-2001%D0%B3.-D2025-12-03T19-05-05.232Z-1.png
    // resources/img/caravans/id_LMC-Делукс-520см-2001г.-D2025-12-03T19-05-05.232Z/id_LMC-Делукс-520см-2001г.-D2025-12-03T19-05-05.232Z-2.png   
    let path = '';
    for (let s = 0; s < arr.length; s++) {
        // itemLink.split('?search=')[1]; 
        path = arr[s].split(`${cdn}/${githubUser}/${githubRepo}/`)[1]; // Get the path by knowing the rest. For js delivr links this is common - "https://cdn.jsdelivr.net/gh/stevicamp/Stevicamp/"
        githubPathArr.push(path); // We need only the path

    }
    return githubPathArr;
}





// Function for Saving Edit Action logic ----------------------------------------------------------------
async function EditSave() {
    let type = document.getElementById('categoryInput').value; // Used - constructin obj and For saving it in github in specific folder type - caravans, cars, products etc.// This field is input and is populated from the db on load the item in edit view
    const formData = convertFormToJsonById('modalItemDetailsEdit'); // Converting the div html to json - the input ---> to json
    let itemId = formData.id; // Pre populated from the db into the Id input - formData.id wich is read only

    // Delete the deleted images if there are some
    if (deleteImagesEditArr.length > 0) // If the aray is not empty, this means that the user deleted images and know the links are here in this array they ar js delivr links, need to be converted to github 
    {
        let imgGithubPathArr = convertToGithubPathArr(deleteImagesEditArr); // Passsing js delivr array and converting it to github array links
        for (let z = 0; z < imgGithubPathArr.length; z++) // loop the array with the links of the images to be deleted
        {
            await deleteFileAsync(githubUser, githubRepo, imgGithubPathArr[z], githubToken, `Deleted - Image by Admin in the View: ${imgGithubPathArr[z]}`); // Delete the image
        }

        deleteImagesEditArr = []; // Clear the array for the next time to be clean
    }


    let imagesJsDelivrPathArray = await handleItemImagesEdit(itemId, type);// Upload Images and return jsDelivr path for the images
    console.log("Arr#########---------------:" + imagesJsDelivrPathArray);
    //formData.photos = imagesJsDelivrPathArray; // Add the photos array to the json object that will be uploaded
    // ###### Here bellow on before hand if imaged are removed the  the img link will be removed from formData.photo as well as other action for deleding hte specific image    


    //    formData.category = type; // Add the type to the item itself - where the id, title, price etc. is. It is used un the logic to show the modal
    //    formData.sold = "false";  

    // ###### Here bellow on before hand if imaged are removed the  the img link will be removed from formData.photo as well as other action for deleding hte specific image    
    let db = await getDbAsync(); // The Db
    let rawitem = await recursiveSearchObj(db.items, itemId); // Search and get the matched item - searching by the unique id - must get one item if it excists
    let item = Object.values(rawitem)[0][0]; // The result is ex. caravans[{category:"caravans", price:"1353"}] Get the itemType / category

    console.log('ITEM: ---------------' + item.photos);
    formData.photos = [...imagesJsDelivrPathArray]; // Add the photos array to the json object that will be uploaded (... if edit mode retain the old photos and add the new to the old - merge the arrays)


    await deleteLocalItemById(itemId); // Remove the old item that is unedited from the local db - if it is not removed there will be two. The item could be assigned instead of deleting, but...this is used for now

    db.items[type].push(formData); // Add the item to the local db - later the whole db will be uploaded

    let jsonDb = JSON.stringify(db);
    //    document.getElementById("developerInput").value = jsonDb;  // Populate the textbox that shows the db in developer mode
    await constructUpdateAndUpdate(jsonDb, githubFilePathDb, `Admin - Edited item in APP: ${formData.id}`);
}



// Save Item - ADD & EDIT ---------------------------------------------------------------------
async function saveItem(e) {

    let currentUrlPath = window.location.pathname; // The current path - ex. Edit or Add

    if (currentUrlPath == "/Add") {
        await AddSave(); // Add save logic
        // removeViewSessionElements();
    }
    else if (currentUrlPath == "/Edit") {
        // Edit is not working properly - instead of editing it copies the item edits it and add it to the db, but the old item is still in the db
        await EditSave();
    }



    //    let itemName = document.getElementById('title').value; // For Creating Id
    //    const formData = convertFormToJsonById('modalItemDetails'); // Convert the html fields to json
    //    let itemId = formData.id;

    //    if(itemId == null || itemId == "" || itemId == undefined) // If ID is null, empty or undefined, create ID. Because this is used also in the edit view. THe code is reused both for add and edit. When you add there is no ID, but when you edit there is id
    //    {
    //      itemId = formData.id = createId(itemName); 
    //    }

    //    let imagesJsDelivrPathArray = await handleItemImages(itemId, type);// Upload Images and return jsDelivr path for the images

    //    formData.photos = [...formData.photos, ...imagesJsDelivrPathArray]; // Add the photos array to the json object that will be uploaded (... if edit mode retain the old photos and add the new to the old - merge the arrays)
    //    formData.id = itemId;
    //    formData.category = type; // Add the type to the item itself - where the id, title, price etc. is. It is used in the logic to show the modal
    //    formData.sold = "false";  

    //    let db = await getDbAsync();

    //    db.items[type].push(formData); // Add the item to the local db - later the whole db will be uploaded

    //    let jsonDb = JSON.stringify(db);
    //    document.getElementById("developerInput").value = jsonDb;  // Populate the textbox that shows the db in developer mode




    //    await constructUpdateAndUpdate(jsonDb,githubFilePathDb, `${performingActionType} ${formData.id}`);





    // #1. Here get the links for the uploadded images if responese ok
    // #2. Convert to js delivr url.
    // #3. Get all inputs from the form and construct json and add the js delivr links
    // 4. Update the db
    // 5. Fix the db to have not latin char but without uri encoding - maybe onvert the json to base 64 without he uri
}



// Handle local images - read as base 64 and upload ---------------------------------------
async function handleItemImagesEdit(itemId, type) {

    // let images = document.getElementById('imgPicker').files; // Get the images from the "input with type="file""

    let githubFilePathForImg = "";


    let okResponse = true;
    for (let v = 0; v < editItemImgArr.length; v++) // editItemImgArr is the local array that holds both js delivr links from before editing and blob: links that need to be converted to jsdelivr links
    {
        if (editItemImgArr[v].includes("base64")) // If local image base64:   // if not js delivr image
        {
            if (okResponse) {

                // let imgExtension = images[v].slice((Math.max(0, images[v].lastIndexOf(".")) || Infinity) + 1); // Get the file extension of the image - .jpg, .png
                let imgExtension = '.' + editItemImgArr[v].split(';')[0].split('/')[1];

                githubFilePathForImg = `resources/img/${type}/${itemId}/${itemId}--${[v + 1] + '-' + Date.now() + imgExtension}`; // Ex. resources/img/caravans/Caravan-Knaus-Sunshine-540-D2025-01-21T17-59-45.662Z/Caravan-Knaus-Sunshine-540-D2025-01-21T17-59-45.662Z-1

                // okResponse = await readImgAsBase64AndUpload(editItemImgArr[v], `${[v + 1]} от ${[editItemImgArr.length]}`, githubFilePathForImg);
                let dataBase64Img = editItemImgArr[v].split('base64,')[1]; // Remove "data:image/png;base64," so it is raw image base64
                console.log('Base64Img wihtout base64,...:' + dataBase64Img);

                // Check the size of the image if it is not reduced already by admin
                if ((dataBase64Img.length * 0.75 / 1024).toFixed(1) > 165) // If size is over 165kb reduce the size
                {
                    let cleanBase64 = dataBase64Img.replace(/^data:[^;]+;base64,/, ""); // Remove the data: so to work with Unit8Array 
                    let img = new Blob([Uint8Array.fromBase64(cleanBase64)]); // Base 64 to blob to use in the canvas
                    dataBase64Img = await compressImage(img, imgCompressionSizeGlobal, imgCompressionExtensionGlobal, imgCompressionPercentFixed, true, false, 100, 100, 100);
                    dataBase64Img = dataBase64Img.split('base64,')[1];
                }

                okResponse = await uploadImgAsync(githubUser, githubRepo, githubFilePathForImg, githubToken, dataBase64Img, 'Admin Uploaded Image from Edit mode: ', ''); // Upload the image to the server

                editItemImgArr[v] = convertToJsDelivrPath(githubFilePathForImg); //After uploading the image assign the same index in the array with the jsdelivr image // Add the path to the array that will hold all paths. It is late used to get js delivr paths and then add it to the json object before sending to the server
            }
            else {
                // Here code to remove the last added images................
                // Need to have variables to remember the name and path, then use delete function from CRUF file to delete each image
            }
            // await readImgAsBase64AndUpload(images[v], `${[v+1]} от ${[images.length]}`, githubFilePathForImg); 
        }
    }
    return editItemImgArr;
}




// // Handle local images - read as base 64 and upload ---------------------------------------
// async function handleItemImages(itemId, type)// Used for Add item 
// {
//     let images = document.getElementById('imgPicker').files; // Get the images from the "input with type="file""
//     let githubFilePathForImg = "";

//     let imagesPathArray = [];

//     let okResponse = true;
//     for (let v = 0; v < images.length; v++) {
//         if (okResponse) {
//             let imgExtension = '.' + images[v].name.slice((Math.max(0, images[v].name.lastIndexOf(".")) || Infinity) + 1); // Get the file extension of the image - .jpg, .png
//             githubFilePathForImg = `resources/img/${type}/${itemId}/${itemId}--${[v + 1] + '-' + Date.now() + imgExtension}`; // OLD ---> Ex. resources/img/caravans/Caravan-Knaus-Sunshine-540-D2025-01-21T17-59-45.662Z/Caravan-Knaus-Sunshine-540-D2025-01-21T17-59-45.662Z-1
//             imagesPathArray.push(convertToJsDelivrPath(githubFilePathForImg)); // Add the path to the array that will hold all paths. It is late used to get js delivr paths and then add it to the json object before sending to the server
//             okResponse = await readImgAsBase64AndUpload(images[v], `${[v + 1]} от ${[images.length]}`, githubFilePathForImg);
//         }
//         else {
//             // Here code to remove the last added images................
//             // Need to have variables to remember the name and path, then use delete function from CRUF file to delete each image
//         }
//         // await readImgAsBase64AndUpload(images[v], `${[v+1]} от ${[images.length]}`, githubFilePathForImg); 
//     }
//     return imagesPathArray;
// }





function validateImgPickerFilesOnlyImg() {
    let imgPicker = document.getElementById('imgPicker'); // Get the img picker. The FileList or the input type File is read only and can not remove items from it but it is possible to assign new data objext to it 
    const dt = new DataTransfer(); // Data transfer obj hold the data
    const { files } = imgPicker; // Destruct - get the files from img picker in files variable

    let curImgExt;

    for (let z = 0; z < files.length; z++) // loop the current files in the img picker
    {
        // images[v].name.slice((Math.max(0, images[v].name.lastIndexOf(".")) || Infinity) + 1); // Get the file extension of the image - .jpg, .png 
        curImgExt = files[z].name.slice((Math.max(0, files[z].name.lastIndexOf(".")) || Infinity) + 1); // Get file extension .png, .exe .txt . jpg but it is without the dot
        // if(curImgExt !== 'jpg'|| curImgExt !== 'png' || curImgExt !== 'gif' || curImgExt !== 'webp' || curImgExt !== 'bmp' || curImgExt !== 'tiff')

        if (curImgExt == 'png' || curImgExt == 'jpg' || curImgExt == 'jpeg' || curImgExt == 'bmp' || curImgExt == 'gif' || curImgExt == 'tif' || curImgExt == 'webp') {
            dt.items.add(files[z]); // Add only images to the data transfer obj that will later be assigned to the imgPicker, so here excluding all the unececery files, they are just not added.
        }
    }

    imgPicker.files = dt.files; // Assign the image picker with the correct data excluding the files that are not photos .png, .jpg etc.
}





async function imgPickerHandler() {

    if (editItemImgArr[slideImgIndex] != null) // Only if not null or undefined - if in add view mode then it will be null since there are no images in add mode when opening it
    {
        await executeCompression(imgCompressionSizeGlobal, imgCompressionExtensionGlobal, false, false); // The compression tools options, saturation, rotation etc.
    }


    validateImgPickerFilesOnlyImg(); // Validate if images else remove from the img picker
    let currentUrlPath = window.location.pathname; // The current path - ex. Edit or Add

    if (currentUrlPath == "/Add") {
        await imgPickerImagesToLocalArrEdit(); // The img picker images to the local array
    }
    else if (currentUrlPath == "/Edit") {
        await imgPickerImagesToLocalArrEdit(); // The img picker images to the local array
        // updateViewImageIndexIndication(); // Updating the image count indication

    }

    // await handleImages(); // Add & show the images in the imgView container // This one is moved to   await imgPickerImagesToLocalArrEdit();
}






// The images from the picker to the local array - And add the same images to the previewImgHolder so that the user can see them isntead of previiously using the blob create link. Because when deletingg an image It can not be chosen aain from the file explorer
async function imgPickerImagesToLocalArrEdit() {
    let imgPicker = document.getElementById('imgPicker');
    let readerFile;

    let imgPrevContainer = document.getElementById('previewImgHolder');
    let imgHtml = '';


    for (let i = 0; i < imgPicker.files.length; i++) {
        readerFile = await readFileAsync(imgPicker.files[i]); // Read Img as base 64 from async reader
        // let dataBase64Img = readerFile.split(',')[1]; // Remove "data:image/png;base64," so it is raw image base64
        editItemImgArr.push(readerFile); // Image base 64 img push to array
        console.log('ArrayLoclaBase64:' + editItemImgArr);
        // editItemImgArr.push(window.URL.createObjectURL(imgPicker.files[i])); // Image local src push to array

        imgHtml += `<img class="slide" src="${readerFile}">`;

    }

    imgPicker.value = ''; // Clear the imgPicker - so that if img is deleted tht there is posibility to add the image to the array again otherwise it can not chose the image since it remembers the name of the selected image, this image is in the editLocalArray and then ex. removed, but it is still found selected in the img picker

    imgPrevContainer.innerHTML += imgHtml; // Add the image as html to the container to display it
    await toggleSlideImg(0); // Refresh the image holder
}





// Add the images from the db in the view image container
function handleImagesEditView(assignHtml, n) {

    let imgPrevContainer = document.getElementById('previewImgHolder');

    console.log('Arr 2: -------------------------' + editItemImgArr);

    let imgHtml = '';
    for (let i = 0; i < editItemImgArr.length; i++) {

        imgHtml += `<img class="slide" src="${editItemImgArr[i]}">`;
    }

    // slideImgIndex = 0; // Reset the index for the images preview container, the slide with the image. Otherwise something happens and does not show the image, goes out of the array // It is also reseted in the main.js on every view change

    if (assignHtml != undefined && assignHtml == true) {
        imgPrevContainer.innerHTML = imgHtml; // Assign the images html to the container to display it // Used when img is deleted from the local array in order for the view image container to update properly
    }
    else {
        imgPrevContainer.innerHTML += imgHtml; // Add the images as html to the container to display it. Keep the old images
    }
    // toggleSlideImg(0); // Refresh the image holder

    imgSlideNavigation(n); // Navigate to n image. Show image index = n
    updateViewImageIndexIndication(); // Updating the image count indication
}




// Delete current imgage Add & Edit view ----------------------------------------------------------------------------------

async function deleteCurrentImg() {
    // //   alert(editItemImgArr);
    // //   alert(slideImgIndex); 
    // console.log('Before Arr:' + editItemImgArr);
    // let imgIndex = slideImgIndex;
    // await deleteFileAsync(githubUser, githubRepo, editItemImgArr[slideImgIndex], githubToken, `Deleted - Image by Admin in the View: ${editItemImgArr[slideImgIndex]}`);

    if (editItemImgArr.length > 0) // If the array is not empty - since if there are no images and delete is pressed undefined is pushed to the array
    {
        if (editItemImgArr[slideImgIndex].startsWith('http')) // If link - most likely jsdelivr link
        {
            deleteImagesEditArr.push(editItemImgArr[slideImgIndex]); // Add the deleted image to the array that holds the deleted images // they will be deleted when the save button is presses in the methos saveEdit
        }
        // deleteImagesEditArr.push(editItemImgArr[slideImgIndex]); // Add the deleted image to the array that holds the deleted images // they will be deleted when the save button is presses in the methos saveEdit
        editItemImgArr.splice(slideImgIndex, 1); // Remove the deleted image from the local array

        console.log('Arr Delete: ---------------------' + editItemImgArr);

        // console.log('After Arr:' + editItemImgArr);
        // console.log('Index after:' + slideImgIndex);
        // let imgIndex = slideImgIndex;
        if (slideImgIndex - 1 >= 0) // Maintain the image index. Because of deleting an image -1 to the index, show previouse image
        {
            slideImgIndex = slideImgIndex - 1;
        }
        // editItemImgArr.splice(slideImgIndex, 1); // Remove the current image - based on the current index in the view from the local array holding the img links
        handleImagesEditView(true, slideImgIndex); // Use the local array to populate the img view container

        // resetImgCompressionFields(); // Clear the img compression fields
        // slideImgIndex = slideImgIndex-1; // Change the index of the currrent image since we are deleting one image

        // toggleSlideImg(-1);
        // imgSlideNavigation(imgIndex);
        // console.log(slideImgIndex);

        // handleImages(); // Add & show the images in the imgView container
    }
}






// Convert to js deliver path ===================================================
function convertToJsDelivrPath(path) {
    // let jsDelivr = 'https://cdn.jsdelivr.net/gh/stevicamp/Stevicamp@main/index.html';
    let jsDelivrPath = `${cdn}/${githubUser}/${githubRepo}/${path}`;
    return jsDelivrPath;
}


// // Generate Title ================================================================
// function generateCaravanTitle()
// {
//     let brand = document.getElementById('caravanBrand');
//     let model = document.getElementById('caravanModel');
//     let length = document.getElementById('caravanLength');
//     let year = document.getElementById('caravanYear');
//     let genTitle = `${brand.value}-${model.value}-${length.value}-${year.value}`;

//     document.getElementById('title').value = genTitle;
// }







// Create Name with unique Id ================================================================================================
function createId(productName) {
    var date = new Date(); // New Date object
    var idDate = date.toISOString().replace(/:/g, "-"); //Create - new DateTime and replace the ":" with "-"  the "/g" means replace all. Because ":" is not allowed to be in a file name.
    var idName = 'id_' + productName + '-D' + idDate;
    // var idName = productName + 'D' + idDate + "!" + Math.random().toString(36).substring(2, 12); // Combine the data to get file name with ID. The pattern is [TheProduct-NAME AND MODEL-TheDateAndTime - UNIQUE ID]

    return idName; //'The Product Type-Model-DateTime-Id'
}




//:::::::::::::::::::::::::: EDIT :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
// async function editItemByItemLink(itemLink)
// {
//     let itemId = itemLink.split('?search=')[1];
//     // window.location.href = `/Edit?${itemId}`;
//     // window.history.pushState("data-link", "",  `/Edit?${itemId}`); 
//     // location.href =`/Edit?${itemId}`;
//     // await loadAppropriateFields();

//     // console.log(editItemByItemLink.caller.name);
//     // event.target.href = `/Edit?${itemId}`;
//     // router();
//       var a = document.createElement('div');  
//       a.innerHTML += `<a href="/Edit?${itemId}" data-link></a>`;
//     //   console.log(a.innerHTML);
//       console.log(itemId);
//       a.childNodes[0].click();
//     //   a.href = `/Edit?${itemId}`;
//     //   a.click();

// }



//:::::::::::::::::::::::::: DELETE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 
async function deleteItemByItemLink(itemLink) {
    // Here add - show modal are you sure you want to delete
    let db = await getDbAsync(); // Get the db
    let itemId = itemLink.split('?search=')[1]; // Get the item id from the item link
    let rawItem = await recursiveSearchObj(db.items, itemId); // Find the raw item by using the id 
    let item = Object.values(rawItem)[0][0]; // [0] = ex. "caravans" [0] = the first item in the array - basicaly it is only one because only one item at a time will be deleted
    db['items'][`${item.category}`].splice(item.index, 1); // Remove the item from the local DB // keyword "delete" can be used too - but is a little different 

    // Here loop all images photos and delete each one

    let updatedDbAsJson = JSON.stringify(db);
    await updateJsonFileAsync(githubUser, githubRepo, githubFilePathDb, githubToken, updatedDbAsJson, `Admin - Deleted item in APP: ${item.id}`); // Update the DB so the deleted item is no longer in the remote db
    await deleteItemImagesByLinks(item.photos); // Delete the images of the item that has to be deleted

    // #If image delete fails get the item id and update the error file in github for later manual removement of the images
    // #Make clean up button that searches the db for the specific item if it does not excist searches for the images if they excist delete them
    // Here update the db - json file with the new local DB without the deleted item 



    console.log(item);
    //   delete item; 
}






async function deleteLocalItemById(itemId) {
    // Here add - show modal are you sure you want to delete
    let db = await getDbAsync(); // Get the db 
    let rawItem = await recursiveSearchObj(db.items, itemId); // Find the raw item by using the id 
    let item = Object.values(rawItem)[0][0]; // [0] = ex. "caravans" [0] = the first item in the array - basicaly it is only one because only one item at a time will be deleted
    db['items'][`${item.category}`].splice(item.index, 1); // Remove the item from the local DB // keyword "delete" can be used too - but is a little different 


    console.log("Deleted item - deleteLocalItemById:" + item);
    //   delete item; 
}




async function deleteItemImagesByLinks(imgLinkArray) {
    // .split("/")[1]; // Is used to get the raw github link from the js delivr link
    for (let k = 0; k < imgLinkArray.length; k++) {
        let currentImgLink = imgLinkArray[k].split(`${cdn}/${githubUser}/${githubRepo}/`)[1];
        await deleteFileAsync(githubUser, githubRepo, currentImgLink, githubToken, `Deleted: ${imgLinkArray[k]}`);
    }
}











// Auto Load Credentials ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function autoLoadCredentialsGlobal() {
    // Load auto credentials
    let autoLoadCredentials = localStorage.getItem("loadCredentialsAuto");

    if (autoLoadCredentials !== undefined && autoLoadCredentials === 'true') {
        loadCredentialsFromLocalStorageToGlobalVariables();
    }
}




// Load Credentials
function loadCredentialsFromLocalStorageToGlobalVariables() {
    // Get data from local Storage and populate the "local variables" that are global and are found in the CRUD.js file.
    githubUser = localStorage.getItem("githubUser");
    githubRepo = localStorage.getItem("githubRepo");
    githubToken = localStorage.getItem("githubToken");
    githubFilePathDb = localStorage.getItem("githubFilePathDb");
    console.log(githubToken);
}









// Execute on script Load ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
autoLoadCredentialsGlobal(); // Auto execute when efaultscript.js is loaded



//================IMG-Compression===============================================================================================
let canvas = document.createElement("canvas"); // Create canvas, so to reuse the canvas for better performance
let ctx = canvas.getContext("2d"); // Context
let rotatedStep = 0; // 0,1,2,3 → 0°, 90°, 180°, 270°


// async function rotateBase64Img90deg(base64Data, extension) {
//     var image = new Image();
//     image.src = base64Data;
//     ctx.setTransform(1, 0, 0, 1, 0, 0); // // Clear the canvas - reset rotation/scale
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Clea
//     ctx.translate(image.width, image.height);
//     ctx.rotate(180 * Math.PI / 180);
//     let dataUrl = canvas.toDataURL(`image/${extension}`, 1);
//     return dataUrl;
// }



async function rotateBitmapImg90deg(bitmap, applyPrevRotation) {

    if (!applyPrevRotation) {
        // const bitmap = await createImageBitmap(blobImg); // Decode the Blob/File into an ImageBitmap (fast, off-thread decoding)
        rotatedStep = (rotatedStep + 1) % 4; // 0→3 cycling // Modulus 0%4=0; 1%4=1; 4%4=0; 5%4=1; // So that it is between 0-3 // Prepare for the next - // Increase rotation step and keep it between 0–3 // 0 = 0°, 1 = 90°, 2 = 180°, 3 = 270°
    }

    // ctx.setTransform(1, 0, 0, 1, 0, 0); // // Clear the canvas - reset rotation/scale - // Reset the canvas transformation matrix // Clears any previous rotation, scaling, or translation
    // // Decide canvas size based on rotation  // Even steps (0, 2) → image is upright or upside-down // Odd steps (1, 3) → image is sideways, so width/height must be swapped
    // // Canvas size depends on rotation
    if (rotatedStep % 2 === 0) { // 0° or 180° // vertical orientation both vertical right & vertival left
        canvas.width = bitmap.width; // Normal width
        canvas.height = bitmap.height; // Normal height
    }
    else { // Not rotated or upside down - horizontal orientation both up and down
        // 90° or 270°
        canvas.width = bitmap.height; // Swap width
        canvas.height = bitmap.width; // Swap height
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the entire canvas to remove any previous image
    ctx.translate(canvas.width / 2, canvas.height / 2);// Move origin to center // Move the canvas origin (0,0) to the center of the canvas  // This allows rotation around the image center instead of top-left
    ctx.rotate(rotatedStep * Math.PI / 2); // Rotating before drawing - // Rotate the canvas  // Each step is 90 degrees → π/2 radians // 0 * π/2 = 0°  // 1 * π/2 = 90° // 2 * π/2 = 180°  // 3 * π/2 = 270°

    // ctx.filter = `saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%)`; // The saturation, contrast, brightness 

    ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2, bitmap.width, bitmap.height); // Draw centered - // Draw the image centered at the new origin (0,0) // Negative half-width/height centers the image correctly
    // //  -bitmap.width / 2,   // Left edge of image
    // //     -bitmap.height / 2,  // Top edge of image
    // //     bitmap.width,        // Image width
    // //     bitmap.height        // Image height
    // let dataUrl = canvas.toDataURL('image/png'); // Export the canvas as a PNG Base64 data URL (lossless) otherwie if it is rotated several times it gets blury if webo or jpg
    // return dataUrl;
    return await createImageBitmap(canvas);

}





async function compressImage(blobImg, newHeight, fromat, percent, smoothing, rotate, saturation, contrast, brightness) {
    // blobImg - an image from the input type="file" that is FileList ex. theInputElementGottenById.files[0] = an blob image
    // fromat = jpeg; or png; or etc.
    // percent from 0-100%
    let bitmap = await createImageBitmap(blobImg); // Create image bitmap



    if (rotate) {
        bitmap = await rotateBitmapImg90deg(bitmap, false); // The rotated image as bitmap 
    }
    else if (rotatedStep > 0) {
        bitmap = await rotateBitmapImg90deg(bitmap, true); // Apply rotation from previouse time if there is no rotation know
    }

    let newWidth = bitmap.width;

    if (newHeight && Math.abs(bitmap.height - newHeight) > 1) // Beacuse browser can take +- 1 px somehow? Broesers somethimes decode images off 1px says the robot? // Another Ex. Math.abs(100 - 750) = 650
    {
        //    newWidth = newHeight * (bitmap.width / bitmap.height); 
        // drawHeight = newHeight; // The Height that is provided ex. 750 px.
        newWidth = Math.round(newHeight * (bitmap.width / bitmap.height)); // (Calc. the new width) if newHeight is present then calc the new width else use the bitmap.width // Math round so to get the clossest possible, not floo, not celi. Because new with can be ex. 499.7 . Now rounds it to 500 px
    }
    else {
        newHeight = bitmap.height;
    }


    // Calculate dimensions
    // const ratio = bitmap.width / bitmap.height; // Calc. the ratio 
    // const newWidth = newHeight * (bitmap.width / bitmap.height); // (Calc. the new width) if newHeight is present then calc the new width else use the bitmap.width 

    // ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    //   ctx.setTransform(1, 0, 0, 1, 0, 0); // To clear the old canvas // And this do I need it? // No need of this because of hte resizing the canvas the resizing does it
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Options  
    if (smoothing === true) {
        ctx.imageSmoothingEnabled = smoothing;// The soothing of image so there are not edges, but it gets litle blured instead of sharp edges
        ctx.imageSmoothingQuality = "high"; // If smoothing true then use it // Smoothing the image, so it is not very sharp   

        // Flip img horizontaly
        // ctx.translate(canvas.width, 0);
        // ctx.scale(-1, 1);
    }

    ctx.filter = `saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%)`; // The saturation, contrast, brightness 
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    let dataUrl = canvas.toDataURL(`image/${fromat}`, percent / 100);
    return dataUrl;
}


function resetImgCompressionFields() {

    rotatedStep = 0; // Reset the rotation step
    document.getElementById('imgCompressionSlider').value = 100;
    document.getElementById('imgSaturrationSlider').value = 100;
    document.getElementById('imgContrastSlider').value = 100;
    document.getElementById('imgBrightnessSlider').value = 100;
}


// 0. Executon
async function executeCompression(newHeight, extension, rotate, save) {

    let rawImg = editItemImgArr[slideImgIndex];  // The img
    let img;

    if (typeof rawImg === "string" && /^https?:\/\//i.test(rawImg)) // If Link // The last is regular expression // !(rawImg instanceof Blob) && 
    {
        const response = await fetch(rawImg);
        img = await response.blob();
    }
    else if (!(rawImg instanceof Blob) && typeof rawImg === "string" && rawImg.startsWith('data:image/')) // Check if base64 and convert to blob
    {
        let cleanBase64 = rawImg.replace(/^data:[^;]+;base64,/, ""); // Remove the data: so to work with Unit8Array
        img = new Blob([Uint8Array.fromBase64(cleanBase64)]); // Base 64 to blob to use in the canvas
    }

    let imgSmoothing = document.getElementById('enableSmoothCheckbox').checked; // Smoothing checkbox true / false. So the image is not sharp when downscaled

    let compPercent = document.getElementById('imgCompressionSlider').value; // The percantage
    let saturation = document.getElementById('imgSaturrationSlider').value;
    let contrast = document.getElementById('imgContrastSlider').value;
    let brightness = document.getElementById('imgBrightnessSlider').value;

    let imgCompressed = await compressImage(img, newHeight, extension, compPercent, imgSmoothing, rotate, saturation, contrast, brightness); // img = blob; newHeight (ex.) = 750; extension = png; jpeg; webp; compPercent = (from 0 to 100); imgSmoothing = true / false; rotate = true / false; 

    let slideArr = document.getElementsByClassName('slide');

    // let currentSlide;

    // Get the slide that is style.display: block; the image that is viewed the other images are also slide css class but hidden; display: none;
    for (let b = 0; b < slideArr.length; b++) {
        const style = window.getComputedStyle(slideArr[b]);
        if (style.display === 'block') {
            // currentSlide = slideArr[b]; // Show the edited compressed image to the view 
            slideArr[b].src = imgCompressed; // Show the edited compressed image to the view  // Assign the image so to the current slide img to be shown to the user
            break;
        }
    }

    if (save !== undefined && save === true) {
        if (editItemImgArr[slideImgIndex].startsWith('http')) {
            deleteImagesEditArr.push(editItemImgArr[slideImgIndex]);
        }
        editItemImgArr[slideImgIndex] = imgCompressed; // Assign it to the local array so that the actual edited compressed image is in the array
    }

    // currentSlide.src = imgCompressed; // Assign the image so to be shown to the user
    // editItemImgArr[slideImgIndex] = imgCompressed; // Assign it to the local array so that the actual edited compressed image is in the array
    document.getElementById('imgCompressionSliderLabel').textContent = 'Compr.:' + compPercent + '%'; // Update the label that shows the percantage
    //    document.getElementById('imgSizeLabel').textContent = Math.ceil(((imgCompressed.length*6)/8)/1024) + 'kb'; // Update the label that shows the image size
    document.getElementById('imgSizeLabel').textContent = 'Curr. Size:' + (imgCompressed.length * 0.75 / 1024).toFixed(1) + 'kb; '; // Update the label that shows the image size. 6/8 = 0.75 also handles the padding of base64 string. there is == etc. - 1,024 Bytes: 1 Kilobyte (KB).
    //    document.getElementById('imgOriginalSizeLabel').textContent = 'Orig. Size:' + img.size.toLocaleString() + 'kb'; // The original size
    document.getElementById('imgOriginalSizeLabel').textContent = 'Orig. Size:' + (img.size / 1048576).toFixed(2) + 'MB; '; // The original size - from bytes to MB - 1,048,576 Bytes = 1 Megabyte (MB). 
    // document.getElementById('imgFileName').textContent = 'File Name:' ;
    document.getElementById('imgSaturationLabel').textContent = saturation + '%'; // The satiration value to the user
    document.getElementById('imgContrastLabel').textContent = contrast + '%'; // The satiration value to the user
    document.getElementById('imgBrightnessLabel').textContent = brightness + '%'; // The satiration value to the user
    // document.getElementById('imgSizeInPx').textContent = 'Compr. Pixels:......';
}




// // 1. The inputIMG
// document.getElementById('inputImg').addEventListener('change', async (e) => {

//  
//     await executeCompression(750, 'webp', false);
// });


function imgCompressionEventDeclaraton() {



    // 2. The compression slider
    document.getElementById('imgCompressionSlider')?.addEventListener('input', async () => {

        await executeCompression(imgCompressionSizeGlobal, imgCompressionExtensionGlobal, false, false);
    });


    // 3. The saturation slider
    document.getElementById('imgSaturrationSlider')?.addEventListener('input', async () => {

        await executeCompression(imgCompressionSizeGlobal, imgCompressionExtensionGlobal, false, false);
    });


    // 4. The Contrast slider
    document.getElementById('imgContrastSlider')?.addEventListener('input', async () => {

        await executeCompression(imgCompressionSizeGlobal, imgCompressionExtensionGlobal, false, false);
    });


    // 5. The Brightness slider
    document.getElementById('imgBrightnessSlider')?.addEventListener('input', async () => {

        await executeCompression(imgCompressionSizeGlobal, imgCompressionExtensionGlobal, false, false);
    });



    // 6. The checkbox
    document.getElementById('enableSmoothCheckbox')?.addEventListener('change', async () => {
        await executeCompression(imgCompressionSizeGlobal, imgCompressionExtensionGlobal, false, false);
    });

    // 7. Img Rotate
    document.getElementById('imgRotate')?.addEventListener('mousedown', async () => {
        await executeCompression(imgCompressionSizeGlobal, imgCompressionExtensionGlobal, true, false);
    });

    // 8. Img Save
    document.getElementById('imgCompressionSave')?.addEventListener('mousedown', async () => {
        await executeCompression(imgCompressionSizeGlobal, imgCompressionExtensionGlobal, false, true);
        resetImgCompressionFields();
    });

}



// ---------IMG-Compression-Html--------------------------------------------------------------------------

function imgCompressionHtml() {
    return `   <div class="imgCompressionContainer">
        
        <div class="col">
        <img src="static/img/icons/compress.png"/>
        <span id="imgCompressionSliderLabel"></span>
        <input type="range" min="1" max="100" value="100" id="imgCompressionSlider">
        </div>
        
        <div class="col">
        <img src="static/img/icons/load.png"/>
        <span id="imgSizeLabel"></span>
        <span id="imgOriginalSizeLabel"></span>
        </div>

        <div class="col">
        <span id="imgSizeInPx"></span>
        <span id="imgFileName"></span>
        </div>
        
        <div class="col">
        <img src="static/img/icons/smoothing.png"/>
        <span>Smoothnes:</span>
        <input type="checkbox" id="enableSmoothCheckbox">
        </div>

        <div class="col">
        <img src="static/img/icons/saturate.png"/>
        <span id="imgSaturationLabel"></span>
        <input type="range" min="50" max="350" value="100" id="imgSaturrationSlider">
        </div>
        
        <div class="col">
        <img src="static/img/icons/contrast.png"/>
        <span id="imgContrastLabel"></span>
        <input type="range" min="90" max="120" value="100" id="imgContrastSlider">
        </div>

        <div class="col">
        <img src="static/img/icons/brightness.png"/>
        <span id="imgBrightnessLabel"></span>
        <input type="range" min="90" max="120" value="100" id="imgBrightnessSlider">
        </div>

        <div class="col">
        <button id="imgRotate">Rotate</button>
        <button id="imgCompressionSave">Save Image</button>
        </div>   
   
        </div>`;
}

// <button id="imgRotate">Rotate</button>
// <button id="imgCompressionSave">Save Image</button>