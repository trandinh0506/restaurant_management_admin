import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVERHOST } from "../domain";
import "./manageProduct.css";

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formVisible, setFormVisible] = useState(false);
    const [newProductFormVisible, setNewProductFormVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
    });

    const navigate = useNavigate();
    // set the title
    useEffect(() => {
        document.title = "Manage Product";
    }, []);

    // validate authorization
    useEffect(() => {
        axios
            .get(`${SERVERHOST}/admin/validate-admin-token`, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status !== 200) {
                    navigate("/login");
                }
            })
            .catch((err) => {
                navigate("/login");
                return;
            });
    }, [navigate]);

    useEffect(() => {
        axios
            .get(SERVERHOST + "/product/get", { withCredentials: true })
            .then((response) => {
                console.log(response);
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setFormVisible(true);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(
                SERVERHOST + "/admin/update-product",
                selectedProduct,
                { withCredentials: true, headers: { id: selectedProduct._id } }
            );
            if (response.status === 200) {
                setProducts(
                    products.map((product) =>
                        product._id === selectedProduct._id
                            ? selectedProduct
                            : product
                    )
                );
                setFormVisible(false);
                setSelectedProduct(null);
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDeleteProduct = async () => {
        try {
            const response = await axios.delete(
                SERVERHOST + "/admin/remove-product",
                {
                    headers: {
                        id: selectedProduct._id,
                    },
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                setProducts(
                    products.filter(
                        (product) => product._id !== selectedProduct._id
                    )
                );
                setFormVisible(false);
                setSelectedProduct(null);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    const handleAddProductSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                SERVERHOST + "/admin/add-product",
                newProduct,
                { withCredentials: true }
            );
            if (response.status === 201) {
                setProducts([...products, response.data]);
                setNewProductFormVisible(false);
                setNewProduct({
                    name: "",
                    price: "",
                    description: "",
                    imageUrl: "",
                });
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="container">
            <button onClick={() => setNewProductFormVisible(true)}>
                Add Product
            </button>
            <button
                onClick={() => {
                    navigate("/dashboard");
                }}
            >
                Go To Dashboard
            </button>
            <div id="productsWrapper">
                {products.map((product) => (
                    <div
                        key={product._id}
                        id="product"
                        onClick={() => handleProductClick(product)}
                    >
                        Tên sản phẩm: {product.name}
                        <br />
                        Giá: {product.price}
                        <br />
                        Mô tả sản phẩm: {product.description}
                        <br />
                        Url hình ảnh mô tả: {product.imageUrl}
                        <br />
                    </div>
                ))}
            </div>
            {formVisible && selectedProduct && (
                <div id="editProductFormWrapper">
                    <form onSubmit={handleFormSubmit}>
                        <h2>Edit Product</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={selectedProduct.name}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                value={selectedProduct.price}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        price: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                value={selectedProduct.description}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            Image URL:
                            <input
                                type="text"
                                value={selectedProduct.imageUrl}
                                onChange={(e) =>
                                    setSelectedProduct({
                                        ...selectedProduct,
                                        imageUrl: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={handleDeleteProduct}>
                            Delete Product
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setFormVisible(false);
                                setSelectedProduct(null);
                            }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
            {newProductFormVisible && (
                <div id="editProductFormWrapper">
                    <form onSubmit={handleAddProductSubmit}>
                        <h2>Add New Product</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={newProduct.name}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                value={newProduct.price}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        price: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                value={newProduct.description}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label>
                            Image URL:
                            <input
                                type="text"
                                value={newProduct.imageUrl}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        imageUrl: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <button type="submit">Add Product</button>
                        <button
                            type="button"
                            onClick={() => {
                                setNewProductFormVisible(false);
                                setNewProduct({
                                    name: "",
                                    price: "",
                                    description: "",
                                    imageUrl: "",
                                });
                            }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManageProduct;
