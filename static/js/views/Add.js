// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return  `<div class="admin-content-holder" style="height: 98%; box-sizing: border-box; display: flex; flex-direction: column;
    align-items: center;">
           
   
            <div id="credentialsContainer" class="admin-credentials-holder" style="display: none;">
            <span>Github User:</span>
            <input id="githubUser" type="text" placeholder="Github User - 'stevicamp'" value="stevicamp"> 
            <span>Github Repo:</span>
            <input id="githubRepo" type="text" placeholder="Github Repository - 'Stevicamp'" value="Stevicamp">
            <span>Github Token:</span>
            <input id="githubToken" type="password" placeholder="Github acces token">
            <span>File path: <a target="_blank" id="githubFilePathDbLink" href="">Отваряне на Файла</a></span>
            <input id="githubFilePathDbInput" type="text" placeholder="Github file path - to update - 'the DB'" value="">
            
            <button id="saveCredentialsBtn">Запази парола / данни</button>
            <button id="loadCredentials">Зареди парола / данни</button>
            <span>Авто. Зареждане на парола</span>
            <input  id="loadCredentialsAutoCheckbox" type="checkbox" title="Автоматично зареждане на парола / данни">
            <button id="clearCredentials">Изчисти парола / данни</button>

            <span>Поле за обновяване на ДБ:</span>
            <textarea id="developerInput" type="text" cols="40" rows="5" placeholder="Json content to update the file with - UPDATES THE WHOLE DB WITH THE PROVIDED TEXT! - Erases all old."></textarea>
            
           <button id="saveDbBtn">Запази в ДБ</button>
            </div>
               <button id="admin-credentials-toggler"  style="width: 100%;">
                    Покажи данни ▼
               </button> 

              <select name="itemType" id="itemType">
                 <option value="">--Избери Артикул--</option>
                 <option value="caravans">1.Каравана</option>
                 <option value="trailers">2.Ремарке</option>
                 <option value="cars">3.Кола</option>
                 <option value="products">4.Продукти</option>
                 <option value="wheels">5.Гуми</option>
                 <option value="microbuses">6.Микробус</option>
                 <option value="appliances">7.Бяла техника</option>
                 <option value="scooters">8.Скутери</option>
                 <option value="equipment">9.Екипировка</option>
               </select>
           
               <div style="width: 100%; height: 88%; box-sizing: border-box; display: flex;" id="aproppiriateFieldsContainer"></div> 
               </div> 
            `;

         

}


  

// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Добави", "add");


        

        document.getElementById("loadCredentials").addEventListener("click", loadCredentialsFromLocalStorageToInputs);
        document.getElementById("saveCredentialsBtn").addEventListener("click", saveCredentials);
        document.getElementById("clearCredentials").addEventListener("click", clearLocalStorageCredentials);
        document.getElementById("admin-credentials-toggler").addEventListener("click", toggleAdminCredentials);
        document.getElementById("loadCredentialsAutoCheckbox").addEventListener("click", toggleAutoLoadCredentials);
        
        
        document.getElementById("itemType").addEventListener("change", loadAppropriateFields);
        
        document.getElementById("saveDbBtn").addEventListener("click", ()=> {constructUpdateAndUpdate(document.getElementById("developerInput").value, githubFilePathDb, 'Admin - Manual Update in APP')}); 
        
       
     

      
 

        
// // Github api ......................................................
// const owner = "stevicamp";
// const repo = "Stevicamp";
// const path = "test.json";
// const token = "3838828a07fe1baadd5934f0902c70deeac9b60f"; // Use a personal access token with 'repo' scope

// New JSON content
// const newContent = {
//   title: "New DB",
//   author: "The name of author",
//   price: 50
// };
 
 
 




// Auto Load credentials - only works if in Add view
autoLoadCredentials();
}










        // Update the json file - The DB
        async function constructUpdateAndUpdate(jsonData, filePath, msg)
        {
           await updateJsonFileAsync(githubUser, githubRepo, filePath, githubToken, jsonData, msg);
        }
     

        // Toggle credentials cotnainer ................................................
        async function toggleAdminCredentials()
        {
            let credentialsContainer = document.getElementById('credentialsContainer');
            let adminCredentialsToggler = document.getElementById('admin-credentials-toggler');

            if(credentialsContainer.style.display == 'none')
            {
                 credentialsContainer.style.display = 'flex';
                 adminCredentialsToggler.innerHTML = 'Скрий данни ▲';
                 await populateDeveloperInputAsync();
            }
            else
            {
                 credentialsContainer.style.display = 'none';
                 adminCredentialsToggler.innerHTML = 'Покажи данни ▼'; 
            }

        }


// Populate developer input ==============================================
 async function populateDeveloperInputAsync()
  {
    let db = await getDbAsync();
    let jsonDb = JSON.stringify(db);
    let developerInput = document.getElementById("developerInput");
    developerInput.value = jsonDb;
  }




        // Set Credentials ...............................................................
        function saveCredentials() 
        {
            // Save data from inputs to local variables
            githubUser = document.getElementById("githubUser").value;
            githubRepo = document.getElementById("githubRepo").value;
            githubToken = document.getElementById("githubToken").value;
            githubFilePathDb = document.getElementById("githubFilePathDbInput").value;

            // Save data to local storage
            localStorage.setItem("githubUser", githubUser);
            localStorage.setItem("githubRepo", githubRepo);
            localStorage.setItem("githubToken", githubToken); 
            localStorage.setItem("githubFilePathDb", githubFilePathDb); 
        }


        // Load Credentials
        function loadCredentialsFromLocalStorageToInputs() 
        { 
            // Get data from local Storage and populate the local variables
           loadCredentialsFromLocalStorageToGlobalVariables(); // Found in the defaultscripts.js

            // Populate inputs
            document.getElementById("githubUser").value = githubUser;
            document.getElementById("githubRepo").value = githubRepo;
            document.getElementById("githubToken").value = githubToken;
 
            
            document.getElementById("githubFilePathDbInput").value = githubFilePathDb; 
            document.getElementById("githubFilePathDbLink").href = `https://github.com/${githubUser}/${githubRepo}/blob/main/${githubFilePathDb}`; // Link to open
        }
        
        
        // Auto load credentials
        function autoLoadCredentials()
        {
            // Load auto credentials
           let autoLoadCredentials = localStorage.getItem("loadCredentialsAuto");

           // Checkbox auto load credentials
           document.getElementById("loadCredentialsAutoCheckbox").checked = (autoLoadCredentials === 'true');

          if(autoLoadCredentials !== undefined && autoLoadCredentials === 'true')
          {
            loadCredentialsFromLocalStorageToInputs(); 
            document.getElementById("githubToken").type = "text";
          } 
        }


        // Auto load credentials
      function toggleAutoLoadCredentials()
      {
        let cheked = document.getElementById("loadCredentialsAutoCheckbox").checked;
        if(cheked == true)
        {
            localStorage.setItem("loadCredentialsAuto", 'true');
        }
        else
        {
            localStorage.setItem("loadCredentialsAuto", 'false');
        }
      }

        function clearLocalStorageCredentials()
        {
          // Clear the local storage
          localStorage.removeItem("githubUser");
          localStorage.removeItem("githubRepo");
          localStorage.removeItem("githubToken");
          localStorage.removeItem("githubFilePathDb");
        }


        async function loadAppropriateFields()
        {

          let apFields = document.getElementById("aproppiriateFieldsContainer");
          let valueType =  document.getElementById("itemType").value;

          if(valueType == "caravans")
          {
             apFields.innerHTML = await caravansHtmlTemplateFields();
             document.getElementById("saveItemButton").addEventListener("click", (e)=> {saveItem(e)}); // For upload
             document.getElementById("generateCaravanTitleBtn").addEventListener("click", generateCaravanTitle); // Generate caravan title
            //  document.getElementById("imgPicker").addEventListener("onchange", handleImages); // For the modal
          }
          
           
        }
 



