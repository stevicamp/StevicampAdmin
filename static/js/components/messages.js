


function successMsg(msg)
{
    const successElement = document.createElement("div");
    successElement.id = "successMsg";
    successElement.className = "msg-success";
    successElement.innerHTML = `<img src="static/img/icons/success.png" /><br><span>${msg}</span>`;
    document.body.appendChild(successElement);
   
    setTimeout((()=> { document.getElementById('successMsg').remove();}), 4000);
}





function failedMsg(msg)
{
    const failElement = document.createElement("div");
    failElement.id = "failedMsg";
    failElement.className = "msg-fail";
    failElement.innerHTML = `<img src="static/img/icons/fail.png"/><br><span>${msg}</span>`;
    document.body.appendChild(failElement);
   
    setTimeout((()=> { document.getElementById('failedMsg').remove();}), 4000);
}




function loadingMsg(msg)
{
    const loadingElement = document.createElement("div");
    loadingElement.id = "loadingMsg";
    loadingElement.className = "msg-loading";
    loadingElement.innerHTML = `<img src="static/img/icons/loading.gif"/><br><span>${msg}</span>`;
    document.body.appendChild(loadingElement);
}

