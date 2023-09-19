import { Session } from '@shopify/shopify-api';

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;

const headers = {
  Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const loadSession = async (id) => {
  const { result } = await fetch(`${upstashRedisRestUrl}/get/${id}`, {
    method: 'GET',
    headers,
  }).then((res) => res.json());

  return JSON.parse(result);
};
const storeSession = async (session) => {
  const { result } = await fetch(
    `${upstashRedisRestUrl}/set/${session.id}${
      !session.id.includes('offline') ? '?EX=300' : ''
    }`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(session),
    }
  ).then((res) => res.json());

  return result === 'OK';
};
const deleteSession = async (id) => {
  const { result } = await fetch(`${upstashRedisRestUrl}/del/${id}`, {
    method: 'DELETE',
    headers,
  }).then((res) => res.json());

  return result === 'OK';
};

const customSessionHandler = { storeSession, loadSession, deleteSession };

export default customSessionHandler;
