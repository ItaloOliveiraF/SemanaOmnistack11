const connection = require('../database/index');
const express = require("express");

app=express();

app.use(express.json);

module.exports = {
    async create(req, res){
        const { title, description, value, city } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection.insert({
            title,
            description,
            value,
            city,
            ong_id,
        }, ['id']).into('incidents');
        
        return res.json( id );
    },

    async index(req, res){
        const { p = 1 } = req.query;

        const [count] = await connection('incidents').count();
        res.header('X-Total-Count', count['count']);

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((p-1)*5)
        .select(['incidents.title',
                'incidents.description',
                'incidents.value',
                'ongs.nome',
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf']);
    
        return res.json(incidents);
    },

    async delete(req, res){
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id){
            return res.status(401).json( { error: 'Operation not permited.' });
        }
        
            await connection('incidents')
                .where('id', id)
                .delete();
            
            return res.status(204).send();
        
    }
}