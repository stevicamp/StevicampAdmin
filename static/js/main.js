﻿// Imports ------------------------------------------------------------------------------------------------
// import * as Home from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/Home.js';
// import * as Caravans from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/Caravans.js';
// import * as Cars from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/Cars.js';
// import * as Products from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/Products.js';
// import * as Equipment from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/Equipment.js';
// import * as Trailers from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/Trailers.js';
// import * as Wheels from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/Wheels.js';
// import * as Scooters from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/Scooters.js';
// import * as TransportService from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/TransportService.js';
// import * as GoodsTransport from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/GoodsTransport.js';
// import * as Contact from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/Contact.js';
// import * as Viewed from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/Viewed.js';
// import * as Written from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/Written.js';
// import * as About from 'https://cdn.jsdelivr.net/gh/stefan27dk/Stevicamp@main/static/js/views/About.js';
 
 

import * as Home from './views/Home.js';
import * as Caravans from './views/Caravans.js';
import * as Cars from './views/Cars.js';
import * as Products from './views/Products.js';
import * as Equipment from './views/Equipment.js';
import * as Trailers from './views/Trailers.js';
import * as Wheels from './views/Wheels.js';
import * as Scooters from './views/Scooters.js';
import * as TransportService from './views/TransportService.js';
import * as GoodsTransport from './views/GoodsTransport.js';
import * as Contact from './views/Contact.js';
import * as Viewed from './views/Viewed.js';
import * as Written from './views/Written.js';
import * as Appliances from './views/Appliances.js';
import * as Microbuses from './views/Microbuses.js';
import * as About from './views/About.js';
import * as New from './views/New.js';
import * as Add from './views/Add.js';
import * as Delete from './views/Delete.js';
import * as Edit from './views/Edit.js';


// Router  ------------------------------------------------------------------------------------------------
function router(e) {
    // e = event || window.event;
    e.preventDefault(); // Prevent deafult behavior don't follow the link
    window.history.pushState(null, null, e.target.href); // Add the url to the history api of js so we can navigate back and forth with the browser buttons
    handleLocation();
}


//Routes ------------ The defined routes of the SPA APP ---------------------------------------------------
const routes = {
    '/': Home, // On Path "/" use the HomeView class and inject html in the #app div
    '/Caravans': Caravans,
    '/Cars': Cars,
    '/Products': Products,
    '/Equipment': Equipment,
    '/Trailers': Trailers,
    '/Wheels': Wheels,
    '/Scooters': Scooters,
    '/TransportService': TransportService,
    '/GoodsTransport': GoodsTransport,
    '/Contact': Contact,
    '/Viewed': Viewed,
    '/Written': Written,
    '/Appliances': Appliances,
    '/Microbuses': Microbuses,
    '/About': About,
    '/New': New,
    '/Add': Add,
    '/Delete': Delete,
    '/Edit': Edit
};



// The method that gets the current view and injects it in the "app"" container div.
// Handle location  ---------------------------------------------------------------------------------------
const handleLocation = async () => {
    if(window.location.search == "")
    { 
        const path = window.location.pathname;
        const currentRoute = routes[path] || routes['/']; // If there is no match go to Home "/" if the url is not found in the "routes object" than load Home View
        
        document.getElementById("app").innerHTML = await currentRoute.getHtmlAsync(); // Get the Html code for the specific View
        await currentRoute.executeViewScriptAsync(); // Execute the View script "If there is specific script to be executet to the specific view"
    }
    else
    {
        await checkForSearchKeywords();
    }
};


// On-Navigating-Back&Forth-Load the Content--Together with the url------------------------------------------------------------------------------------>
window.addEventListener("popstate", handleLocation); // On popstate "If back button is pressed" use the method to load back the previeous SPA View

// window.addEventListener('pushstate', handleLocation); // on location change handle the location, so view is updated


// Listen for document fully Loaded
document.addEventListener("DOMContentLoaded", () => { // On Dom loaded add bodyEventlistener to listen for click in the body
    document.body.addEventListener("click", e => { //Listen for click in the body
        if (e.target.matches("[data-link]")) {  // If body item was clicked and it is data-link decorated 
            router(e); // Load the content if the url is defined in our "Spa Urls"
        }
    });
});


handleLocation(); // Handle location on page load otherwise the location will be handled on decorated link with data-link click or on popstate a.k.a on back and forth browser button click with window.addEventListener("popstate"...


