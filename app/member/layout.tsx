import { SidebarProvider } from '@/components/ui/sidebar';
import MemberSidebar from '@/components/member/sidebar';
import MemberHeader from '@/components/member/header';

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* SIDEBAR */}
        <MemberSidebar />

        {/* CONTENT */}
        <div className="flex-1 flex flex-col">
          {/* HEADER MOBILE */}
          <MemberHeader />

          {/* PAGE CONTENT */}
          <main className="p-6 flex-1 bg-zinc-950">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
