import config from 'config';
import fs from 'fs-extra';
import fetch from 'node-fetch';
import M3U8FileParser from 'm3u8-file-parser';
import path from 'path';

const CACHE_DIR = '.cache';
const CACHE_FILENAME = 'playlist';

export async function index(ctx) {
  const url = config.get('iptv.url');

  try {
    await fs.ensureDir(CACHE_DIR);
    const cachePath = path.join(CACHE_DIR, CACHE_FILENAME);

    const cacheExists = await fs.pathExists(cachePath);
    let playlist = '';
    if (cacheExists) {
      playlist = await fs.readFile(cachePath, 'utf8');
    } else {
      const data = await fetch(url);
      playlist = await data.text();
      await fs.writeFile(cachePath, playlist, 'utf8');
    }

    const reader = new M3U8FileParser();
    reader.read(playlist);
    const result = reader.getResult();
    const filteredList = filter(result.segments);

    ctx.body = format(filteredList);
  } catch (err) {
    console.error(err.message + '\n' + err.stack);
    ctx.body = err.message;
  }
}

function filter(list) {
  const whitelist = [
    'DE: Orf 1',
    'DE: Orf 2',
    'DE: Pro7',
    'DE: Pro 7 HD',
    'DE: Pro7 Fun HD',
    'DE: RTL',
    'DE: RTL 2',
    'DE: RTL Nitro',
    'DE: SAT 1 HD',
    'DE: SAT.1 HD 1080P DE',
    'DE: Sat 1 Gold',
    'DE: SERVUS TV HD',
    'DE: SIXX HD',
    'UK Sky Sports F1 FHD',
    'UK Sky Sports F1 HD',
    'UK Sky Sports F1 HD US Feed',
    'UK Sky Sports F1 SD',
    'VIP Sky Sports F1 FHD',
    'VIP Sky Sports F1 HD',
    'VIP Sky Sports F1 FHD 50fps',
    'VIP Sky Sports F1 SD'
  ];
  return list.filter(row => whitelist.includes(row.inf['tvg-name']));
}

function format(list) {
  let s = "#EXTM3U\n";
  return list.reduce((s, o) => {
    console.log(o);
    return s + `#EXTINF:-1 tvg-id="${o.inf['tvg-id']}" tvg-name="${o.inf['tvg-name']}" tvg-logo="${o.inf['tvg-logo']}" group-title="${o.inf['group-title']}",${o.inf.title}\n${o.url}\n`
  }, s);
}
