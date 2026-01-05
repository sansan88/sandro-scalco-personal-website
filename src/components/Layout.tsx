import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto max-w-3xl flex-1 px-4 py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
