import { auth } from "./api/auth/[...nextauth]/route";
import { Login } from "./components/Auth";
import AppUI from "./components/AppUI"; // 새로 만들 컴포넌트
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUserMessages(userId) {
  if (!userId) return [];
  return await prisma.message.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
  });
}

export default async function Home() {
  const session = await auth();

  // 1. 로그인하지 않은 경우, 로그인 페이지를 보여줍니다.
  if (!session?.user) {
    return <Login />;
  }

  // 2. 로그인한 경우, 사용자의 이전 메시지를 가져옵니다.
  const initialMessages = await getUserMessages(session.user.id);

  // 3. 메인 UI 컴포넌트를 렌더링하고 필요한 데이터를 전달합니다.
  return <AppUI user={session.user} initialMessages={initialMessages} />;
}
