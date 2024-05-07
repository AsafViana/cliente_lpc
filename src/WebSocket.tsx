import { ReactNode, createContext, useEffect, useState } from "react";

interface IWebsocketProviderProps {
  children: ReactNode;
}
interface IWebsocketContextProps {
  message: string;
  isSendingMessage: boolean;
  handleSendWebsocketMessage: (message: string) => void;
}

const WebsocketContext = createContext<IWebsocketContextProps>(
  {} as IWebsocketContextProps
);

const WebsocketProvider = ({ children }: IWebsocketProviderProps) => {
  const [websocketMessage, setWebsocketMessage] = useState<string>("");
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [websocketInstance, setWebsocketInstance] = useState<WebSocket | null>(
    null
  );

  const handleSendWebsocketMessage = (message: string): void => {
    if (!websocketInstance || websocketInstance.readyState !== WebSocket.OPEN)
      return;

    websocketInstance.send(message);
    setIsSendingMessage(true);
    return 
  };

  useEffect(() => {
    const ws = new WebSocket("wss://servidor-nuvem-lpc.onrender.com");

    if (!ws) return;

    ws.addEventListener("message", (event) => {
      setWebsocketMessage(event.data);
      setIsSendingMessage(false);
    });

    setWebsocketInstance(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, []);

  return (
    <WebsocketContext.Provider
      value={{
        message: websocketMessage,
        isSendingMessage,
        handleSendWebsocketMessage,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export { WebsocketProvider, WebsocketContext };
