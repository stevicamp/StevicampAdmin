// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return `<div style="width: 100%; height: 88%; box-sizing: border-box; display: flex;" id="aproppiriateFieldsContainer"></div>`;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Редактирай", "edit");
    await EditLogic();

    // Save item func in default scripts does not work since it is created acording to the add view it will not work here.
    // Image preview is not populated
    // If new image is added it will need to be uploaded
    //
}







async function EditLogic() {
    closeItemModalOnPopState(); // If modal is opened close it so it it does not apear over the edit view

    let db = await getDbAsync(); // The Db
    let editItemId = decodeURI(window.location.href.split('/Edit?')[1]); // Decode uri so that it works with cyrilic titles if there are. Otherwise the id is encoded and it can not be found by the search func.
    let rawitem = await recursiveSearchObj(db.items, editItemId); // Search and get the matched item - searching by the unique id - must get one item if it excists
    let item = Object.values(rawitem)[0][0]; // The result is ex. caravans[{category:"caravans", price:"1353"}] Get the itemType / category
    await loadAppropriateFields(item.category); // every item in the db has a category prop  

    //1. Give name to the input fields
    // 2. make loop here in Edit to loop the item and populate the properties of the itemObj to the fields that will have the same name as the object props


    let inputHtmlElementsNodesArr = document.getElementById('aproppiriateFieldsContainer').getElementsByTagName("*"); // Get all elements in the aproppiriateFieldsContainer 


    for (var prop in item) // Loop all elements and compare the name tag of every element with every property name of the item and populate the elements / inputs
    {
        if (Object.prototype.hasOwnProperty.call(item, prop)) {
            for (let i = 0; i < inputHtmlElementsNodesArr.length; i++) {
                if (prop == inputHtmlElementsNodesArr[i].name) // If the property of the item is the same name as the name tag of the current element
                {
                    inputHtmlElementsNodesArr[i].value = item[prop]; // The property value = item[prop]; the property name = prop; item = the whole object
                }

            }

        }
    }

    handleImagesEditView(item);
}



function handleImagesEditView(item) 
{ 
    editItemImgArr = item.photos;
    let imgPrevContainer = document.getElementById('previewImgHolder');

    let imgHtml = '';  
    for (let i = 0; i < editItemImgArr.length; i++) {
       
        imgHtml += `<img class="slide" src="${editItemImgArr[i]}">`;
    }

    modalImgIndex = 0; // Reset the index for the images preview container, the slide with the image. Otherwise something happens and does not show the image, goes out of the array // It is also reseted in the main.js on every view change
    imgPrevContainer.innerHTML += imgHtml; // Add the image as html to the container to display it

    toggleModalImg(0); // Refresh the image holder
} 
