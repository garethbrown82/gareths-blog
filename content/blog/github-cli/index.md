---
title: GitHub CLI
date: "2020-10-07T08:26:42+0000"
---

I've seen this new GitHub CLI pop up recently in articles and as I use GitHub for both projects at work and home it makes complete sense for me to check it out. Hopefully you'll find my notes below useful for when you dive in yourself!

I'm mainly following the guides from the [official GitHub CLI page](https://cli.github.com/), there also a [youtube intro video](https://youtu.be/vcAIZ4axYZU) you can watch.

### Installing GitHub CLI

Not much to it really:
```
brew install gh
```

### Authenticating

GitHub CLI needs to know who you are and which repo to connect to. You can kick that process off with the following:
```
gh auth login
```

You'll first get asked a few questions. There are the answers I gave, but your preferences may be different.

**What account do you want to log into?**
A: GitHub.com

**How would you like to authenticate?**
A: Paste an authentication token

You'll then be given a url where you can create a token so the GitHub CLI can access your account. https://github.com/settings/tokens.

Click "generate new token" and you'll be asked to add a note. This note is to let you know what the token is for when you need to look at your tokens later. I've just added a note reading "GitHub CLI". 

You'll then need to select scopes depending on what access you want this token to have. As it's my personal account and I want to be able to do everything possible with the GitHub CLI I've just selected everything.

![GitHub token settings](./assets/github-token-selection.png)

Click the green "generate token" button down the bottom of the page.

Then you'll see your token, make sure to copy it now as once you close the tab it will be gone forever! You'll have to then delete it and regenerate a new token.

Return to the command line and paste the token into the GitHub CLI setup.

**Choose default git protocol**
A: SSH

You should then see a message indicating that you have `Configured git protocol` and who you're logged in as.


**CLI commands**

This will get you up and running initially and at this point is as far as I've gotten. I'm planning on using it for work over the next few weeks to see how I find it. To find out more info about what the GitHub CLI can do I would recommend [reading the docs](https://cli.github.com/manual/).


