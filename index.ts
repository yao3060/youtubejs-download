import { Innertube, UniversalCache, Utils } from 'youtubei.js';
import { existsSync, mkdirSync, createWriteStream } from 'fs';

(async () => {
  const yt = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true });

  const song = {
    id: '3CBD5JZJJKw',
    title: 'I Waited 15 Years For These New Array Methods',
    album: 'album'
  }

  const stream = await yt.download(song.id as string, {
    type: 'audio', // audio, video or video+audio
    quality: 'best', // best, bestefficiency, 144p, 240p, 480p, 720p and so on.
    format: 'mp4' // media container format 
  });

  console.info(`Downloading ${song.title} (${song.id})`);

  const dir = `./album/${song.id}`;

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  const file = createWriteStream(`${dir}/${song.title?.replace(/\//g, '')}.m4a`);

  for await (const chunk of Utils.streamToIterable(stream)) {
    file.write(chunk);
  }

  console.info(`${song.id} - Done!`, '\n');
})();