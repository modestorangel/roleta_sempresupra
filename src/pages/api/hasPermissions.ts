import { NextApiRequest, NextApiResponse } from 'next';
import getCountAccess from './lib/userSvc/getCountAccess';
import removeCountAccess from './lib/userSvc/removeCountAccess';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { cpf, email } = req.body
        const count = await getCountAccess({ cpf, email })

        if (count > 0) {
            removeCountAccess(cpf, count - 1)
            return res.json({ success: true })
        }

        return res.json({ message: 'Usuário não permitido! \n Verifique os dados e tente novamente', success: false })
    } catch (error) {
        res.status(405).end('method not allowed')
    }
};