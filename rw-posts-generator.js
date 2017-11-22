const fs = require('fs')

const processPosts = (data) => {
  const delineators = ["Post", "Tweet", "Update"]
  const lines = data.split(/\r?\n/)

  const formattedLines = lines
    .filter((line, i) => {
      // get rid of unnessisary labels
      if (line.includes('Post') || line.includes('Tweet') || line.includes('Update')) return
      return line
    })
    .map((line, i) => {
      // wrap the content in shortcode markup
      return `[rw-post img="" link="true"]${line}[/rw-post]`
    })
    .join('\n')

    console.log(formattedLines)
  // generateFile(formattedLines)
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
