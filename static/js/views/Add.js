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
            <span>File path: <a target="_blank" href="https://github.com/stevicamp/Stevicamp/blob/main/test.json">Отваряне Файла</a></span>
            <input id="githubFilePath" type="text" placeholder="Github file path - to update - 'test.json'" value="test.json">
            
            <button id="saveCredentials">Запази парола / данни</button>
            <button id="loadCredentials">Зареди парола / данни</button>
            <span>Авто. Зареждане на парола</span>
            <input  id="loadCredentialsAutoCheckbox" type="checkbox" title="Автоматично зареждане на парола / данни">
            <button id="clearCredentials">Изчисти парола / данни</button>

            <span>Поле за обновяване на ДБ:</span>
            <textarea id="developerInput" type="text" cols="40" rows="5" placeholder="Json content to update the file with - UPDATES THE WHOLE DB WITH THE PROVIDED TEXT! - Erases all old."></textarea>
           <button id="save">Запази в ДБ</button>
            </div>
               <button id="admin-credentials-toggler"  style="width: 100%;">
                    Покажи данни ▼
               </button> 

              <select name="itemType" id="itemType">
                 <option value="caravan">1.Каравана</option>
                 <option value="trailer">2.Ремарке</option>
                 <option value="car">3.Кола</option>
                 <option value="products">4.Продукти</option>
                 <option value="wheels">5.Гуми</option>
                 <option value="microbus">6.Микробус</option>
                 <option value="appliances">7.Бяла техника</option>
                 <option value="scooters">8.Скутери</option>
                 <option value="equipment">9.Екипировка</option>
               </select>
           
               <div style="width: 100%; height: 90%; box-sizing: border-box; display: flex;" id="aproppiriateFieldsContainer"></div> 
               </div>
            `;

         

}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Добави", "add");


        let githubUser ="";
        let githubRepo ="";
        let githubToken ="";
        let githubFilePath ="";
        let newContent ="";

        document.getElementById("loadCredentials").addEventListener("click", loadCredentialsFromLocalStorageToInputs);
        document.getElementById("saveCredentials").addEventListener("click", saveCredentials);
        document.getElementById("clearCredentials").addEventListener("click", clearLocalStorageCredentials);
        document.getElementById("admin-credentials-toggler").addEventListener("click", toggleAdminCredentials);
        document.getElementById("loadCredentialsAutoCheckbox").addEventListener("click", toggleAutoLoadCredentials);
        
        document.getElementById("itemType").addEventListener("change", loadAppropriateFields);
        
        document.getElementById("save").addEventListener("click", constructUpdateAndUpdate); 

        // Update the json file
        function constructUpdateAndUpdate()
        {
         updateJsonFileAsync(githubUser, githubRepo, githubFilePath, githubToken, document.getElementById("developerInput").value, 'msg');
        }
     

        // Toggle credentials cotnainer ................................................
        function toggleAdminCredentials()
        {
            let credentialsContainer = document.getElementById('credentialsContainer');
            let adminCredentialsToggler = document.getElementById('admin-credentials-toggler');

            if(credentialsContainer.style.display == 'none')
            {
                 credentialsContainer.style.display = 'flex';
                 adminCredentialsToggler.innerHTML = 'Скрий данни ▲';
            }
            else
            {
                 credentialsContainer.style.display = 'none';
                 adminCredentialsToggler.innerHTML = 'Покажи данни ▼';
            }

        }


        // Set Credentials
        function saveCredentials() 
        {
            // Save data from inputs to local variables
            githubUser = document.getElementById("githubUser").value;
            githubRepo = document.getElementById("githubRepo").value;
            githubToken = document.getElementById("githubToken").value;
            githubFilePath = document.getElementById("githubFilePath").value;

            // Save data to local storage
            localStorage.setItem("githubUser", githubUser);
            localStorage.setItem("githubRepo", githubRepo);
            localStorage.setItem("githubToken", githubToken); 
            localStorage.setItem("githubFilePath", githubFilePath); 
        }


        // Load Credentials
        function loadCredentialsFromLocalStorageToInputs() 
        { 
            // Get data from local Storage and populate the local variables
            githubUser = localStorage.getItem("githubUser");
            githubRepo = localStorage.getItem("githubRepo");
            githubToken = localStorage.getItem("githubToken");
            githubFilePath = localStorage.getItem("githubFilePath");

           
            // Populate inputs
            document.getElementById("githubUser").value = githubUser;
            document.getElementById("githubRepo").value = githubRepo;
            document.getElementById("githubToken").value = githubToken;
            document.getElementById("githubFilePath").value = githubFilePath; 

            

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
          localStorage.removeItem("githubFilePath");
        }


        async function loadAppropriateFields()
        {

          let apFields = document.getElementById("aproppiriateFieldsContainer");
          let valueType =  document.getElementById("itemType").value;
          if(valueType == "caravan")
          {
             apFields.innerHTML = await caravansHtmlTemplateFields();
          }
          
           
        }


// Base HTML For caravans -----------------------------------------------------------------------
async function caravansHtmlTemplateFields() 
{
   let db = await getDb();
      //  <img class="slide" src='${obj.photos[h]}'></img>
    let imagesHtml = '<img class="slide" src="static/img/icons/price.png">'; 
   
    return `<div class="modalItemContainer" tabindex="0" style="margin-top: 0;">


   <div class="img-preview-container">
       ${imagesHtml}

       <button class="arrow-left prevent-select" onclick="toggleModalImg(-1)">&#10094;</button>
       <button class="arrow-right prevent-select" onclick="toggleModalImg(1)">&#10095;</button> 
   
    </div>
  
   
    
   <div id="modalItemDetails" class="modalItemDetails" style="max-width: 400px;" tabindex="0">
   
   <h3 class="item-title">
   <img src="static/img/icons/caravan.png"><u><input id="title" placeholder="Заглавие"></u></h3> 
   <span style="margin: 0 0 0 auto;"><a class="item_share_button" href="javascript: copyToClipboard(copyElementTextById('modalItemDetails'));" title="Натиснете за да Копирате описанието"><img src="static/img/icons/copy.png"></a></span>
       <hr>
       <span><img src="static/img/icons/price.png"><b>Цена:</b> </br><input id="price" placeholder="Цена"></span>
       <hr>
       <span><img src="static/img/icons/brand.png"><b>Марка:</b> </br><input id="brand" placeholder="Марка"></span>
       <hr>
       <span><img src="static/img/icons/model.png"><b>Модел:</b> </br><input id="model" placeholder="Модел"></span>
       <hr>
       <span><img src="static/img/icons/calendar.png"><b>Година:</b> </br><input id="year" placeholder="Година"></span>
       <hr>
       <span><img src="static/img/icons/ruler.png"><b>Дължина:</b> </br><input id="length" placeholder="Дължинна"></span>
       <hr>
       <span><img src="static/img/icons/gear.png"><b>Състояние:</b> </br><input id="condition" placeholder="Състощние"></span>
       <hr>
       <span><img src="static/img/icons/toilet.png"><b>Тоалетна:</b> </br><input id="toilet" placeholder="Тоалетна"></span>
       <hr>
       <span><img src="static/img/icons/bath.png"><b>Баня:</b> </br><input id="bath" placeholder="Баня"></span>
       <hr>
       <span><img src="static/img/icons/heater.png"><b>Отопление:</b> </br><input id="heating" placeholder="Отопление"></span>
       <hr>
       <span><img src="static/img/icons/boiler.png"><b>Боийлер:</b> </br><input id="boiler" placeholder="Бойлер"></span>
       <hr>
       <span><img src="static/img/icons/snowflake.png"><b>АС/Климатик:</b> </br><input id="ac" placeholder="Климатик"></span>
       <hr>
       <span><img src="static/img/icons/bed.png"><b>Спални места:</b> </br><input id="sleepingPlaces" placeholder="Места за спане"></span>
       <hr>
       <span><img src="static/img/icons/tent.png"><b>Форселт:</b> </br><input id="fortelt" placeholder="Форселт"></span>
       <hr>
       <span><img src="static/img/icons/markise.png"><b>Маркиза:</b> </br><input id="marikise" placeholder="Маркиза"></span>
       <hr>
       <span><img src="static/img/icons/documents.png"><b>Документи:</b> </br><input id="documents" placeholder="Документи"></span>
       <hr>
       <span><img src="static/img/icons/plate.png"><b>Номер:</b> </br><input id="plate" placeholder="Номер"></span>
       <hr>
       <span><img src="static/img/icons/location.png"><b>Местоположение:</b> </br><input id="location" placeholder="Местоположение"></span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/description.png"><b>Описание:</b> </br><textarea id="description" placeholder="Описание"></textarea ></span>
       <hr class="hr-orange"> 
       <span><img src="static/img/icons/id.png"><b>ID:</b><font style="font-size:7px;">Gen</font></span>
       <hr>
       <span><img src="static/img/icons/keywords.png"></br><input id="keywords" placeholder="Ключови думи"></span>
       <hr> 
   </div>
</div>`;
}

        function caravanFields()
        {
          return `
          
          <div class="apr-field"><span>Заглавие:</span><input id="title" placeholder="Заглавие"></div>
          <div class="apr-field"><span>Марка:</span><input id="brand" placeholder="Марка"></div>
        
          
          <span>Модел:</span>
          <input id="model">
          <span>Ц:</span>
          <input id="price">
          <input id="length">
          <input id="year">
          <input id="documents">
          <input id="sleepingPlaces">
          <input id="condition">
          <input id="plate">
          <input id="toilet">
          <input id="bath">
          <input id="heating">
          <input id="boiler">
          <input id="ac">
          <input id="solar">
          <input id="fortelt">
          <input id="markise">
          <input id="location">
          <input id="keywords">
          `;
        }
        
// Github api ......................................................
const owner = "stevicamp";
const repo = "Stevicamp";
const path = "test.json";
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



