import sharp from 'sharp';
import supabase from '../services/supabase.js';

const BUCKET = 'arquivos';

const prepararFoto = async (buffer) =>
    sharp(buffer).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();

export const upload = async (id, file) => {
    const ehFoto = file.mimetype.startsWith('image/');

    const buffer = ehFoto ? await prepararFoto(file.buffer) : file.buffer;
    const path = ehFoto
        ? `${id}/foto.webp`
        : `${id}/documento.${file.originalname.split('.').pop()}`;
    const contentType = ehFoto ? 'image/webp' : file.mimetype;

    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, buffer, { contentType, upsert: true });

    if (error) throw new Error(error.message);

    return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
};

export const deletar = async (url) => {
    const path = url.split(`${BUCKET}/`)[1];
    const { error } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) throw new Error(error.message);
};
