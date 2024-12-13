import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const messageHubService = (userName: string) => {
  return new HubConnectionBuilder()
    .withUrl(`http://localhost:5134/hubs/message?user=${userName}`, {
      accessTokenFactory: () => localStorage.getItem('token') || '',
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();
};