// Save Item ---------------------------------------------------------------------
async function saveItem(e)
{ 
   let type = document.getElementById('itemType').value; // Used - constructin obj and For saving it in github in specific folder type - caravans, cars, products etc.
   let itemName = document.getElementById('title').value; // For Creating Id
   const formData = convertFormToJsonById('modalItemDetails');
   let itemId = formData.id;

   if(itemId == null || itemId == "" || itemId == undefined) // If ID is null, empty or undefined, create ID. Becausethis is used also in the edit view. THe code is reused both for add and edit. When you add there is no ID, but when you edit there is id
   {
     itemId = formData.id = createId(itemName); 
   }
   
   let imagesJsDelivrPathArray = await handleItemImages(itemId, type);// Upload Images and return jsDelivr path for the images
    
   formData.photos = imagesJsDelivrPathArray; // Add the photos array to the json object that will be uploaded
   formData.id = itemId;
   formData.category = type; // Add the type to the item itself - where the id, title, price etc. is. It is used un the logic to show the modal
   formData.sold = "false";  

   let db = await getDbAsync();

   db.items[type].push(formData); // Add the item to the local db - later the whole db will be uploaded
    
   let jsonDb = JSON.stringify(db);
   document.getElementById("developerInput").value = jsonDb;  // Populate the textbox that shows the db in developer mode
   await constructUpdateAndUpdate(jsonDb,githubFilePathDb, `Admin - Added new item in APP: ${formData.id}`);
       
            
       
     
  
   // #1. Here get the links for the uploadded images if responese ok
   // #2. Convert to js delivr url.
   // #3. Get all inputs from the form and construct json and add the js delivr links
   // 4. Update the db
   // 5. Fix the db to have not latin char but without uri encoding - maybe onvert the json to base 64 without he uri
}



