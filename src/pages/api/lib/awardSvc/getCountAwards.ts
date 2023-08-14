import excuteQuery from "../db";

export default async function getCountAwards(description: string) {
    try {
        console.log(description);
        const res: any = await excuteQuery({
            query: 'SELECT * FROM AWARDS WHERE DESCRIPTION = ?',
            values: [description],
        });

        if (res.length <= 0)
            return 0

        return res[0].COUNT
    } catch (err) {
        return 0
    }
}