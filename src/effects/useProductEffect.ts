import { useEffect, useState } from "react";
import api from "../api";
import { Product } from "../models/Product";
import { filter, findIndex, slice } from "lodash";

interface ProductEffectView {
  products: Product[];
  addProduct: (name: String, price: Number) => Promise<Product>;
  deleteProduct: (id: String) => Promise<void>;
  editProduct: (id: String, name: String, price: Number) => Promise<Product>;
};

function useProductEffect(): ProductEffectView {
  const [ products, setProducts ] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('products');
      setProducts(res.data);
    }

    fetchData().catch((err) => {
      console.log(err);
      setProducts([]);
    })
  }, []);

  const addProduct = async (name: String, price: Number): Promise<Product> => {
    const res = await api.post("products", { name, price });
    setProducts([ res.data, ...products ]);
    return res.data;
  };

  const deleteProduct = async (id: String): Promise<void> => {
    const res = await api.delete(`products/${id}`);
    setProducts(
      filter(products, (currentObject) => {
        return currentObject._id !== id;
      })
    );
  };

  const editProduct = async (id: String, name: String, price: Number): Promise<Product> => {
    const res = await api.patch(`products/${id}`, { name, price });
    const index = findIndex(products, { _id: id });
    setProducts([ ...slice(products, 0, index), res.data, ...slice(products, index+1) ]);
    return res.data;
  };

  return {
    products,
    addProduct,
    deleteProduct,
    editProduct
  }
}

export default useProductEffect;