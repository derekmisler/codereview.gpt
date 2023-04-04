import { ChatGPTAPI } from 'chatgpt';

var parsediff = require('parse-diff');
  let iterations = messages.length;
    iterations--;
      // Last prompt
      var options = {};
      // If we have no iterations left, it means its the last of our prompt messages.
      if (iterations == 0) {
        options = {
          onProgress: (partialResponse) => callback(partialResponse.text),
        }
      }
      // In progress
      else {
        options = {
          onProgress: () => callback("Processing your code changes. Number of prompts left to send: " + iterations + ". Stay tuned..."),
        }


  let promptArray = [];
  // Fetch the patch from our provider.
  let warning = '';
  let patchParts = [];

  promptArray.push(`The change has the following title: ${title}.

    Your task is:
    - Review the code changes and provide feedback.
    - If there are any bugs, highlight them.
    - Provide details on missed use of best-practices.
    - Does the code do what it says in the commit messages?
    - Do not highlight minor issues and nitpicks.
    - Use bullet points if you have multiple comments.
    - Provide security recommendations if there are any.

    You are provided with the code changes (diffs) in a unidiff format.
    Do not provide feedback yet. I will follow-up with a description of the change in a new message.`
  );

  promptArray.push(`A description was given to help you assist in understand why these changes were made.
    The description was provided in a markdown format. Do not provide feedback yet. I will follow-up with the code changes in diff format in a new message.

    ${context}`);
  // Separate the patch in different pieces to give ChatGPT more context.
  // Additionally, truncate the part of the patch if it is too big for ChatGPT to handle.
  var files = parsediff(patch);

  files.forEach(function(file) {
    // Ignore lockfiles
    if (file.from.includes("lock.json")) {
      return;
    }
    var patchPartArray = [];
    // Rebuild our patch as if it were different patches
    patchPartArray.push("```diff");
    patchPartArray.push("diff --git a" + file.from + " b"+ file.to);
    if (file.new === true) {
      patchPartArray.push("new file mode " + file.newMode);
    }
    patchPartArray.push("index " + file.index[0] + " " + file.index[1]);
    patchPartArray.push("--- " + file.from);
    patchPartArray.push("+++ " + file.to);
    patchPartArray.push(file.chunks.map(c => c.changes.map(t => t.content).join("\n")));
    patchPartArray.push("```");
    patchPartArray.push("\nDo not provide feedback yet. I will confirm once all code changes were submitted.");

    var patchPart = patchPartArray.join("\n");
    if (patchPart.length >= 15384) {
      patchPart = patchPart.slice(0, 15384)
      warning = 'Some parts of your patch were truncated as it was larger than 4096 tokens or 15384 characters. The review might not be as complete.'
    }
    patchParts.push(patchPart);
  });

  patchParts.forEach(part => {
    promptArray.push(part);
  });
  promptArray.push("All code changes have been provided. Please provide me with your code review based on all the changes, context & title provided");
  // Send our prompts to ChatGPT.
    promptArray,