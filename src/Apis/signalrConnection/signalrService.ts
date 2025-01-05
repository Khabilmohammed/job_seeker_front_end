import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

class SignalrService {
  public connection: HubConnection | null = null;
  constructor() {
    this.initializeConnection();
  }

  private initializeConnection() {
    this.connection = new HubConnectionBuilder()
      .withUrl('https://connectxapi.azurewebsites.net/hubs/presence', { 
        accessTokenFactory: () => localStorage.getItem('token') || ''
      })
      .withAutomaticReconnect()
      .build();
    this.connection.start()
      .then(() => {
        console.log('Connected to the SignalR hub');
      })
      .catch((err) => {
        console.error('Error while connecting to SignalR hub: ', err);
      });

    // Register event listeners for user presence events
    this.connection.on('UserIsOnline', (userName: string) => {
      console.log(`${userName} is online.`);
    });

    this.connection.on('UserIsOffline', (userName: string) => {
      console.log(`${userName} is offline.`);
    });
  }

  // Method to start connection (in case the connection is not established automatically)
  public startConnection() {
    if (this.connection?.state !== 'Connected') {
      this.connection?.start()
        .then(() => console.log('Connection started.'))
        .catch((err) => console.error('Connection failed: ', err));
    }
  }

  // Method to stop the connection
  public stopConnection() {
    this.connection?.stop()
      .then(() => console.log('Connection stopped.'))
      .catch((err) => console.error('Error stopping connection: ', err));
  }
}

export default new SignalrService();
