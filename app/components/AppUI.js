'use client';

import { useState } from 'react';
import { LogoutButton } from "./Auth";
import ChatClient from "./ChatClient";

// 중요: 여기에 임베드할 스프레드시트의 URL을 입력하세요.
// Google Sheets: '파일' > '웹에 게시' > '삽입'에서 URL을 얻을 수 있습니다.
const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT-g6D_g_g_g_g/pubhtml?widget=true&amp;headers=false";

export default function AppUI({ user, initialMessages }) {
  // 모바일 뷰에서 활성화된 탭을 관리하는 상태 ('spreadsheet' 또는 'chat')
  const [activeTab, setActiveTab] = useState('spreadsheet');

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Gemini & Sheets</h1>
        <LogoutButton userName={user.name} />
      </header>

      {/* 모바일 전용 탭 네비게이션 */}
      <div className="mobile-tab-nav">
        <button
          className={activeTab === 'spreadsheet' ? 'active' : ''}
          onClick={() => setActiveTab('spreadsheet')}
        >
          시트
        </button>
        <button
          className={activeTab === 'chat' ? 'active' : ''}
          onClick={() => setActiveTab('chat')}
        >
          채팅
        </button>
      </div>

      <main className="main-content-area">
        {/* 스프레드시트 iframe 컨테이너 */}
        <div className={`spreadsheet-container ${activeTab !== 'spreadsheet' ? 'hidden-mobile' : ''}`}>
          <iframe
            src={SPREADSHEET_URL}
            title="Spreadsheet"
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </div>

        {/* 채팅 컨테이너 */}
        <div className={`chat-wrapper ${activeTab !== 'chat' ? 'hidden-mobile' : ''}`}>
          <ChatClient initialMessages={initialMessages} />
        </div>
      </main>
    </div>
  );
}
