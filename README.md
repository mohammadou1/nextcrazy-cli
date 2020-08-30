### This is a helpful cli with nextcrazy boilerplate

[NextCrazy](https://github.com/mohammadou1/nextcrazy)

> Better documentation coming soon

#### Work in progress

- Support for generating JavaScript files
- CLI written in typescript
- More functionalities

#### Current examples

nextcrazy-cli now is built to support the multilanguage feature of nextcrazy

to have more information about it, let's try it

```
nextcrazy
```

It will prompt asking for either (Page,Component,Language).

- Selecting a page will guide you through defining a page inside or outside [lang] folder (IT SUPPORTS DYNAMIC PAGES)

- Selecting component will generate a component inside "components" folder with Translate and Auth examples

- Selecting language will add a language to "translation.json" and add the language to translations folder for you.

you can shortcut most of the commands as below (better commands coming soon)

```
nextcrazy page --name /path-to-page/[slug]
```

you can also shorten --name with -n

also you can tell it that this page is supposed to be SSR not SSG

```
nextcrazy page --name /path-to-page/[slug] --ssr
```

if you want to generate it outside [lang] folder, you can easliy pass --out or -o flag

```
nextcrazy page --name /path-to-page/[slug] -o
```

it will get rid of getLanguagePaths for you and use getPaths helper instead for better SSG support
