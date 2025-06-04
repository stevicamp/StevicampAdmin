


//`https://corsproxy.io/?url=https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${githubFilePath}`,
// Function to get the file's SHA
async function getFileSha(githubUser, githubRepo, githubFilePath, githubToken) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${githubFilePath}`,
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


// `https://corsproxy.io/?url=https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${githubFilePath}`,
// Function to update the JSON file
async function updateJsonFileAsync(githubUser, githubRepo, githubFilePath, githubToken, content, msg) 
{
  try {

    loadingMsg('Запазва се...');
    // newContent = document.getElementById("developerInput").value;
    const sha = await getFileSha(githubUser, githubRepo, githubFilePath, githubToken);
    const contentBase64 = btoa(JSON.stringify(encodeURI(content), null, 2)); // EncodeUri because of non latin character later in db on fetch decodeUri
 

    const body = {
      message: `${msg}`,
      content: contentBase64,
      sha: sha // Omit if creating a new file
    };

    const response = await fetch(
      `https://api.github.com/repos/${githubUser}/${githubRepo}/contents/${githubFilePath}`,
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