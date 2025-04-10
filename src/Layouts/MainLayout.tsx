import Footer from "../components/organisms/Footer";
import Header from "../components/organisms/Header";

interface MainLayoutInterface {
    children: React.ReactNode;
}

const MainLayout = (props: MainLayoutInterface) => {
  return(
    <div className="flex flex-col">
        <Header />
        {props.children}
        <Footer />
    </div>
  );
};

export default MainLayout;