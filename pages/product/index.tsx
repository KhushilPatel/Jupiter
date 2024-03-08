import Product_List from "@/components/Product/List/Product-List";
import Sider from "@/components/UI/Sider";

const Product = () => {
  
  return (
    <div className="flex">
      <div className="w-[20%] h-screen">
        <Sider />
      </div>
      <div className="w-full h-screen">
        <Product_List />
      </div>
    </div>
  );
};

export default Product;
