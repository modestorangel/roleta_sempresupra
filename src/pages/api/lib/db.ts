// db.js
import mysql from 'serverless-mysql';
const db = mysql({
    config: {
        host: "108.181.92.69",
        port: "3306",
        database: "roleta_ss",
        user: "admin_roleta",
        password: "v6ECM@TJZZk18gVG"
    }
});
export default async function excuteQuery({ query, values }: any) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        return { error };
    }
}
