import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './chatinner.css'
const socket = io("http://localhost:4000/");

const ChatInner = ({ project }) => {
    const user = useSelector((state) => state.Auth.user);
    const [teamData, setTeamData] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState(project._id);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Fetch team data
        axios.get(`http://localhost:4000/TeamDataById/${project.TeamId}`)
            .then((result) => {
                setTeamData(result.data);
            })
            .catch((e) => {
                console.log(e);
            });
        setRoomId(project._id);
    }, [project]);

    useEffect(() => {
        if (teamData) {
            const m = teamData.TeamMembers.map(member => member.email);
            setMembers(m);
        }
    }, [teamData]);

    useEffect(() => {
        // Fetch messages whenever the roomId changes
        if (roomId) {
            axios.get(`http://localhost:4000/messages/${roomId}`)
                .then((result) => {
                    setMessages(result.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }, [roomId]); // Add roomId as a dependency

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to the Socket.IO server");
        });

        socket.emit("joinRoom", roomId);

        socket.on("message", (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
            setMessage("");
        });

        return () => {
            socket.off("message");
        };
    }, [roomId]); // Depend on roomId to join the correct room

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit("message", { roomId, senderId: user.email, message });
            setMessage("");
        }
    };

    const createRoom = () => {
        if (members.length > 0) { // Only create room if members exist
            socket.emit("createRoom", roomId, members);
            console.log(`Request to create room: ${roomId} with members: ${members}`);
        }
    };

    useEffect(() => {
        createRoom();
    }, [project,members]); // Create room only when members change

    return (
        <div>
            <h1>{project.ProjectTitle}</h1>
            <h2>Chat Room: {roomId}</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.senderId}: </strong>
                        {msg.message}
                    </p>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatInner;
