import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChatClient } from "./chat-client";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  makeStyles,
  Grid,
  ThemeProvider,
  createMuiTheme,
  Hidden,
} from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";

const URL =
  "wss://xqxuylymri.execute-api.us-east-1.amazonaws.com/productiontwo/";

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#2196f3",
      },
    },
});
  

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 0, // Remove margin
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  codeFont: {
    fontFamily: "Courier New, monospace", // Use any monospaced font you prefer
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  image: {
    width: "150px",
    height: "auto",
    margin: 0,
  },
}));

const App = () => {
  const classes = useStyles();
  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [members, setMembers] = useState<string[]>([]);
  const [chatRows, setChatRows] = useState<React.ReactNode[]>([]);
  const [username, setUsername] = useState<string>("");

  const onSocketOpen = useCallback(() => {
    if (isConnected) {
      console.log("Already connected.");
      return;
    }

    if (!username) {
      console.log("Username is required.");
      return;
    }

    if (members.includes(username)) {
      alert(`Failed to connect. User ${username} is already connected.`);
      return;
    }

    setIsConnected(true);
    socket.current!.send(JSON.stringify({ action: "setName", name: username }));
    setMembers((prevMembers) => [...prevMembers, username]);

    socket.current!.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === "userConnected" && data.name === username) {
        alert(`Failed to connect. User ${username} is already connected.`);
        socket.current!.close();
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member !== username)
        );
        setIsConnected(false);
      }
    };
  }, [members, username, isConnected]);

  const onSocketClose = useCallback(() => {
    setMembers([]);
    setIsConnected(false);
    setChatRows([]);
  }, []);

  const onSocketMessage = useCallback((dataStr) => {
    const data = JSON.parse(dataStr);
    if (data.members) {
      setMembers(data.members);
    } else if (data.publicMessage) {
      setChatRows((oldArray) => [
        ...oldArray,
        <span>
          <b>{data.publicMessage}</b>
        </span>,
      ]);
    } else if (data.privateMessage) {
      alert(data.privateMessage);
    } else if (data.systemMessage) {
      setChatRows((oldArray) => [
        ...oldArray,
        <span>
          <i>{data.systemMessage}</i>
        </span>,
      ]);
    }
  }, []);

  const onConnect = useCallback(() => {
    if (socket.current?.readyState !== WebSocket.OPEN) {
      socket.current = new WebSocket(URL);
      socket.current.addEventListener("open", onSocketOpen);
      socket.current.addEventListener("close", onSocketClose);
      socket.current.addEventListener("message", (event) => {
        onSocketMessage(event.data);
      });
    }
  }, [onSocketOpen, onSocketClose, onSocketMessage]);

  useEffect(() => {
    return () => {
      socket.current?.close();
    };
  }, []);

  const onSendPrivateMessage = useCallback((to: string) => {
    const message = prompt("Enter private message for " + to);
    socket.current?.send(
      JSON.stringify({
        action: "sendPrivate",
        message,
        to,
      })
    );
  }, []);

  const onSendPublicMessage = useCallback(() => {
    const message = prompt("Enter public message");
    socket.current?.send(
      JSON.stringify({
        action: "sendPublic",
        message,
      })
    );
  }, []);

  const onDisconnect = useCallback(() => {
    if (isConnected) {
      socket.current?.close();
      setMembers([]);
      setChatRows([]);
    }
  }, [isConnected]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmitUsername = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onConnect();
  };

  return (
    <ThemeProvider theme={theme}>
    <Container
      component="div"
      maxWidth="md"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={0} className={classes.paper}>
        {!isConnected && (
            <form onSubmit={handleSubmitUsername}>
              <Grid item xs={12} className={classes.imageContainer}>
              
                <img
                  src="./src/favicon.png"
                  alt="ChatBubble Image"
                  className={classes.image}
                  />
                  
              </Grid>
            <Typography variant="h3" align="center" gutterBottom>
              Welcome to ChatBubble
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
              Join ChatBubble
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              id="username"
              label="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              error={username === ""}
              helperText={username === "" ? "Username is required" : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Connect
              </Button>
              
            </form>
            
        )}

        {isConnected && (
          <ChatClient
            isConnected={isConnected}
            members={members}
            chatRows={chatRows}
            onPublicMessage={onSendPublicMessage}
            onPrivateMessage={onSendPrivateMessage}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
            username={username}
          />
        )}
      </Paper>
      </Container>
      </ThemeProvider>
  );
};

export default App;
