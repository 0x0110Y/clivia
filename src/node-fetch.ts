import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { CallBackendArguments } from 'swagger-to-graphql';

function getBodyAndHeaders(
    body: any,
    bodyType: 'json' | 'formData',
    headers: { [key: string]: string } | undefined,
) {
    if (!body) {
        return { headers };
    }

    if (bodyType === 'json') {
        return {
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        };
    }

    return {
        headers,
        body: new URLSearchParams(body),
    };
}

export async function callBackend(args: CallBackendArguments<unknown>) {
    let { requestOptions: { method, body, baseUrl, path, query, headers, bodyType }, } = args;
    const searchPath = query ? `?${new URLSearchParams(query)}` : '';
    const url = `${baseUrl}${path}${searchPath}`;
    const bodyAndHeaders = getBodyAndHeaders(body, bodyType, headers);

    const response = await fetch(url, {
        method,
        ...bodyAndHeaders,
    });
    const text = await response.text();

    if (response.ok) {
        try {
            return JSON.parse(text).data;
        } catch (e) {
            return text;
        }
    }
    throw new Error(`Response: ${response.status} - ${text}`);
}
