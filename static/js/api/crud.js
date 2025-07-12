  var githubUser ="";
  var githubRepo ="";
  var githubToken ="";
  var githubFilePathDb =""; // Path for the DB
  var newContent ="";
  

//`https://corsproxy.io/?url=https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${githubFilePathDb}`,
// Function to get the file's SHA
async function getFileSha(githubUser, githubRepo, githubFilePathDb, githubToken) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${githubFilePathDb}`,
      {
        method: "GET",
        headers: {
          "Authorization": `token ${githubToken}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        }
      }
    );
    if (!response.ok) 
    {
      if (response.status === 404) return null; // File doesn't exist
      throw new Error(`Failed to fetch SHA: ${response.statusText}`);
    }

      const data = await response.json();
      return data.sha;
    } 

     catch (error) 
    {
       console.error("Error fetching SHA:", error);
       return null;
    }
}



function unescapeForBtoa(str) 
{ 
  return str.replace(/%([0-9A-F]{2})/g, (match, p1) => { return String.fromCharCode('0x' + p1);})
}


 

// `https://corsproxy.io/?url=https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${githubFilePathDb}`,
// Function to update the JSON file
async function updateJsonFileAsync(githubUser, githubRepo, githubFilePathDb, githubToken, content, msg) 
{
  try {

    loadingMsg('Запазва се...');
    // newContent = document.getElementById("developerInput").value;
    const sha = await getFileSha(githubUser, githubRepo, githubFilePathDb, githubToken);
    // const contentBase64 = btoa(JSON.stringify(encodeURI(content), null, 2)); // EncodeUri because of non latin character later in db on fetch decodeUri
    const contentBase64 =  btoa(unescape(encodeURIComponent(content))); // EncodeUri because of non latin character later in db on fetch decodeUri
    // const contentBase64 =  btoa(unescape(encodeURIComponent(content))); // EncodeUri because of non latin character later in db on fetch decodeUri
//  https://stackoverflow.com/questions/23223718/failed-to-execute-btoa-on-window-the-string-to-be-encoded-contains-characte
// https://stackoverflow.com/questions/27926562/deprecation-of-javascript-function-unescape
    const body = {
      message: `${msg}`,
      content: contentBase64,
      sha: sha // Omit if creating a new file
    };

    const response = await fetch(
      `https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${githubFilePathDb}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `token ${githubToken}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    document.getElementById('loadingMsg').remove(); // Remove loading msg
    if (response.ok) 
    {
      const result = await response.json();
      console.log("File updated! Commit URL:", result.commit.html_url);
      successMsg('Успешно запазено'); 
    }
    else
    {
      const errorData = await response.json();
      failedMsg('Грешка - ' + errorData.message);
      throw new Error(`Failed to update file: ${errorData.message}`);
    }

   

  } catch (error) {
    console.error("Error updating file:", error);
  }
}





// `https://corsproxy.io/?url=https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${githubFilePathDb}`,
// Function to update the JSON file
async function uploadImgAsync(githubUser, githubRepo, githubFilePathDb, githubToken, imgContentBase64, msg, imgComment) 
{
   try 
   {
    loadingMsg(`Запазва се снимка ${imgComment}...`);

    // const sha = await getFileSha(githubUser, githubRepo, githubFilePathDb, githubToken);

    const body = {
      message: `${msg}`,
      content: imgContentBase64 
    };

    const response = await fetch(
      `https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${githubFilePathDb}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `token ${githubToken}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body) 
      }
    );

    document.getElementById('loadingMsg').remove(); // Remove loading msg
    if (response.ok) 
    {
      const result = await response.json();
      console.log("File updated! Commit URL:", result.commit.html_url);
      successMsg(`Успешно запазенa Снимка ${imgComment}`); 
      return true;
    }
    else
    {
      const errorData = await response.json();
      failedMsg(`Грешка - Снимка ${imgComment} -` + errorData.message);
      throw new Error(`Failed to upload image:`); 
    }

   

  } catch (error) {
    console.error("Error uploading image:", error);
    return false;
  } 
}