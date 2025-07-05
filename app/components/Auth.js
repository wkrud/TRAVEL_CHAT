'use client';
import { signIn, signOut } from 'next-auth/react';

export function Login() {
  return (
    <div className="login-container">
      <h1>Gemini Chat</h1>
      <p>AI와 대화를 시작하려면 로그인하세요.</p>
      <button onClick={() => signIn('google')} className="login-btn">
        Google 계정으로 로그인
      </button>
    </div>
  );
}

export function LogoutButton({ userName }) {
  return (
    <div className="user-info">
      <span>{userName}</span>
      <button onClick={() => signOut()}>로그아웃</button>
    </div>
  );
}
