import Shopify from "@shopify/shopify-api";
import fetch from "node-fetch";

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;

const headers = {
    Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
};

const storeCallback = async (session) => {
    const {result} = await fetch(`${upstashRedisRestUrl}/set/${session.id}${!session.id.includes("offline") ? ('?EX=300') : ""}`, {
        method: "POST",
        headers,
        body: JSON.stringify(session),
    }).then(res => res.json());

    return result === 'OK';
}

const loadCallback = async (id) => {
    const {result} = await fetch(`${upstashRedisRestUrl}/get/${id}`, {
        method: "GET",
        headers,
    }).then(res => res.json());

    return JSON.parse(result)
}

const deleteCallback = async (id) => {
    const {result} = await fetch(`${upstashRedisRestUrl}/del/${id}`, {
        method: "DELETE",
        headers,
    }).then(res => res.json());

    return result === 'OK';
}

const SessionStorage = new Shopify.Session.CustomSessionStorage(storeCallback, loadCallback, deleteCallback)

export default SessionStorage