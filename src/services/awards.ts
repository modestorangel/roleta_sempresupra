import { api } from "./api";

export default async function getAwards() {
    return await api.get('/award')
}