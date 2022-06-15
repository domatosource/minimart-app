import { Form, Input, InputNumber, Modal, notification } from "antd";
import Link from "antd/lib/typography/Link";
import { useState } from "react";
import { Product } from "../models/Product";

interface EditProductProps {
  product: Product;
  editProduct: (id: String, name: String, price: Number) => Promise<Product>
};

function EditProduct(props: EditProductProps) {

  const { product, editProduct } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async () => {
    try {
      const result = await editProduct(
        product._id,
        form.getFieldValue("name"),
        form.getFieldValue("price")
      );
      setIsModalVisible(false);
    } catch (e) {
      console.log(e);
      notification.open({
        message: "Error",
        description: "An error has occurred. Please try again later"
      });
    }
  }

  return (
    <>
      <Link onClick={showModal}>
        Edit
      </Link>
      <Modal title="Edit Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          initialValues={product}
        >
          <Form.Item
            label="ID"
            name="_id"
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the product price!' }]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditProduct;