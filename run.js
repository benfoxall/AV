const {readFileSync, writeFileSync} = require('fs')
const marked = require('marked')
const watch = require('node-watch')
const liveServer = require("live-server")

const source = './index.md';
const dest = './index.html'

const generate = () => {

const body = marked(
  readFileSync(source).toString(),
  {sanitize: false}
)

const htm = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Feeding the audio graph</title>
    <link href="https://fonts.googleapis.com/css?family=Source+Serif+Pro" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">
    <link href="https://cdn.rawgit.com/24ways/frontend/master/src/components/scopes/syntax/syntax.css" rel="stylesheet" />
    <style media="screen">
      :root {
        --color-year: hsl(300, 100%, 16%);
        --color-year--dark: hsl(300, 100%, 8%);
        --color-year--dark-alpha: hsla(300, 100%, 8%, 0.8);
              --color-day: hsl(304, 80%, 60%);
        --color-day--light: hsl(304, 60%, 98%);
        --color-day--dark: hsl(304, 100%, 24%);
        --color-day--dark-alpha: hsla(304, 100%, 24%, 0.33);
      }

      h1, h2, h3, h4 {
        font-family: Source Sans Pro,serif;
        color: var(--color-day--dark,#7a0000)
      }

      body {font-family: Source Serif Pro,serif;
        background-color: var(--color-day--light); color: #3f3f46; max-width: 700px; margin-bottom: 10em; padding: 2em;font-size: 1.2em;

        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        line-height: 1.5;

      }

      pre {
        font-family: Source Sans Pro,serif;
        background: hsla(0,0%,100%,.5); padding: 1em;
      }
    </style>
  </head>
  <body>

    <!--______ DO NOT EDIT HERE ______-->

    ${body}

    <script type="module" src="js/main.js"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/prism.js"></script>
  </body>
</html>`

writeFileSync(dest, htm)

console.log(`Wrote to ${dest}`)

}


generate()
watch(source, generate)

liveServer.start({
  ignore: 'index.md,.git'
})
