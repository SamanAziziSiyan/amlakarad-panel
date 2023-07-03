import Header from "../Common/Header";

const Layout = ({ children }) => {
  return (
    <>
      <div className=" w-4/5 m-auto flex items-center justify-center flex-col h-max">
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
