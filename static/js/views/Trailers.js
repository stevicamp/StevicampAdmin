// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return  `${await getItems('trailers')}`;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() {
    Common.setTitle("Ремаркета", "trailer");
}





// Used to execute script before injecting the html to the app container
export async function executeCommonViewScriptBeforeHtmlInjAsync()
{ 
}