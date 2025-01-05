import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const messageHubService = (userName: string) => {
  return new HubConnectionBuilder()
    .withUrl(`https://connectxapi.azurewebsites.net/hubs/message?user=${userName}`, {
      accessTokenFactory: () => localStorage.getItem('token') || '',
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();
};