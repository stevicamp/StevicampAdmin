// Imports -----------------------------------------------------
import * as Common from "./Common.js"



// VIEW HTML ---------------------------------------------------
export async function getHtmlAsync() 
{
    return  `${await getItems('boats')}`;
}




// View Script -------------------------------------------------
export async function executeViewScriptAsync() 
{
    Common.setTitle("Каравани", "boat");  // The second "boat" is the img
}


  // Used to execute script before injecting the html to the app container
export async function executeCommonViewScriptBeforeHtmlInjAsync()
{ 
}

