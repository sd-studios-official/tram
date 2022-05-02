# Tram [![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com) [![GitLab commit count](https://badgen.net/gitlab/last-commit/gitlab-org/gitlab-development-kit)](https://gitlab.com/gatelogicdev/tram-discord/-/commits/main)

The bot that does voice channels right.

## PLEASE READ
While Tram is not made to be selfhosted, there is a setup guide. You MIGHT get support from either me or Summer if either of us have spare or free time. Don't ping us asking for help.

### Prerequisites
You will need the following:

- NodeJS v17
- NPM
    - Nodemon
    - ESLint
- Git
- VSCode

A few thing we *recommend* you have are:
- A VPS
> We recommend this as it means you don't have to have your PC on 24/7 for the bot to work.
- PuTTY
> It's just a good SSH tool :'
- WebStorm
> We find it works better, while it is paid if you are student you can get a student license!
- Some semi advanced knowledge of JavaScript, Eris and SQL.

### Installation
Once you have all the things listed above, you need to clone the repo to your local machine and get it setup!
&nbsp;

&nbsp;

Create a "Coding" folder (you don't need to do this) - I would recommend making this on the Desktop so you know how to find it! 

```mkdir Coding```

Now clone the repo

```git clone https://gitlab.com/summerdev-studios/tram-discord.git```

And open into it

```cd tram-discord```

### The Fun Bit! (A.K.A Coding)
Yay! Now we have everything downloaded, almost.

Run ```npm i``` to fetch all the required packages. This might take a bit.

Now run ```code .``` presuming you are using VSCode, if you're not just open it in your IDE like you would normally.

&nbsp;

From here, it's mostly down to you!

Just make sure to update `config.example.json` to be called `config.json` and make sure the properties are correct!


### Copyright & License Notice
This project uses the GNU AGPL v3 license, which means you are free to use this code, but you must follow these conditions:
- Your project MUST be open source. If found not to be, a request will be sent to Discord to shut the bot down.
- You MUST credit Tram, it's developers and contributors properly. The bare minimum would be to use the example below. Same thing as before if this is not met.
> Core bot provided by Tram and it's contributors. Core libaries: Eris & Yuuko.