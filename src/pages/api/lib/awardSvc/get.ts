import excuteQuery from "../db";

export default async function getCountAccess() {
    try {
        const res: any = await excuteQuery({
            query: 'SELECT description, count FROM AWARDS'
        });

        return res
    } catch (err) {
        return []
    }
}