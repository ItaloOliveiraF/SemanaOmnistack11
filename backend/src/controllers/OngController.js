const crypto =require('crypto');
const connection = require('../database/index');

module.exports = {
    async create(req, res){
        const { nome, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        nome,
        email,
        whatsapp,
        city,
        uf
    });

    return res.json({ id });
    },

    async index(req, res){
        const ongs = await connection('ongs').select('*');

        return res.json(ongs);
    }


}

