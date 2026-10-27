import {styles} from "./AppStyles.js";
import React, { useEffect, useState } from "react";
import { products as defaultProducts } from "./Product.js";
import { OrderHistorySection } from "./OrderHistory.js";
import { CheckoutPage } from "./CheckoutPage.js";
import AdminProduct from "./AdminProduct.js";
import { WalletWidget } from "./WalletWidget.js";
import DailyLogin  from "./DailyLogin.js";
import AccountModal from "./AccountModal.js";
 
export default function SeoulifyStore() {
  const [cart, setCart] = useState([]);

  const [productList, setProductList] = useState(defaultProducts);
  const [productsLoading, setProductsLoading] = useState(true);
  const [ productsError, setProductsError] = useState("");

  useEffect(() => {
    const handleUserLoggedIn = () => {
      setIsLoggedIn(true); 
      setIsAccountModalOpen(false);
      setShowUserDashboard(true);
    };

    window.addEventListener("userLoggedIn", handleUserLoggedIn); 

    return () => {
      window.removeEventListener("userLoggedIn", handleUserLoggedIn); 
    };
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");

        if (!response.ok) {
          throw new Error ("Failed to load products"); 
        }

        const data = await response.json();

        const formattedProducts = data.map((item) => ({
          ...item, 
          image: item.imageUrl, 
          type: item.category, 
          group: item.category,
          price: Number(item.price),
        }));

       setProductList(formattedProducts);
      setProductsError("");
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProductsError("Unable to load products from the database.");
    } finally {
      setProductsLoading(false);
    }
  };

  fetchProducts();
}, []);

  const [apiMessage, setApiMessage] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navItems = ["Home", "Merch", "Album", "Artist"];
  const categories = ["All", "Merch", "Album", "Artist"];
  const [showArtistDropdown, setShowArtistDropdown] = useState(false);
  const artistList = [
    ...new Set(
      productList
        .map((product) => product.artist?.trim())
        .filter(Boolean)
    ),
  ].sort((a, b) => a.localeCompare(b));
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const [currentView, setCurrentView] = useState("shop");

  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("seoulify_user"))
  ); 
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [orderHistory] = useState([
    { id: "ORD-9281", date: "24 May 2026", items: "6th Mini Album [Beat it Up] (x1)", total: "RM 51.83", status: "Delivered 🌟" },
    { id: "ORD-8432", date: "12 Apr 2026", items: "Hoodie - ILLIT (x1)", total: "RM 317.50", status: "Delivered 🌟" }
  ]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price, 0
  ).toFixed(2);

  const handleSignOut = () => {
  localStorage.removeItem("seoulify_user");
  localStorage.removeItem("seoulify_userId");
  localStorage.removeItem("seoulify_points");

  setIsLoggedIn(false);
  setShowUserDashboard(false);
  setIsAccountModalOpen(false);

  alert("You have signed out successfully!");
};
  
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const testBackend = async () => {
    setApiLoading(true); 
    setApiMessage("");

    try { 
      const response = await fetch("http://localhost:8080/api/hello");

      if (!response.ok) {
        throw new Error (`HTTP error: ${response.status}`);
      }

      const message = await response.text();
      setApiMessage(message);
    } catch (error) {
       setApiMessage(
      "Connection failed. Check that the backend is running and CORS is configured."
    );
     console.error("Backend connection error:",error);
    } finally {
      setApiLoading(false);
    }
  };

  const filteredProducts = productList.filter((item) => {
  if (selectedCategory === "Artist") {
    if (searchTerm) {
      return (item.artist || "").trim().toLowerCase() === searchTerm.trim().toLowerCase();
    }
    return true;
  }

      const matchesSearch =
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.artist || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.group || "").toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" || item.type === selectedCategory;

  return matchesSearch && matchesCategory;
});

  return (
    <div style={styles.container}>
      {showUserDashboard && isLoggedIn && (
       <div
         style={{
         maxWidth: "600px",
         margin: "60px auto",
         padding: "30px",
         backgroundColor: "#FFF9F0",
         color: "#6C0820",
         borderRadius: "16px",
         textAlign: "center",
         boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
       }}
       >
        <h2>SEOULIFY ACCOUNT</h2>
        <p>Welcome back!</p>
        <p>
          <strong>Email:</strong>{" "}
          {localStorage.getItem("seoulify_user")}
          </p>
            
          <button
           style={styles.accountBadge}
           onClick={handleSignOut}
           >
            Sign Out
          </button>
          
          <button
          style={{ ...styles.accountBadge, marginLeft: "10px" }}
          onClick={() => setShowUserDashboard(false)}
          >
            Back to Shop
        </button>
      </div>
      )}

      {currentView === "shop" && (
        <nav style={styles.navbar}>
          <div style={styles.navLeft}>
            {navItems.map((item, index) => {
              if (item === "Artist") {
                return (
                  <div 
                    key={item}
                    style={styles.dropdownContainer}
                    onMouseEnter={() => setShowArtistDropdown(true)}
                    onMouseLeave={() => setShowArtistDropdown(false)}
                  >
                    <button 
                      onClick={() => {
                        setSelectedCategory("Artist");
                        setSearchTerm("");
                        setShowArtistDropdown(false);
                      }}
                      style={{
                        ...styles.navLink,
                        transform: hoveredIndex === index ? "translateY(-4px) scale(1.1)" : "translateY(0) scale(1)",
                        color: hoveredIndex === index || showArtistDropdown ? "#ff758c" : "#F3E6D5",
                      }}
                    >
                      {item}
                    </button>

                    {showArtistDropdown && (
                      <div style={styles.dropdownMenu}>
                        {artistList.map((artist) => (
                          <div 
                            key={artist}
                            style={styles.dropdownItem}
                            onClick={() => {
                              setSelectedCategory("Artist");
                              setSearchTerm(artist);
                              setShowArtistDropdown(false);
                            }}
                        
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#F2AEBC";
                              e.currentTarget.style.color = "#6C0820";  
                              e.currentTarget.style.transform = "scale(1.08) translateX(6px)";
                              e.currentTarget.style.letterSpacing= "2px";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.color = "#800020";  
                              e.currentTarget.style.transform = "scale(1) translateX(0)";
                              e.currentTarget.style.letterSpacing= "normal";
                            }}
                          >
                            {artist}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              

              return (
                <button 
                  key={item}
                  onClick={() => setSelectedCategory(categories[index])}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    ...styles.navLink,
                    transform: hoveredIndex === index ? "translateY(-4px) scale(1.1)" : "translateY(0) scale(1)",
                    color: hoveredIndex === index ? "#ff758c" : "#F3E6D5",
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div style={styles.navCenter}>
            <h1 style={styles.brandLogo} onClick={() => setCurrentView("shop")} role="button" tabIndex={0}>SEOULIFY</h1>
          </div>

          <div style={styles.navRight}>
            <input
              type="text"
              placeholder="Search merch/album..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />

            <button 
              style={styles.accountBadge}
              onClick={() => {
                if (isLoggedIn) {
                  setShowUserDashboard(true);
                } else {
                   setIsAccountModalOpen(true);
                }
              }}
            >
              Account
            </button>
            
            <button 
              style={styles.accountBadge}
              onClick={() => {
                setCurrentView("admin");
                setShowAdminForm(false);
              }}
              >
                Admin Product
              </button>
            <AccountModal
              isOpen={isAccountModalOpen}
              onClose={() => setIsAccountModalOpen(false)}
            />  

            <div
              style={styles.cartContainer}
              onMouseEnter={() => setShowCartDropdown(true)}
              onMouseLeave={() => setShowCartDropdown(false)}
            >
              <div style={styles.cartBadge}>
                🛒 <span>({cart.length})</span>
              </div>

              {showCartDropdown && (
                <div style={styles.cartDropdown}>
                  <h4 style={styles.cartTitle}>Your bag is here!</h4>

                  {cart.length === 0 ? (
                    <p style={styles.emptyCart}>Your cart is empty ~ ✨</p>
                  ) : (
                    <>
                      <div style={styles.cartItemList}>
                        {cart.map((item, index) => (
                          <div key={index} style={styles.cartItem}>
                            <span style={styles.cartItemName}>{item.name}</span>
                            <span style={styles.cartItemPrice}>RM {item.price}</span>
                          </div>
                        ))}
                      </div>

                      <div style={styles.cartFooter}>
                        <button 
                          style={styles.checkoutButton}
                          onClick={() => {
                            setCurrentView("checkout");
                            setShowCartDropdown(false);
                          }}
                        >
                          CHECKOUT NOW 🛍️
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
      {currentView === "admin" ? (
  <AdminProduct
    onBack={() => setCurrentView("shop")}
    onProductAdded={async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");

        if (!response.ok) {
          throw new Error("Failed to reload products");
        }

        const data = await response.json();

        const formattedProducts = data.map((item) => ({
          ...item,
          image: item.imageUrl,
          type: item.category,
          group: item.category,
          price: Number(item.price),
        }));

        setProductList(formattedProducts);
      } catch (error) {
        console.error("Failed to reload products:", error);
      }
    }}
  />
) : currentView === "shop" ? (
        <>
          <section style={styles.hero}>
            <h2 style={styles.heroTitle}>CRUSH ON YOUR IDOL</h2>
            <p style={styles.heroSub}>THE ULTIMATE K-POP MERCHANDISE DESTINATION</p>
            <WalletWidget />
            <DailyLogin />
          </section>

          <main style={styles.main}>
          <div style={{textAlign: "center", padding: "20px"}}>
            <button onClick={testBackend} disabled={apiLoading}>
              {apiLoading ? "Connecting..." : "Test Backend"}
            </button>

            {apiMessage && <p> {apiMessage}</p>}
          </div>
            <h3 style={styles.sectionTitle}>{selectedCategory.toUpperCase()} ITEMS</h3>
            <div style={styles.grid}>
              {productsLoading ? (
                <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                  Loading products...
                 </p>
            ) : filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <div key={item.id} style={styles.card}>
                    <div style={styles.cardImageContainer}>
                      <img src={item.image} alt={item.name} style={styles.productImage} />
                      <span style={styles.tag}>{item.type}</span>
                    </div>
                    <div style={styles.cardBody}>
                      <span style={styles.groupTag}>{item.group}</span>
                      <h4 style={styles.productName}>{item.name}</h4>
                      <div style={styles.cardFooter}>
                        <span style={styles.price}>RM {item.price}</span>
                        <button 
                          style={styles.buyButton} 
                          onClick={() => addToCart(item)}
                          onMouseEnter={(e) => {
                            const bgSlide = e.currentTarget.querySelector(".slide-bg");
                            if (bgSlide) bgSlide.style.width = "100%";
                            e.currentTarget.style.color = "#F3E6D5";
                          }}
                          onMouseLeave={(e) => {
                            const bgSlide = e.currentTarget.querySelector(".slide-bg");
                            if (bgSlide) bgSlide.style.width = "0%";
                            e.currentTarget.style.color = "#6C0820";
                          }}
                        >
                          <span className="slide-bg" style={styles.buttonSlideBg}></span>
                          <span style={{ position: "relative", zIndex: 2 }}>+ ADD TO CART</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#888", gridColumn: "1 / -1", textAlign: "center" }}>No items found...</p>
              )}
            </div>
          </main>
        </>
      ) : currentView === "checkout" ? (
        <CheckoutPage 
          cart={cart}
          totalPrice={totalPrice}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onReturnToShop={() => setCurrentView("shop")}
          onOrderSuccess={() => {
            alert("Order Placed Successfully! Thank you for shopping with Seoulify! ✨");
            setCart([]);
            setCurrentView("shop");
          }}
        />
      ) : (
        <OrderHistorySection 
          orderHistory={orderHistory} 
          onReturnToShop={() => setCurrentView("shop")} 
        />
      )}

      <footer style={styles.footer}>
        <p>©️ 2026 SEOULIFY. Designed for Y2K K-Pop Stans ✨</p>
      </footer>
    </div>
  );
}
