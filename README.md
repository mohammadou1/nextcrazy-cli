### This is a helpful cli with nextcrazy boilerplate

[NEXTCRAZY Boilerplate](https://github.com/mohammadou1/nextcrazy)

>NEXTCRAZY-CLI 0.2.2 is the very first version that is considered stable

install
```bash
npm i -g nextcrazy-cli
```

usage:

```bash

nextcrazy-cli

```

Options
|Option  |Description  |
|--|--|
| Project | Creates a new project from nextcrazy repo, you can shorten it by (nextcrazy-cli project hello-world), and then select which package manager should install the dependencies |
| Page| Creates a page with the specified path inside ```/pages/[lang]``` (it will create the folders for you so you don't have to worry), you need to specify if this is a SSG or SSR page (it will create a small example of getStaticPaths if it's SSG) |
| Component| Creates a component inside component ```/components``` (like pages it will create the folders for you) |
| Language | Adds a language to the translations folder, also will ask you for this language direction to add it inside ```"translations.json"``` |


### Shortcuts

- nextcrazy-cli project my-project
- nextcrazy-cli -h 
- nextcrazy-cli -v


I try to update it regulary with new ideas, if you have any suggestion please contact me on 
<it.moh.ou@gmail.com>
or feel free to create a pull request

and please make sure to visit [NEXTCRAZY Boilerplate](https://github.com/mohammadou1/nextcrazy) and give it a star :)



**License: (MIT)**