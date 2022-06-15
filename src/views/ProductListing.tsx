import { PageHeader } from "antd";
import CreateProduct from "../components/CreateProduct";
import ProductTable from "../components/ProductTable";
import useProductEffect from "../effects/useProductEffect";

function ProductListing() {

  const { products, addProduct, deleteProduct, editProduct } = useProductEffect();

  return <>
    <PageHeader title="Uncle Minimart Product Listing"></PageHeader>
    <div style={{ textAlign: "right", paddingRight: "5em" }}>
      <CreateProduct addProduct={addProduct}></CreateProduct>
    </div>
    <div style={{ paddingLeft: "5em", paddingRight: "5em" }}>
      <ProductTable products={products} deleteProduct={deleteProduct} editProduct={editProduct} />
    </div>
  </>
}

export default ProductListing;
