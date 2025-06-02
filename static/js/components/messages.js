


function successMsg()
{
    const successElement = document.createElement("div");
    successElement.id = "successMsg";
    successElement.className = "msg";
    successElement.innerHTML = '<img src="static/img/icons/success.png" />';
    document.body.appendChild(successElement);
   
    setTimeout((()=> { document.getElementById('successMsg').remove();}), 3000);
}