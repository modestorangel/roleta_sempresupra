import User from "../../../../types/user";
import excuteQuery from "../db";

export default async function store({ name, cpf, email, award }: User) {
    try {
        const res = await excuteQuery({
            query: 'INSERT INTO USERS_AWARD (name, cpf, email, award) VALUES(?, ?, ?, ?)',
            values: [name, cpf, email, award],
        });

        return res
    } catch (err) {
        return err
    }
}