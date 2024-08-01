import { toast } from "react-toastify";
import { RSocketClient } from "rsocket-core";
import RSocketWebSocketClient from "rsocket-websocket-client";
import { showErrorNotification } from "../components/util/notificationSystem";

const BASE_URL=import.meta.env.VITE_BASE_URL_SOCKET+'/'

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
          url: BASE_URL,
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
                console.error("Connection error:", error);
                showErrorNotification("Connection has been closed")
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
          console.error("Connection error:", error);
          showErrorNotification("Error getting game state")
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
                console.error("Connection error:", error);
                showErrorNotification("Connection has been closed")

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
          showErrorNotification("Connection has been closed")

          // addErrorMessage("Connection has been refused due to ", error);
        },
      });
}
 
export function connectToCashInBet(handlePayload, data) {
  const client = clientSetup();

  client.connect().subscribe({
    onComplete: (socket) => {
      socket
        .requestResponse({
          data: JSON.stringify(data),
          metadata: String.fromCharCode("bet".length) + "bet",
        })
        .subscribe({
          onComplete: (response) => {
            handlePayload(response);
          },
          onError: (error) => {
            console.error("Error placing bet:", error);
            showErrorNotification("Error placing bet "+ error.message)

          },
        });
    },
    onError: (error) => {
      console.error("Connection error:", error);
      showErrorNotification("Connection has been closed")

    },
  });
}

export function connectToCashOutBet(handlePayload,data){
  const client =clientSetup();
  client.connect().subscribe({
    onComplete: (socket) => {
      socket
        .requestResponse({
          data: JSON.stringify(data),
          metadata: String.fromCharCode("bet".length) + "bet",
        })
        .subscribe({
          onComplete: (r) => {
            handlePayload(null);
          },
          onError: (error) => {
            console.log("Error cashout bet:", error);
            showErrorNotification("Error cashout bet "+ error.message)

          },
        });
    },
    onError: (error) => {
      console.log("Connection error:", error);
      showErrorNotification("Connection has been closed")

    },
  });

};

export function connectToCancelBet(handlePayload, data) {
  const client = clientSetup();
  client.connect().subscribe({
    onComplete: (socket) => {

      socket
        .requestResponse({
          data: JSON.stringify(data), // Ensure data is correctly serialized
          metadata: String.fromCharCode("bet".length) + "bet",
        })
        .subscribe({
          onComplete: (response) => {
            handlePayload(response); // Pass the response to the handlePayload function
          },
          onError: (error) => {
            console.error("Error cancel bet:", error);
            showErrorNotification("Error cancel bet " +error.message)
          },
        });
    },
    onError: (error) => {
      console.error("Connection error:", error);
      showErrorNotification("Connection has been closed")
    },
  });
}






export function connectToChat(handlePayload){
  const client =clientSetup();
    client.connect().subscribe({
      onComplete: (socket) => {
        // socket provides the rsocket interactions fire/forget, request/response,
        // request/stream, etc as well as methods to close the socket.
        socket
          .requestStream({
            metadata: String.fromCharCode("chat".length) + "chat",
          })
          .subscribe({
            onComplete: () => {
              console.log("complete");
            },
            onError: (error) => {
              console.log(error);
              // addErrorMessage("Connection has been closed due to ", error);
              showErrorNotification("")
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
        showErrorNotification("Connection has been closed")
      },
    });
}
