// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
   
    return  `${await getItems('scooters')}`;
    // return `  
    //          <p class="subTitleView">Скутери</p>
    //               `;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Скутери", "scooter");
}





// Used to execute script before injecting the html to the app container
export async function executeCommonViewScriptBeforeHtmlInjAsync()
{ 
}