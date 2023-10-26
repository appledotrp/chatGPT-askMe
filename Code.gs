function callGPT_text(input) {
  var apiKey = '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'; // Replace with your GPT-3 API key
  var url = "https://api.openai.com/v1/chat/completions";
  //var url = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  var headers = {
    'Authorization': 'Bearer ' + apiKey,
    'Content-Type': 'application/json'
  };

  var payload = {
    "model": "gpt-3.5-turbo", // Specify the model to be used
    //"model": "gpt-4-32k-0613", // 
    "messages": [
      {
        "role": "user",
        "content": input
      }
    ]
  };

  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(payload)
  };

  var response = UrlFetchApp.fetch(url, options);
  var result = JSON.parse(response.getContentText());
  
  var answer = result.choices[0].message.content;

  return answer; // Return the GPT-3 response
}

function askGPT_text() {

  var spreadsheetId = "1Gogep64vmy3HaIDVAfTy2Y2yC4FNAsInrgShcECVzis";
  var sheetName = "Main";
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var input = sheet.getRange("A2").getValue();
  var output = callGPT_text(input);
  Logger.log("ChatGPT Response:" + output);
  sheet.getRange("C2").setValue(output);
}

//==================================================================================================================//
function callGPT_image(prompt) {
  var apiKey = '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'; // Replace with your GPT-3 API key
  var url = "https://api.openai.com/v1/images/generations";

  var headers = {
    'Authorization': 'Bearer ' + apiKey,
    'Content-Type': 'application/json'
  };

  var payload = {
    "prompt": prompt,
    "n": 1,
    "size": "512x512"
  };

  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(payload)
  };

  var response = UrlFetchApp.fetch(url, options);
  var result = JSON.parse(response.getContentText());
  var photo = result.data[0].url;

  return photo; // Return the GPT-3 response
}

function askGPT_image() {
  var spreadsheetId = "1Gogep64vmy3HaIDVAfTy2Y2yC4FNAsInrgShcECVzis";
  var sheetName = "Main";
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var prompt = sheet.getRange("A3").getValue(); // Make sure cell A3 contains the prompt
  if (!prompt) {
    Logger.log("Prompt is missing!");
    return;
  }
  var output = callGPT_image(prompt);
  Logger.log("ChatGPT Response:" + output);
  sheet.getRange("B3").setValue(output);
}
