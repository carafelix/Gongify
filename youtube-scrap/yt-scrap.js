const ytdl = require('ytdl-core');
const fs = require('fs');


const videoURLs = ['https://www.youtube.com/watch?v=mavWJ5LFSBI', // by numbers
'https://www.youtube.com/watch?v=N4pXcpw9otY',
'https://www.youtube.com/watch?v=zhz8vaxaiNg',
'https://www.youtube.com/watch?v=UlzWEBEMOsc,',
'https://www.youtube.com/watch?v=MQTg8EU2IRE',
'https://www.youtube.com/watch?v=JlpZ1YPGXfs',
'https://www.youtube.com/watch?v=Qb3sHAihX7k',
'https://www.youtube.com/watch?v=dbuBiHeD-4A',
'https://www.youtube.com/watch?v=lW1Ir6gLH3Q',
'https://www.youtube.com/watch?v=68jF55i9uv0',
'https://www.youtube.com/watch?v=V1E3MLQrgxI',
'https://www.youtube.com/watch?v=oYm2TQ0HKC8'] // bonus track


async function downloadVideosSequentially() {
  for (const videoURL of videoURLs) {
    const options = {
      quality: 'highestaudio',
      filter: 'audioonly',
    };

    // Download the video as audio
    const stream = ytdl(videoURL, options);

    // Set the output file path based on the video URL or use a unique name
    const outputFilePath = __dirname + '/output/' +`${videoURL.split('=')[1]}.mp3`;

    // Create a write stream to save the audio
    const outputStream = fs.createWriteStream(outputFilePath);

    // Pipe the video stream to the output file
    stream.pipe(outputStream);

    await new Promise((resolve) => {
      stream.on('end', () => {
        console.log(`Audio download complete for ${videoURL}`);
        resolve();
      });

      stream.on('error', (error) => {
        console.error(`Error downloading audio for ${videoURL}:`, error);
        resolve();
      });
    });
  }
}

downloadVideosSequentially();