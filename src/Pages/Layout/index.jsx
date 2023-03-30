import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Header, Footer } from "../../component";
import { isLoggedIn } from "../../service";

const Layout = () => {
  const location = useLocation();
  return isLoggedIn() ?  (
      <main className="d-flex flex-nowrap">
        <div className="w-100 overflow-auto main-wrapper min-vh-100 d-flex flex-column">
          <Header />
          <section>
            <Outlet />
          </section>
          <Footer />
        </div>
      </main>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default Layout;
