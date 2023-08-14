// db.js
import mysql from 'serverless-mysql';
const db = mysql({
    config: {
        host: "172.106.0.112",
        port: 3306,
        database: "roleta-ss",
        user: "vjf2a4gz",
        password: "4lM19Bn7qf"
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