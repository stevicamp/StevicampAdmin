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
        
        document.getElementById("saveDbBtn").addEventListener("click", ()=> {constructUpdateAndUpdate(document.getElementById("developerInput").value, githubFilePathDb)}); 
        
       
     

      
 

        
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
 
 
 




// Auto Load credentials
autoLoadCredentials();
}










  // Update the json file
        async function constructUpdateAndUpdate(jsonData, filePath)
        {
           await updateJsonFileAsync(githubUser, githubRepo, filePath, githubToken, jsonData, 'msg');
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
            githubUser = localStorage.getItem("githubUser");
            githubRepo = localStorage.getItem("githubRepo");
            githubToken = localStorage.getItem("githubToken");
            githubFilePathDb = localStorage.getItem("githubFilePathDb");

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
   let itemId = createId(itemName);
   let imagesJsDelivrPathArray = await handleItemImages(itemId, type);// Upload Images and return jsDelivr path for the images
    
   const formData = convertFormToJsonById('modalItemDetails');
   formData.photos = imagesJsDelivrPathArray; // Add the photos array to the json object that will be uploaded
   formData.id = itemId;
   formData.category = type; // Add the type to the item itself - where the id, title, price etc. is. It is used un the logic to show the modal
   formData.sold = "false";  

   let db = await getDbAsync();

   db.items[type].push(formData); // Add the item to the local db - later the whole db will be uploaded
    
   let jsonDb = JSON.stringify(db);
   document.getElementById("developerInput").value = jsonDb;  // Populate the textbox that shows the db in developer mode
   await constructUpdateAndUpdate(jsonDb,githubFilePathDb);
       
            
       
     
  
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
  let jsDelivrPath = `${jsDelivr}/${githubUser}/${githubRepo}@latest/${path}`;
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



// Base HTML For caravan -----------------------------------------------------------------------
async function caravansHtmlTemplateFields() 
{
   
      //  <img class="slide" src='${obj.photos[h]}'></img>
     
   
    return `  
     <div class="modalItemContainer" tabindex="0" style="margin-top: 0;">
    <input id="imgPicker" type="file" accept="image/*;capture=camera" multiple="multiple" onchange="handleImages()">
   <div class="img-preview-container">
    <div style="width: 100%; height: 100%;" id="previewImgHolder"></div>   

     

       <button class="arrow-left prevent-select" onclick="toggleModalImg(-1)">&#10094;</button>
       <button class="arrow-right prevent-select" onclick="toggleModalImg(1)">&#10095;</button> 
   
    </div>
  
   
    
   <div id="modalItemDetails" class="modalItemDetails" style="max-width: 400px;" tabindex="0">
   
   
   
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
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">Gen</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"></br><input id="keywords" name="keywords" placeholder="Ключови думи" value="каравана, каравани, karavana, karavani, caravans, caravan"></span>
       <hr> 
       
       <h3 class="item-title"><img src="static/img/icons/caravan.png"><u></br><input id="title" name="title" placeholder="Заглавие"></u></h3> 
       <button id="generateCaravanTitleBtn">Генер. заглавие</button>

       <button id="saveItemButton">Запази</button>
   </div>
</div>`;


}



 // Create Name with unique Id ================================================================================================
    function createId(productName) { 
        var date = new Date(); // New Date object
        var idDate = date.toISOString().replace(/:/g, "-"); //Create - new DateTime and replace the ":" with "-"  the "/g" means replace all. Because ":" is not allowed to be in a file name.
        var idName ='id_' + productName + '-D' + idDate; 
        // var idName = productName + 'D' + idDate + "!" + Math.random().toString(36).substring(2, 12); // Combine the data to get file name with ID. The pattern is [TheProduct-NAME AND MODEL-TheDateAndTime - UNIQUE ID]

        return idName; //'The Product Type-Model-DateTime-Id'
    }