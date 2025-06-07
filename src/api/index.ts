// 发送消息对话
export function chatMessages(stream: AbortSignal, data: any, apiKey: string) {
    return fetch(
        `https://api.dify.ai/v1/chat-messages`,
        {
            method: "POST",
            body: JSON.stringify(data),
            signal: stream,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${apiKey}`,
            },
        }
    );
}

// 停止响应
export function chatMessagesStop(data: any, task_id: string, apiKey: string) {
    return fetch(
        `https://api.dify.ai/v1/chat-messages/${task_id}/stop`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${apiKey}`,
            },
        }
    );
}
