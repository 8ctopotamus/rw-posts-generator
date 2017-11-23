const fs = require('fs')

const processPosts = (data) => {
  const delineators = ["Post", "Tweet", "Update"]
  const lines = data.split(/\r?\n/)

  // this content always comes last
  // and is treated differently
  let isLifeHappensContent = false

  const formattedLines = lines
    .filter((line, i) => {
      // get rid of unnessisary labels
      if (line.includes('Post') || line.includes('Tweet') || line.includes('Update')) return
      return line
    })
    .map((line, i) => {
      // LIFEHAPPENS PRO content gets treated differently
      if (line === 'LIFE HAPPENS PRO' || isLifeHappensContent) {
        isLifeHappensContent = true

        if (line.includes('Log in')) {
          return `<h3>${line}</h3>`
        }

        if (line.includes('https')) {
          line = line.trim()
          return `<a href="${line}" target="_blank">${line}</a>`
        }

        return '\n' + line
      }
      // check for lines in all caps
      // give them some space as these are headings
      else if (line === line.toUpperCase()) {
        return '\n' + line
      } else {
        line = line.split(' https://realwealthmedia.com')[0]
        // for everything else, wrap the content in shortcode markup
        return `[rw-post img="" link="true"]${line}[/rw-post]`
      }
    })
    .join('\n')

    generateFile(formattedLines)
}

const generateFile = (data) => {
  fs.writeFile('final.txt', data, 'utf8', (err) => {
    if (err) throw err;
    console.log('Your file is ready :)');
  })
}

// Kick it off!
fs.readFile('./source.txt', 'utf8', (err, data) => {
  if (err) throw err
  processPosts(data)
})
