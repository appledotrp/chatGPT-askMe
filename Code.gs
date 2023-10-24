function callGPT3(input) {
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

  return result.choices[0].text; // Return the GPT-3 response
}

function askGPT() {

  var spreadsheetId = "1Gogep64vmy3HaIDVAfTy2Y2yC4FNAsInrgShcECVzis";
  var sheetName = "Main";
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var input = sheet.getRange("A2").getValue();
  var output = callGPT3(input);
  Logger.log("ChatGPT Response:" + output);
  sheet.getRange("B2").setValue(output);
}