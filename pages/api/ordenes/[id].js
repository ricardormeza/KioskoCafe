import React from 'react'
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    if(req.method === 'POST'){
        const { id } = req.query

        const ordenesActualizada = await prisma.orden.update({
            where: {
                id: parseInt(id)
            },
            data: {
                estado: true
            }
        })
        res.status(200).json(ordenesActualizada)
    }
     
}
