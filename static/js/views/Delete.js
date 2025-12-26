// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() {
    return  `Delete`;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() 
{
    Common.setTitle("Изтрий", "delete"); 
}


  // Used to execute script before injecting the html to the app container
export async function executeCommonViewScriptBeforeHtmlInjAsync()
{ 
}



