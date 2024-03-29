import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStyles } from "../productList/productList.styles";

/**
 * Component to render Product list
 * @return {JSX.Element}
 */
const ProductList: React.FC = () => {
  const queryClient = new QueryClient();
  const styles = useStyles();

  /**
   * Fetches the list of products
   */
  const fetchProducts = async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response?.data;
  };

  const { data, isLoading, error } = useQuery("productData", () =>
    fetchProducts(),
  );

  /**
   * Method to add products
   */
  const addProductMutation = useMutation((newProductData: INewProduct) =>
    axios.post("https://dummyjson.com/products/add", newProductData),
  );
  const [formData, setFormData] = useState<INewProduct>({
    title: "",
    description: "",
    price: "",
  });
  const [addedProducts, setAddedProducts] = useState<IProduct[]>([]);

  /**
   * Handles input change in the form fields.
   * @param e
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  /**
   * Handles form submission to add a new product
   * @param e
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await addProductMutation.mutateAsync(formData);
      setFormData({
        title: "",
        description: "",
        price: "",
      });
      const newProduct = {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        price: response.data.price,
        images: response.data.images,
      };
      setAddedProducts((prevProducts) => [...prevProducts, newProduct]);

      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  /**
   * Method to render new Products
   */
  const newProductsToRender = () => {
    return addedProducts.map((product) => (
      <div key={product.id} style={styles.card}>
        <div style={styles.productsWrapper}>
          <h2> Product name: {product.title}</h2>
          <div style={styles.contentWrapper}>
            Description: {product.description}
          </div>
          <div style={styles.contentWrapper}>Price: ${product.price}</div>
        </div>
      </div>
    ));
  };
  /**
   * Method to render product form
   */
  const productFormToRender = () => {
    const { title, description, price } = formData || {};
    return (
      <form onSubmit={handleSubmit}>
        <div style={styles.wrapper}>
          <label style={styles.space}>
            Product Name:
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.space}>
            Description:
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.space}>
            Price:
            <input
              type="number"
              name="price"
              value={price}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.addProduct}>
            Add Product
          </button>
        </div>
      </form>
    );
  };

  /**
   * Method to render Products
   */
  const productsToRender = () => {
    return data?.products?.map((product: IProduct) => (
      <div key={product.id} style={styles.card}>
        <div style={styles.productsWrapper}>
          <h2> Product name: {product.title}</h2>
          <div style={styles.contentWrapper}>
            Description: {product.description}
          </div>
          <div style={styles.contentWrapper}>Price: ${product.price}</div>
          {/* Image rendering */}
          <div style={styles.addNewProduct}>
            {product.images.map((image: string) => (
              <img
                key={`images-${image}`}
                src={image}
                alt={`Product Image ${image}`}
                style={styles.image}
              />
            ))}
          </div>
        </div>
      </div>
    ));
  };
  if (isLoading) {
    return <h1>Loading ....</h1>;
  }

  if (error) {
    toast.error("Something went wrong!");
  }

  return (
    <>
      <h2>Product List</h2>
      {productFormToRender()}
      {newProductsToRender()}
      <ToastContainer limit={1} />
      {productsToRender()}
    </>
  );
};

const queryClient = new QueryClient();

/**
 * Product list wrapper
 * @return {JSX.Element}
 */
const ProductListWithQueryClient: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ProductList />
  </QueryClientProvider>
);

/**
 * Interface for a new product.
 */
interface INewProduct {
  title: string;
  description: string;
  price: string;
}
/**
 * Interface for an existing product.
 */
interface IProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string[];
}
export default ProductListWithQueryClient;
