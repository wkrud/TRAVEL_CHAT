'use client';

import { useChat } from 'ai/react'; // useChat 훅을 import 합니다.
import { useEffect, useRef } from 'react'; 
export default function ChatClient({ initialMessages }) {   
const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({     // 이전 대화 기록을 초기 메시지로 설정합니다.
    initialMessages,
    api: '/api/chat',
});

const messagesEndRef = useRef(null);

// 메시지가 업데이트될 때마다 맨 아래로 스크롤합니다.
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
   
return (
  <div className="chat-container">
    <div className="messages">
      {/* useChat이 제공하는 messages 배열을 바로 사용합니다. */}
      {messages.map((m) => (
        <div key={m.id} className={`message ${m.role}`}>
          <p>{m.content}</p>
        </div>
      ))}
      {/* isLoading 상태도 useChat이 제공합니다. */}
      {isLoading && <div className="message assistant"><p>생각 중...</p></div>}
      <div ref={messagesEndRef} />
      </div>

      {/* form의 onSubmit에 useChat의 handleSubmit을 연결합니다. */}
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input} // useChat의 input 상태
          onChange={handleInputChange} // useChat의 이벤트 핸들러
          placeholder="메시지를 입력하세요..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>전송</button>
      </form>
     </div>
  );
}