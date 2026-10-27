import React, { useEffect,useState } from "react";

export default function AdminProduct({ onBack, onProductAdded }) {
  
    const [form, setForm] = useState({
    name: "",
    category: "Album",
    artist: "",
    price: "",
    imageUrl: "",
    stock: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

const loadProducts = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/products");

    if (!response.ok) {
      throw new Error("Failed to load products");
    }

    const data = await response.json();
    setProducts(data);
  } catch (error) {
    console.error("Failed to load products:", error);
  } finally {
    setLoadingProducts(false);
  }
};

useEffect(() => {
  loadProducts();
}, []);

  const handleChange = (e) => {
    setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};
const handleEdit = (product) => {
  setEditingId(product.id);

  setForm({
    name: product.name || "",
    category: product.category || "Album",
    artist: product.artist || "",
    price: product.price ?? "",
    imageUrl: product.imageUrl || "",
    stock: product.stock ?? "",
  });

  setMessage("");
};

const handleCancelEdit = () => {
 setEditingId(null);

  setForm({
    name: "",
    category: "Album",
    artist: "",
    price: "",
    imageUrl: "",
    stock: "",
  });

  setMessage("");
};

const handleDelete = async (products) => {
    const confirmed = window.confirm(
    `Are you sure you want to delete "${product.name}"?`
  );

  if (!confirmed) return;

  try {
    const response = await fetch(
      `http://localhost:8080/api/products/${product.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    if (editingId === product.id) {
      setEditingId(null);
      setForm({
        name: "",
        category: "Album",
        artist: "",
        price: "",
        imageUrl: "",
        stock: "",
      });
    }

    setMessage("Product deleted successfully!");

    await loadProducts();

    if (onProductAdded) {
      await onProductAdded();
    }
  } catch (error) {
    console.error(error);
    setMessage("Failed to delete product. Please try again.");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
    const response = await fetch(
      editingId !== null
        ? `http://localhost:8080/api/products/${editingId}`
        : "http://localhost:8080/api/products",
      {
        method: editingId !== null ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save product");
    }

    setMessage(
      editingId !== null
        ? "Product updated successfully!"
        : "Product added successfully!"
    );

    setForm({
      name: "",
      category: "Album",
      artist: "",
      price: "",
      imageUrl: "",
      stock: "",
    });

    setEditingId(null);

    await loadProducts();

    if (onProductAdded) {
      await onProductAdded();
    }
  } catch (error) {
    console.error(error);
    setMessage("Failed to save product. Please check the backend.");
  } finally {
    setSaving(false);
  }
};

  return (
    <main
      style={{
        minHeight: "70vh",
        padding: "40px 20px",
        backgroundColor: "#F3E6D5",
        color: "#6C0820",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <button onClick={onBack}>Back to Shop</button>

        <h2 style={{ textAlign: "center" }}>ADMIN PRODUCT</h2>
        <h3 style={{marginBottom: "20px"}}>
            {editingId !== null ? "Edit Product": "Add New Product"}
        </h3>

        
<h3>Manage Products</h3>

{loadingProducts ? (
  <p>Loading products...</p>
) : products.length === 0 ? (
  <p>No products found.</p>
) : (
    <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "20px",
  }}
>
    {products.map((product) => (
      <div 
        key={product.id}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
    padding: "16px",
    backgroundColor: "#fffaf5",
    border: "1px solid #800020",
    borderRadius: "8px",
    minWidth: 0,
    boxSizing: "border-box",
  }}
>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />

        <div style={{ flex: 1 }}>
          <strong>{product.name}</strong>
          <p style={{ margin: "4px 0" }}>
            {product.artist} · {product.category}
          </p>
          <p style={{ margin: "4px 0" }}>
            RM {product.price} · Stock: {product.stock}
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleEdit(product)}
        >
          Edit
        </button>
        <button
  type="button"
  onClick={() => handleDelete(product)}
  style={{
    backgroundColor: "#800020",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Delete
</button>
      </div>
    ))}
  </div>
)}


        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            maxLength={200}
            style={inputStyle}
          />

          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="Album">Album</option>
            <option value="Merch">Merch</option>
          </select>

          <label>Artist</label>
          <input
            name="artist"
            value={form.artist}
            onChange={handleChange}
            maxLength={100}
            style={inputStyle}
          />

          <label>Price (RM)</label>
          <input
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label>Image URL</label>
          <input
            name="imageUrl"
            type="url"
            value={form.imageUrl}
            onChange={handleChange}
            maxLength={500}
            style={inputStyle}
          />

          <label>Stock</label>
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button 
            type="submit" 
            disabled={saving}
            style={{
                backgroundColor: "#790D16",
                color: "#FFFFFF",
                border: "none",
                padding: "12px 20px", 
                borderRadius: "8px",
                fontWeight: "600",
                cursor: saving? "not-allowed": "pointer",
                opacity: saving? 0.7 : 1,
            }}
            >
            {saving 
            ? "Saving..." 
            : editingId !== null
            ? "Save Changes"
            : "Add Product"}
          </button>
          
{editingId !== null && (
  <button
    type="button"
    onClick={handleCancelEdit}
    style={{
      backgroundColor: "#E8D8C8",
      color: "#6C0820",
      border: "1px solid #800020",
      padding: "12px 20px",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      marginLeft: "10px",
    }}
  >
    Cancel Edit
  </button>
)}

          {message && <p role="status">{message}</p>}
        </form>
      </div>
    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "10px",
  marginTop: "6px",
  marginBottom: "16px",
  border: "1px solid #800020",
  borderRadius: "6px",
};
