import { Button, Form, Input, InputNumber, Modal, notification, Result } from "antd";
import { useState } from "react";
import { Product } from "../models/Product";

interface CreateProductProps {
  addProduct: (name: String, price: Number) => Promise<Product>
};

function CreateProduct(props: CreateProductProps) {

  const { addProduct } = props;
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
      const result = await addProduct(
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
      <Button type="primary" onClick={showModal}>
        Add Product
      </Button>
      <Modal title="Add Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
          onFinish={onFinish}
        >
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

export default CreateProduct;