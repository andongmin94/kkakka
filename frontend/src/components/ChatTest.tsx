// import "./App.css";
// import InputField from "./components/InputField/InputField";
// import MessageContainer from "./components/MessageContainer/MessageContainer";
// import socket from "./server";
// import { useEffect, useState } from "react";

// function ChatTest() {
//   const [user, setUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messageList, setMessageList] = useState([]);
//   console.log("messageList", messageList);

//   useEffect(() => {
//     socket.on("message", (message) => {
//       setMessageList((preState) => preState.concat(message));
//     });
//     askUserName();
//   }, []);

//   const askUserName = () => {
//     const userName = prompt("당신의 이름을 입력하세요");
//     console.log("uuu", userName);

//     socket.emit("login", userName, (res) => {
//       if (res?.ok) {
//         setUser(res.data);
//       }
//     });
//   };

//   const sendMessage = (event) => {
//     event.preventDefault();
//     socket.emit("sendMessage", message, (res) => {
//       console.log("sendMessage res", res);
//     });
//   };

//   return (
//     <div>
//       <div className="App">
//         <MessageContainer messageList={messageList} user={user} />
//         <InputField
//           message={message}
//           setMessage={setMessage}
//           sendMessage={sendMessage}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

// const InputField = ({message,setMessage,sendMessage}) => {

//     return (
//       <div className="input-area">
//             <div className="plus-button">+</div>
//             <form onSubmit={sendMessage} className="input-container">
//               <Input
//                 placeholder="Type in here…"
//                 value={message}
//                 onChange={(event) => setMessage(event.target.value)}
//                 multiline={false}
//                 rows={1}
//               />

//               <Button
//                 disabled={message === ""}
//                 type="submit"
//                 className="send-button"
//               >
//                 전송
//               </Button>
//             </form>
//           </div>
//     )
//   }

//   const MessageContainer = ({ messageList, user }) => {
//     return (
//       <div>
//         {messageList.map((message, index) => {
//           return (
//             <Container key={message._id} className="message-container">
//               {message.user.name === "system" ? (
//                 <div className="system-message-container">
//                   <p className="system-message">{message.chat}</p>
//                 </div>
//               ) : message.user.name === user.name ? (
//                 <div className="my-message-container">
//                   <div className="my-message">{message.chat}</div>
//                 </div>
//               ) : (
//                 <div className="your-message-container">
//                   <img
//                     src="/profile.jpeg"
//                     className="profile-image"
//                     style={
//                       (index === 0
//                         ? { visibility: "visible" }
//                         : messageList[index - 1].user.name === user.name) ||
//                       messageList[index - 1].user.name === "system"
//                         ? { visibility: "visible" }
//                         : { visibility: "hidden" }
//                     }
//                   />
//                   <div className="your-message">{message.chat}</div>
//                 </div>
//               )}
//             </Container>
//           );
//         })}
//       </div>
//     );
//   };
