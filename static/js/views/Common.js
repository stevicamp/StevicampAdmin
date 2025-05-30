﻿


export const setTitle = (title, img) => {
    document.title = title;
    // document.getElementById('current-items-title').innerHTML = title;
    document.getElementById('current-items-title').outerHTML = `<p id="current-items-title" class="item-title"><img class="item-title-img" src="static/img/icons/${img}.png" />${title}</p>`;
    document.getElementById('current-items-search-input').placeholder = 'Търсене в ' + title;
    // document.getElementById('current-items-img').src = `static/img/icons/${img}.png`;

    // Reset the search inputs on view change
    if(locationInputChanged == false) // If location was not changed trough the search input
    {
        document.getElementById('global-search-input').value = "";  
        document.getElementById('current-items-search-input').value = "";
    }
    else
    {
        locationInputChanged = false; // Reset the bool if the location was changed trough the input
    }

    // Show and hide the current searchbar ---------------------------------
    if(img == "phone" || img == "info" || img == "recovery-truck" || img == "transport-goods")
    {
        document.getElementById('currentSearchContainer').style.display = "none";
    }
    else
    {
        document.getElementById('currentSearchContainer').style.display = "flex";
    }

}

async function executeCommonViewScriptAsync()
{
    await getDb();
}

executeCommonViewScriptAsync();
// export async function getItems(itemType)  // ItemType = car, caravan, products etc.
// {
//      // The singleton Database - fetch if not already fetched
//     let db = await getDb();

//      // Use of string for better performance instead of using .innerHTML += 
//      var combined_items = ''; // Holder of the items, that are constructed and put in this variable
//      var itemLink = ''; // Holder for the constructing of a link for every item 
   
//      for (let i = 0; i < db[`${itemType}`].length; i++) 
//      {
//          itemLink = window.location + '/' + db[`${itemType}`][i].id; // Construct the link for the current item
        
//          // For every iteration there is constructed item an put in the variable "combined_items".
//          combined_items +=(`<div class="content_container_item">
//          <a href='${itemLink}'>
//              <img class="item_img" src="${db[`${itemType}`][i].photos[0]}"> </img>
//              <p>${db[`${itemType}`][i].title}</p>
//          </a>
       
//          <div class="item_buttons_wrapper">
//              <a class="item_share_button" style="background-image: url('static/img/icons/copy.png');" href="javascript:copyToClipboard('${itemLink}');"></a>
//              <a class="item_share_button" style="background-image: url('static/img/icons/viber.png');"
//                  href="viber://forward?text=${itemLink}"></a>
//              <a class="item_share_button" style="background-image: url('static/img/icons/whatsapp.png');"
//              target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?text=${itemLink}"></a>
//              <a class="item_share_button" style="background-image: url('static/img/icons/messenger.png');"
//                  href="fb-messenger://share/?link=${itemLink}"></a>
//          </div>
//                       </div>`); 
 
//      }
  
//      return combined_items;
// }



// var db = null;

// export async function getDb() {
//     if (db == null) {
//         var jsDb = await fetch('https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@latest/resources/db/database.json?1', {cache: "reload"})
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 } 
//                 return response.json(); // Probably here it parses the json to js object, so we dont need to use JSON.parse();
//             })
//             .catch(error => {
//                 console.error('Fetch error:', error);
//             });

//             db = jsDb;
//         return jsDb;
//     }
//     else
//     {
//         return db;
//     }
// }





 