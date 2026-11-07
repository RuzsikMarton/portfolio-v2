import sharp from 'sharp';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export async function processImage(file: File, width: number) {
  if (!file || file.size === 0) {
    throw new Error('Please select an image.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Image must be smaller than 10 MB.');
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Unsupported image format.');
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const image = sharp(buffer, {
    limitInputPixels: 40_000_000,
  });

  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Invalid image.');
  }

  const processedBuffer = await image
    .rotate()
    .resize({
      width,
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toBuffer();

  return {
    buffer: processedBuffer,
    contentType: 'image/webp',
    filename: 'image.webp',
  };
}
