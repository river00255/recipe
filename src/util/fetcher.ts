type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const fetcher = async (method: Method, url: string, body?: { [key: string]: any }) => {
  if (!body) {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error('Fail to fetch.');
  return await response.json();
};
