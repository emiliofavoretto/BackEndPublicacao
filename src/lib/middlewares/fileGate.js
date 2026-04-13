import multer from 'multer';

const storage = multer.memoryStorage();

const tiposPermitidos = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'text/csv',
];

const fileFilter = (req, file, cb) => {
    tiposPermitidos.includes(file.mimetype)
        ? cb(null, true)
        : cb(new Error('Tipo de arquivo não permitido.'));
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
});
