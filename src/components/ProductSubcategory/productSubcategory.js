import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddProductSubcategory from "./addProductSubcategory";
import GetAllProductSubcategory from "./getAllProductSubcategory";

const ProductCategory = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }

  return (
    <div>
      <PageTitle title="Back" />

      <AddProductSubcategory />

      <GetAllProductSubcategory />
    </div>
  );
};

export default ProductCategory;
