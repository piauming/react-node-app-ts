import { Response } from "express";
import { db } from "../util/db.server";
import bcrypt from 'bcrypt';
import { TypedRequestBody } from "../interfaces";

export const handleNewUser = async (req: TypedRequestBody<{ email: string, password: string }>, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 'message': 'email and password are required' });
    }

    const result = await db.user.findUnique({
        where: {
            email: email,
        },
    });

    if (result) {
        return res.sendStatus(409); // Conflict
    }

    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        const user = await db.user.create({
            data: {
                email: email,
                password: hashedPwd,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        res.status(201).json({ 'message': `New user ${email} created!` });
    } catch (err: any) {
        res.status(500).json({ 'message': err.message })
    }
}