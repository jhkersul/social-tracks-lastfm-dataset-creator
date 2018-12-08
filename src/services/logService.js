import fs from 'fs';

export const ERROR_LOG = 'error.log';
export const INFO_LOG = 'info.log';

export function logToFile(type, message, title = null) {
  const writer = fs.createWriteStream(`${__dirname}/../logs/${type}`, { flags: 'a' });
  writer.write(`\n${new Date().toISOString()}\n`);
  if (title) writer.write(`${title}\n`);
  writer.write(`${JSON.stringify(message)}\n`);
}
