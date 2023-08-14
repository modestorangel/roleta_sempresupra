import User from "../../../../types/user";
import excuteQuery from "../db";

export default async function removeCountAccess(cpf: string, count: number) {
    try {
        const res: any = await excuteQuery({
            query: 'UPDATE USER_ACCESS SET COUNT = ? WHERE CPF = ?',
            values: [count, cpf],
        });
    } catch (err) {
        return err
    }
}