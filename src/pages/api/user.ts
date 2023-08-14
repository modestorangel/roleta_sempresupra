import { NextApiRequest, NextApiResponse } from 'next';
import downCountAwards from './lib/awardSvc/downCountAwards';
import getCountAwards from './lib/awardSvc/getCountAwards';
import send from './lib/email';
import store from './lib/userSvc/store';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, cpf, email, award } = req.body

    const result: any = await store({ name, cpf, email, award })
    await send(email, name, award)
    const countAwards = await getCountAwards(award)
    if (countAwards > 0)
      downCountAwards(award, countAwards - 1)
    return res.json({ success: true, id: result.insertId })

  } catch (error) {
    return res.json({ message: 'Usuário não permitido! \n Verifique os dados e tente novamente', success: false })
  }
};