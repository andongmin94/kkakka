import Link from "next/link";

export default function SidebarDemo({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="dnf">dasd </div>
      <div className="flex flex-col h-screen p-3 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] w-60">
        <div className="space-y-3 ">
          <div className="flex-1">
            <ul className="pt-2 pb-4 font-bold space-y-4 text-xl">
              <li className="rounded-sm">               
                <Link
                  href="/itemShop"
                  className="flex items-center p-2 space-x-3 rounded-md mx-8"
                >
                  <span>아이템샵</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="/chat"
                  className="flex items-center p-2 space-x-3 rounded-md mx-8"
                >
                  <span>메시지함</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="/settings"
                  className="flex items-center p-2 space-x-3 rounded-md mx-8"
                >
                  <span>환경 설정</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="document"
                  className="flex items-center p-2 space-x-3 rounded-md mx-8"
                >
                  <span>서비스 소개</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
