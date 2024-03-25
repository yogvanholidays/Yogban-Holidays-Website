import Footer from "../components/Footer";
import GoToTopButton from "../components/GoToTopButton";
import Header from "../components/Header";
import SearchBar from "../components/OldSearchBar";
// import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
  page: string;
  hiddenSearchBar: string;
}

const Layout = ({ children, page, hiddenSearchBar }: Props) => {
  const searchBarHiden = hiddenSearchBar === "hide";
  return (
    <div className="flex flex-col min-h-screen">
      <Header bgHandle={page} />
      {!searchBarHiden && (
        <div
          className="mx-auto max-w-[85vw] portrait:max-w-[95vw] portrait:w-[90vw] portrait:-mt-5"// landscape:-mt-20 landscape:mb-10" //remove last part to revert searchbar new positioning
          style={{ zIndex: 99 }}
        >
          <SearchBar handler={page} />
        </div>
      )}

      <div className="container mx-auto py-10 flex-1">{children}</div>
      <GoToTopButton />
      <Footer />
    </div>
  );
};

export default Layout;
