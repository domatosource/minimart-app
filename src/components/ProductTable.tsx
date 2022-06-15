import { Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Product } from "../models/Product";
import EditProduct from "./EditProduct";

interface ProductTableProps {
  products: Product[];
  deleteProduct: (id: String) => Promise<void>;
  editProduct: (id: String, name: String, price: Number) => Promise<Product>;
};

function ProductTable(props: ProductTableProps) {
  const { products, deleteProduct, editProduct} = props;

  const columns: ColumnsType<Product> = [ {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
    width: "30%"
  }, {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "40%"
  }, {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: "10%"
  }, {
    title: "Action",
    key: "action",
    width: "20%",
    render: (_, record) => (
      <Space size="middle">
        <EditProduct product={record} editProduct={editProduct}></EditProduct>
        <Popconfirm
          title="Are you sure to delete this product?"
          onConfirm={() => deleteProduct(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <a>Delete</a>
        </Popconfirm>
        
      </Space>
    )
  } ];

  return <Table 
    columns={columns} 
    dataSource={products} 
    rowKey="_id"
  />
}

export default ProductTable;