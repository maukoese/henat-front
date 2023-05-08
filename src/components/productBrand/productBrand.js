import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddProductbrand from "./addProductBrand";
import GetAllProductBrand from "./getAllProductBrand";

const ProductBrand = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title="Back" />

      <AddProductbrand />

      <GetAllProductBrand />
    </div>
  );
};

export default ProductBrand;
