import User from "../../../../types/user";
import excuteQuery from "../db";

export default async function getCountAccess({ cpf, email }: User) {
    try {
        const res: any = await excuteQuery({
            query: 'SELECT * FROM USER_ACCESS WHERE CPF = ? AND EMAIL = ?',
            values: [cpf, email],
        });

        if (res.length <= 0)
            return 0

        return res[0].COUNT
    } catch (err) {
        return 0
    }
}