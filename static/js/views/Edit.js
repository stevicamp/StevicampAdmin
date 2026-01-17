// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return `<div id="aproppiriateFieldsContainer" class="admin-content-holder modalItemContainer" tabindex="0"></div>`;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Редактирай", "edit");
    await EditLogic();
     await executeCompression(imgCompressionSizeGlobal, imgCompressionExtensionGlobal, false, false); // Used in order to populate the imgCOmpressionContainer with the relevant data on opening edit
    // Save item func in default scripts does not work since it is created acording to the add view it will not work here.
    // Image preview is not populated
    // If new image is added it will need to be uploaded
    //
}


// Used to execute script before injecting the html to the app container
export async function executeCommonViewScriptBeforeHtmlInjAsync()
{ 
     removeViewSessionElements(); // Clear the the local common array for add and edit so that there is no mixing also clear som fields
}





async function EditLogic() {
    closeItemModalOnPopState(); // If modal is opened close it so it it does not apear over the edit view

    // editItemImgArr = []; // Remove the previouse data from before
    let db = await getDbAsync(); // The Db
    let editItemId = decodeURI(window.location.href.split('/Edit?')[1]); // Decode uri so that it works with cyrilic titles if there are. Otherwise the id is encoded and it can not be found by the search func.
    let rawitem = await recursiveSearchObj(db.items, editItemId); // Search and get the matched item - searching by the unique id - must get one item if it excists
    let item = Object.values(rawitem)[0][0]; // The result is ex. caravans[{category:"caravans", price:"1353"}] Get the itemType / category
    await loadAppropriateFields(item.category); // Every item in the db has a category prop  

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

    editItemImgArr = JSON.parse(JSON.stringify(item.photos)); // Becauswe in edit mode when items are edited they edit the actual array and on close if image is removed and not saved the list of items is affected with in this case removed image. This can be bigger problem if the admin then edits another item and saves it it will save also the other element with the removed image
    // editItemImgArr = item.photos; // The images from the db (the links) to the local array
    handleImagesEditView(true,0); // Populate the image container slide and show image 1=index 0; true = assign the html, dont keep the old images if there are. In this case there should be not old images since here it opens the view. Maybe if the array is not eareased.
}


