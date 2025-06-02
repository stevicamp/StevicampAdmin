


function successMsg()
{
    const successElement = document.createElement("div");
    successElement.id = "successMsg";
    successElement.className = "msg-success";
    successElement.innerHTML = '<img src="static/img/icons/success.png" />';
    document.body.appendChild(successElement);
   
    setTimeout((()=> { document.getElementById('successMsg').remove();}), 4000);
}





function failedMsg()
{
    const successElement = document.createElement("div");
    successElement.id = "failedMsg";
    successElement.className = "msg-fail";
    successElement.innerHTML = '<img src="static/img/icons/fail.png" />';
    document.body.appendChild(successElement);
   
    setTimeout((()=> { document.getElementById('failedMsg').remove();}), 4000);
}