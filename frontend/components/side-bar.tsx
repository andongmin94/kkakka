import Link from "next/link";

export default function SidebarDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3 shadow-[0_12px_15px_-1px_rgba(0,0,0,0.6)] w-60">
        <div className="space-y-3 ">
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-8 text-2xl font-dnf">
              <li className="rounded-sm">
                <Link
                  href="/itemShop"
                  className="flex items-center p-2 space-x-3 rounded-md mx-8 mt-6"
                >
                  아이템샵
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="/chat"
                  className="flex items-center p-2 space-x-3 rounded-md mx-8"
                >
                  메시지함
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="/settings"
                  className="flex items-center p-2 space-x-3 rounded-md mx-8"
                >
                  환경 설정
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  href="document"
                  className="flex items-center p-2 space-x-3 rounded-md mx-8"
                >
                  서비스 소개
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
