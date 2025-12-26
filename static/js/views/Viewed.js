// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return  `${await getItems('viewed')}`;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Прегледани","viewed");
}





// Used to execute script before injecting the html to the app container
export async function executeCommonViewScriptBeforeHtmlInjAsync()
{ 
}