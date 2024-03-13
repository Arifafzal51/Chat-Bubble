import React from "react";
import { Button } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";

interface Props {
  isConnected: boolean;
  members: string[];
  chatRows: React.ReactNode[];
  onPublicMessage: () => void;
  onPrivateMessage: (to: string) => void;
  onConnect: () => void;
  onDisconnect: () => void;
  username: string; // Add username prop
}

export const ChatClient = (props: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "#093170",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Container maxWidth="lg" style={{ height: "90%" }}>
        <Grid container style={{ height: "100%" }}>
          <Grid
            item
            xs={2}
            style={{ backgroundColor: "#2196f3", color: "white" }}
          >
            <div style={{ padding: "10px 0", textAlign: "center" }}>
              <h2>{props.username}</h2>
            </div>
            <List component="nav">
              {props.members.map((item) => (
                <ListItem
                  key={item}
                  onClick={() => {
                    props.onPrivateMessage(item);
                  }}
                  button
                >
                  <ListItemText
                    style={{ fontWeight: 800, borderColor: "#ff1744" }}
                    primary={item}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid
            style={{ position: "relative" }}
            item
            container
            direction="column"
            xs={10}
          >
            <Paper style={{ flex: 1 , borderColor: "blue"}}>
              <Grid
                item
                container
                style={{ height: "100%" }}
                direction="column"
              >
                <Grid item container style={{ flex: 1 }}>
                  <ul
                    style={{
                      paddingTop: 20,
                      paddingLeft: 44,
                      paddingRight: 44,
                      border:'white',
                      listStyleType: "none",
                    }}
                  >
                    {props.chatRows.map((item, i) => (
                      <li key={i} style={{ paddingBottom: 9 , }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Grid>
                <Grid item style={{ margin: 10 }}>
                  {props.isConnected && (
                    <Button
                      style={{
                        marginRight: 7,
                        color: "white",
                        backgroundColor: "#2196f3", 
                        borderColor: "#e8f4fd",
                      }}
                      variant="outlined"
                      size="small"
                      disableElevation
                      onClick={props.onPublicMessage}
                    >
                      Send Public Message
                    </Button>
                  )}
                  {props.isConnected && (
                    <Button
                    style={{
                      color: 'white',
                      backgroundColor: '#ff1744', 
                      borderColor: '#e8f4fd', 
                    }}
                      variant="outlined"
                      size="small"
                      disableElevation
                      onClick={props.onDisconnect}
                    >
                      Disconnect
                    </Button>
                  )}
                  {!props.isConnected && (
                    <Button
                    style={{
                      color: 'white',
                      backgroundColor: '#00e676', // Change background color here
                      borderColor: '#e8f4fd', // Change border color here
                    }}
                      variant="outlined"
                      size="small"
                      disableElevation
                      onClick={props.onConnect}
                    >
                      Connect
                    </Button>
                  )}
                </Grid>
              </Grid>
              <div
                style={{
                  position: "absolute",
                  right: 9,
                  top: 8,
                  width: 12,
                  height: 12,
                  backgroundColor: props.isConnected ? "#00da00" : "#e2e2e2",
                  borderRadius: 50,
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
