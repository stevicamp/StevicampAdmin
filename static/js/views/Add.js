// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return  `<div class="admin-content-holder">
           
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



