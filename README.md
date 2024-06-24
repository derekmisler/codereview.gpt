# codereview.gpt

<p align='center'>
  Review GitHub Pull Requests or GitLab Merge Requests using <a href="https://chat.openai.com" target="_blank">ChatGPT</a>.
</p>

## Overview

Here's an example output for [this](https://github.com/sturdy-dev/semantic-code-search/pull/17) Pull Request:

![example screenshot](https://raw.githubusercontent.com/sturdy-dev/codereview.gpt/main/docs/codereview_gpt_screenshot_1.png)

## Usage

- Navigate to a GitHub Pull Request or GitLab Merge Request that you want a review for.
- Fill in your [OpenAI API token](https://platform.openai.com/account/api-keys) in the Settings of the Chrome Extension
- Click the extension icon
- You get code review comments from ChatGPT in the popup window

**NB:** Running the review multiple times often produces different feedback, so if you are dealing with a larger PR, it might be a good idea to do that to get the most out of it.

## FAQ

###

**Q:** What aspects of the Pull Request or Merge Request are considered during the review?

**A:** The model gets the code changes and the commit messages in a [patch](https://git-scm.com/docs/git-format-patch) format. Additionally it pulls in the description of the MR/PR.


## Installation

- Install the dependencies `npm install`
- Run the build script `npm run build`
- Navigate to `chrome://extensions`
- Enable Developer Mode
- Click the 'Load unpacked' button and navigate to the `build` directory in the project

## Supported browsers

only Chrome is supported

## Permissions

This is a list of permissions the extension uses with the respective reason.

- `activeTab` is used to get the URL or the active tab. This is needed to fetch the get the Pull Request details
- `storage` is used to cache the responses from OpenAI
- `scripting` is used to fetch html content from the Merge Request / Pull Request

## Credits

This project is inspired by [clmnin/summarize.site](https://github.com/clmnin/summarize.site)

## License

codereview.gpt is distributed under the [MIT](LICENSE.txt) license.
