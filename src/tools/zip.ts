import { createWriteStream } from 'fs';
import archiver from 'archiver';

const output = createWriteStream('./prod.zip');

const archive = archiver('zip', {
  zlib: { level: 9 },
});

archive.pipe(output);

archive.glob('dist/**/**');

archive.finalize();
output.on('close', function () {
  // zip圧縮完了すると発火する
  const archive_size = archive.pointer();
  console.log(`complete! total size : ${archive_size} bytes`);
});