// Handle local images - read as base 64 and upload ---------------------------------------
async function handleItemImages(itemId, type)
{
   let images = document.getElementById('imgPicker').files; // Get the images from the "input with type="file""
   let githubFilePathForImg ="";
   
   let imagesPathArray = [];

   let okResponse = true;
   for (let v = 0; v < images.length; v++) 
    {
        if(okResponse)
        {
            githubFilePathForImg =`resources/img/${type}/${itemId}/${itemId}-${[v+1]}.png`; // Ex. resources/img/caravans/Caravan-Knaus-Sunshine-540-D2025-01-21T17-59-45.662Z/Caravan-Knaus-Sunshine-540-D2025-01-21T17-59-45.662Z-1
            imagesPathArray.push(convertToJsDelivrPath(githubFilePathForImg)); // Add the path to the array that will hold all paths. It is late used to get js delivr paths and then add it to the json object before sending to the server
            okResponse = await readImgAsBase64AndUpload(images[v], `${[v+1]} от ${[images.length]}`, githubFilePathForImg);
        }
        else
        {
            // Here code to remove the last added images................
            // Need to have variables to remember the name and path, than use delete function from CRUF file to delete each image
        }
        // await readImgAsBase64AndUpload(images[v], `${[v+1]} от ${[images.length]}`, githubFilePathForImg); 
    }
    return imagesPathArray;
}
 

// Convert to js deliver path ===================================================
function convertToJsDelivrPath(path)
{
  // let jsDelivr = 'https://cdn.jsdelivr.net/gh/stevicamp/Stevicamp@main/index.html';
  let jsDelivrPath = `${cdn}/${githubUser}/${githubRepo}/${path}`;
  return jsDelivrPath;
}


// Generate Title ================================================================
function generateCaravanTitle()
{
    let brand = document.getElementById('caravanBrand');
    let model = document.getElementById('caravanModel');
    let length = document.getElementById('caravanLength');
    let year = document.getElementById('caravanYear');
    let genTitle = `${brand.value}-${model.value}-${length.value}-${year.value}`;

    document.getElementById('title').value = genTitle;
}







 // Create Name with unique Id ================================================================================================
    function createId(productName) { 
        var date = new Date(); // New Date object
        var idDate = date.toISOString().replace(/:/g, "-"); //Create - new DateTime and replace the ":" with "-"  the "/g" means replace all. Because ":" is not allowed to be in a file name.
        var idName ='id_' + productName + '-D' + idDate; 
        // var idName = productName + 'D' + idDate + "!" + Math.random().toString(36).substring(2, 12); // Combine the data to get file name with ID. The pattern is [TheProduct-NAME AND MODEL-TheDateAndTime - UNIQUE ID]

        return idName; //'The Product Type-Model-DateTime-Id'
    }