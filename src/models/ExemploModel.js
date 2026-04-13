import prisma from '../lib/services/prismaClient.js';

export default class ExemploModel {
    constructor({ id = null, nome, foto = true, documento = null } = {}) {
        this.id = id;
        this.nome = nome;
        this.foto = foto;
        this.documento = documento;
    }

    async criar() {
        return prisma.exemplo.create({
            data: {
                nome: this.nome,
                estado: this.estado,
                foto: this.foto,
            },
        });
    }

    async atualizar() {
        return prisma.exemplo.update({
            where: { id: this.id },
            data: { nome: this.nome, foto: this.estado, documento: this.documento },
        });
    }

    async deletar() {
        return prisma.exemplo.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.foto !== undefined) {
            where.foto = filtros.foto === 'true';
        }
        if (filtros.documento !== undefined) {
            where.documento = parseFloat(filtros.documento);
        }

        return prisma.exemplo.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.exemplo.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new ExemploModel(data);
    }
}
