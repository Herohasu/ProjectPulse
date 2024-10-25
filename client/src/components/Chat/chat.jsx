import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChatInner from './chatInner';
import './chat.css'

const socket = io("http://localhost:4000/");

// const Chat = ({ project }) => {
//     const user = useSelector((state) => state.Auth.user)
//     const [teamData, setTeamData] = useState(null);
//     const [message, setMessage] = useState();
//     const [messages, setMessages] = useState([]);
//     const [roomId, setRoomId] = useState(project._id);
//     const [members, setMembers] = useState([]);

//     useEffect(() => {
//         axios.get(`http://localhost:4000/TeamDataById/${project.TeamId}`)
//             .then((result) => {
//                 setTeamData(result.data);
//             })
//             .catch((e) => {
//                 console.log(e);
//             })
//     }, [project]);

//     useEffect(() => {
//         if (teamData) {
//             const m = teamData.TeamMembers.map(member => member.email);
//             setMembers(m);
//         }
//     }, [teamData]);



//     useEffect(() => {

//         socket.on("connect", () => {
//             console.log("Connected to the Socket.IO server");
//         });

//         socket.emit("joinRoom", roomId);

//         socket.on("message", (msg) => {
//             setMessages((prevMessages) => [...prevMessages,msg]);
//             setMessage("");
//         })

//         return () => {
//             socket.off("message");
//         };

//     }, [roomId]);

//     const sendMessage = (e) => {
//         e.preventDefault();
//         if (message.trim()) {
//             socket.emit("message", { roomId, senderId: user.email, message });
//             setMessage("");
//         }
//     };

//     const createRoom = () => {
//         socket.emit("createRoom", roomId, members);
//         console.log(`Request to create room: ${roomId} with members: ${members}`)
//     }

//     useEffect(()=>{
//         createRoom();
//     },[project]);

//     return (
//         <div>
//             <h2>Chat Room: {roomId}</h2>
//             <div>
//                 {messages.map((msg, index) => (
//                     <p key={index}>
//                         <strong>{msg.senderId}: </strong>
//                         {msg.message}
//                     </p>
//                 ))}
//             </div>
//             <form onSubmit={sendMessage}>
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type a message"
//                 />
//                 <button type="submit">Send</button>
//             </form>
//         </div>
//     )
// }


const Chat = ({ user,role }) => {
    // const user = useSelector((state) => state.Auth.user)
    const [ProjectsData, setProjectsData] = useState([]);
    const [showChatModal, setShowChatModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [newMessage, setNewMessage] = useState(false); 

    useEffect(() => {
        // Fetch projects based on role
        if (role === "faculty") {
            axios.get(`http://localhost:4000/ProjectDetailByFaculty/${user.email}`)
                .then(result => {
                    const approvedProjects = result.data.filter(project => project.Approval === 'yes');
                    setProjectsData(approvedProjects);
                })
                .catch((error) => console.log(error));
        } else {
            axios.get(`http://localhost:4000/ShowProjectsByEmail/${user.email}`)
                .then(result => {
                    const approvedProjects = result.data.filter(project => project.approval === 'yes');
                    setProjectsData(approvedProjects);
                })
                .catch((error) => console.log(error));
        }
    }, [user, role]);

    useEffect(() => {
        // Listen for new messages
        socket.on("message", (msg) => {
            setNewMessage(true); // Set new message state to true when a message is received
        });

        return () => {
            socket.off("message");
        };
    }, []);

    const handleButtonClick = (project) => {
        setShowChatModal(true);
        setSelectedProject(project);
        setNewMessage(false); 
    };

    return (
        <div className="chat-container-main">
            {/* Sidebar */}
            <div className="sidebar-chat-bar">
            <h1><h2>Project</h2> Group </h1>
                <ul>
                    {ProjectsData.map((project, index) => (
                        <li key={index}>
                            <button onClick={() => handleButtonClick(project)}>{project.ProjectTitle}</button>
                        </li>
                    ))}
                </ul>
            </div>
    
            {/* Chat Window */}
            <div className="chat-window-flex">
                {showChatModal && 
                    <ChatInner project={selectedProject} />
                }
            </div>
        </div>
    );
}



// const Chat = ({ user ,role}) => {

//     const [ProjectsData, setProjectsData] = useState([]);
//     const [showChatModal, setShowChatModal] = useState(false);
//     const [selectedProject, setSelectedProject] = useState(null);

//     useEffect(() => {
//         if(role=="faculty"){
//             axios.get(`http://localhost:4000/ProjectDetailByFaculty/${user.email}`)
//             .then(result => {
//                 setProjectsData(result.data);
//                 setProjectsData(ProjectsData.filter(project => project.Approval === 'yes'))
//             })
//         }
//         else{
//             axios.get(`http://localhost:4000/ShowProjectsByEmail/${user.email}`)
//             .then(result => {
//                 setProjectsData(result.data);

//                 const p = ProjectsData.filter(project => project.approval === 'yes')
//                 setProjectsData(p);
//             })
//         }
//     }, [user]);


//     const handleButtonClick = ((project) => {
//         setShowChatModal(true);
//         setSelectedProject(project);
//     });

//     return (
//         <div className="chat-container-main">
//             {/* Sidebar */}
//             <div className="sidebar-chat-bar">
//                 <h1><h2>Project</h2> Group </h1>
//                 <ul>
//                     {ProjectsData.map((project, index) => (
//                         <li key={index}>
//                             <button onClick={() => handleButtonClick(project)}>{project.ProjectTitle}</button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
    
//             {/* Chat Window */}
//             <div className="chat-window-flex">
//                 {showChatModal && 
//                     <ChatInner project={selectedProject} />
//                 }
//             </div>
//         </div>
//     )
    
// }

export default Chat