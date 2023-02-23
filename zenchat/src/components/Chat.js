import {React, useEffect, useState} from "react";

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    // Here is the message list. Handled by a state
    const[messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if(currentMessage !== ''){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                timestamp:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            // When user sends message, add user's sent message to the list as well. So that users can see their sent message
            setMessageList((list) => [...list, messageData]);
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        })
    }, [socket]);

    return (
        <div>
            <div className="chatHeader">
                <h1>Chatting in room: {room}</h1>
            </div>
            <div className="chatBody">
                {
                
                messageList.map((messageContent) => {
                    return <h1>{messageContent.timestamp}</h1>;
                })
                }
            </div>
            <div className="chatFooter">
                <input
                    type="text"
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                />
                <button onClick={sendMessage}>Submit</button>
            </div>
        </div>
    )
};

export default Chat;