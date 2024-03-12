# Bubble-Chat

This is a simple WebSocket chat application built with AWS Lambda, API Gateway, and React.

## Features

- **Real-time Communication:** Allows users to send and receive messages in real-time.
- **Public and Private Messages:** Supports sending public messages to all users and private messages to specific users.
- **User Authentication:** Users can set their name when connecting to the chat.

## Technologies Used

- **Frontend:** React, WebSocket API
- **Backend:** AWS Lambda, API Gateway
- **Database:** None (messages are not stored)

## How to Use

1. **Clone the Repository:** Clone this repository to your local machine using `git clone`.

2. **Install Dependencies:** Navigate to the `frontend` directory and run `npm install` to install the frontend dependencies.

3. **Configure AWS:** Set up your AWS account, create a new Lambda function, and configure API Gateway to handle WebSocket connections.

4. **Start the Application:** Start the frontend application using `npm start` in the `frontend` directory.

5. **Connect to the Chat:** Open the application in your browser and enter your name to connect to the chat.

6. **Send Messages:** Use the chat interface to send public or private messages.

## Future Improvements

- Add user authentication and authorization.
- Implement message persistence for offline users.
- Improve the user interface and add more features like emojis and file sharing.

## Contributors

- [Arif Afzal](https://github.com/Arifafzal51)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
