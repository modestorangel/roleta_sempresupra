import excuteQuery from "../db";

export default async function downCountAwards(description: string, count: number) {
    try {
        const res: any = await excuteQuery({
            query: 'UPDATE AWARDS SET COUNT = ? WHERE DESCRIPTION = ?',
            values: [count, description],
        });
    } catch (err) {
        return err
    }
}