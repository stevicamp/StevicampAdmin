// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() 
{
    return  `<div style="width: 100%; height: 88%; box-sizing: border-box; display: flex;" id="aproppiriateFieldsContainer"></div> 
    <input id="editItemIdInput" type="text"></input>`;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() 
{
    Common.setTitle("Редактирай", "edit");
    
    // Populate the EditInput inputbox if there is id in the url - ex. http://localhost:8080/Edit?id_Caravan-Fendt-Sunshine-540-D2025-01-21T17-59-45.662Z!idfgdfgfdg845q78
    // if(window.location.pathname != "")
    // {
    //     let editItemId = window.location.href.split('/Edit?')[1];
       
    //     if(editItemId !== undefined)
    //     {
    //         document.getElementById('editItemIdInput').value = editItemId;
    //     }
    //     else
    //     {
    //          document.getElementById('editItemIdInput').value = '';
    //     }
    // }

    let db = await getDbAsync();
    let editItemId = window.location.href.split('/Edit?')[1];
    let rawitem = await recursiveSearchObj(db.items, editItemId); // Search and get the matched item - searching by the unique id - must get one item if it excists
    let item = Object.values(rawitem)[0][0]; // The result is ex. caravans[{category:"caravans", price:"1353"}] Get the itemTp / category
    await loadAppropriateFields(item.category); // every item in the db has a category prop  
        
//1. Give name to the input fields
// 2. make loop here in Edit to loop the item and populate the properties of the itemObj to the fields that will have the same name as the object props


let inputHtmlElementsNodesArr = document.getElementById('aproppiriateFieldsContainer').getElementsByTagName("*");
  

for (var prop in item) {
    if (Object.prototype.hasOwnProperty.call(item, prop)) 
    {
         for (let i = 0; i < inputHtmlElementsNodesArr.length; i++) 
        {
           if(prop == inputHtmlElementsNodesArr[i].name)
           {
             inputHtmlElementsNodesArr[i].value = item[prop]; // The property value = item[prop]; the property name = prop; item = the whole object
           }
    
        }
        
    }
}

 
}



