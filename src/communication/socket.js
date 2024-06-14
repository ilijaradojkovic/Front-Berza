import { RSocketClient } from "rsocket-core";
import RSocketWebSocketClient from "rsocket-websocket-client";

const BASE_URL='ws://localhost:9000/'

function clientSetup(){
    return  new RSocketClient({
        setup: {
          // ms btw sending keepalive to server
          keepAlive: 60000,
          // ms timeout if no keepalive response
          lifetime: 180000,
          // format of `data`
          dataMimeType: "application/json",
          // format of `metadata`
          metadataMimeType: "message/x.rsocket.routing.v0",
        },
        transport: new RSocketWebSocketClient({
          url: "ws://localhost:9001/",
        }),
      });
}

export function connectToGameState(handlePayload){

    const client= clientSetup();
    client.connect().subscribe({
        onComplete: (socket) => {
          socket
            .requestStream({
              metadata: String.fromCharCode("game-state".length) + "game-state",
            })
            .subscribe({
              onComplete: () => {
                console.log("complete");
              },
              onError: (error) => {
                console.log(error);
              },
              onNext: (payload) => {
                let dataFromSocket = JSON.parse(payload.data);
                handlePayload(dataFromSocket)
              },
              onSubscribe: (subscription) => {
                subscription.request(2147483647);
              },
            });
        },
        onError: (error) => {
          console.log(error);
        },
        onSubscribe: (cancel) => {},
      });
}

export function connectToGamePoints(handlePayload){
    const client =clientSetup();
      client.connect().subscribe({
        onComplete: (socket) => {
          // socket provides the rsocket interactions fire/forget, request/response,
          // request/stream, etc as well as methods to close the socket.
          socket
            .requestStream({
              metadata: String.fromCharCode("points".length) + "points",
            })
            .subscribe({
              onComplete: () => {
                console.log("complete");
              },
              onError: (error) => {
                console.log(error);
                // addErrorMessage("Connection has been closed due to ", error);
              },
              onNext: (payload) => {
                let socketData = JSON.parse(payload.data);
                 handlePayload(socketData);    
                 
                // updateState(payload.data);
              },
              onSubscribe: (subscription) => {
                subscription.request(2147483647);
              },
            });
        },
        onError: (error) => {
          console.log(error);
          // addErrorMessage("Connection has been refused due to ", error);
        },
      });
}
 