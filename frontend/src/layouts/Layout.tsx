import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
  page: string;
}

const Layout = ({ children, page }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header bgHandle={page} />
      <div className="mx-auto" style={{ zIndex: 99, maxWidth: "85vw" }}>
        <SearchBar handler={page} />
      </div>

      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
