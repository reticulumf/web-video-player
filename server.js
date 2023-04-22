const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const rangeParser = require('range-parser');


const app = express();

const videosDir = process.argv[2] || path.join(__dirname, 'videos');

const videoExtensions = ['.mp4', '.mkv', '.webm'];

app.use(cors());

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/videos', (req, res) => {
  const videos = [];

  fs.readdir(videosDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    files.forEach(file => {
      const fileExt = path.extname(file);
      if (videoExtensions.includes(fileExt)) {
        videos.push({
            name: file,
            path: path.join(videosDir, file)
        });
      }
    });

    res.json(videos);
  });
});


app.get('/play', (req, res) => {
    // const videoPath = req.query.video;
    const videoFilePath = req.query.video;
  
    // Check if the file exists
    if (!fs.existsSync(videoFilePath)) {
      res.status(404).send('File not found');
      return;
    }
  
    // Get the range header if present
    const rangeHeader = req.headers.range;
  
    // Parse the range header
    const ranges = rangeParser(fs.statSync(videoFilePath).size, rangeHeader);
  
    // Check if the ranges are valid
    if (ranges === -1) {
      res.status(416).send('Requested Range Not Satisfiable');
      return;
    }
  
    // If there is no range header, return the entire file
    if (ranges === -2) {
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Length', fs.statSync(videoFilePath).size);
      fs.createReadStream(videoFilePath).pipe(res);
      return;
    }
  
    // If there is a range header, return the requested range
    const range = ranges[0];
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', range.end - range.start + 1);
    res.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${fs.statSync(videoFilePath).size}`);
    res.status(206);
    fs.createReadStream(videoFilePath, { start: range.start, end: range.end }).pipe(res);
  });

app.use(express.static(videosDir));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
