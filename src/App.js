// App.js
import React, { useState } from "react";
import { products } from "./Product.js";
import { OrderHistorySection } from "./OrderHistory.js";
import { CheckoutPage } from "./CheckoutPage.js";
import { WalletWidget } from "./WalletWidget.js";
import DailyLogin  from "./DailyLogin.js";
import AccountModal from "./AccountModal.js";
 
export default function SeoulifyStore() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navItems = ["Home", "Merch", "Album", "Artist"];
  const categories = ["All", "Merch", "Album", "Artist"];
  const [showArtistDropdown, setShowArtistDropdown] = useState(false);
  const artistList = ["NCT Dream", "ILLIT", "NCT 127", "BABYMONSTER", "NEWJEANS", "TXT","MARK","HAECHAN","KATEYES","NCT JNJM"];
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const [currentView, setCurrentView] = useState("shop");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [orderHistory] = useState([
    { id: "ORD-9281", date: "24 May 2026", items: "6th Mini Album [Beat it Up] (x1)", total: "RM 51.83", status: "Delivered 🌟" },
    { id: "ORD-8432", date: "12 Apr 2026", items: "Hoodie - ILLIT (x1)", total: "RM 317.50", status: "Delivered 🌟" }
  ]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter((item) => {
    if (selectedCategory === "Artist") {
      if (searchTerm) {
        return item.group.toLowerCase() === searchTerm.toLowerCase();
      }
      return true;
    }
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.group.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.container}>
      
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
              onClick={() => setIsAccountModalOpen(true)}
            >
              Account
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

      {currentView === "shop" ? (
        <>
          <section style={styles.hero}>
            <h2 style={styles.heroTitle}>CRUSH ON YOUR IDOL</h2>
            <p style={styles.heroSub}>THE ULTIMATE K-POP MERCHANDISE DESTINATION</p>
            <WalletWidget />
            <DailyLogin />
          </section>

          <main style={styles.main}>
            <h3 style={styles.sectionTitle}>{selectedCategory.toUpperCase()} ITEMS</h3>
            <div style={styles.grid}>
              {filteredProducts.length > 0 ? (
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

const styles = {
  container: { backgroundColor: "#FFF9F2", color: "#6C0820", minHeight: "100vh", fontFamily: "Radley", paddingBottom: "40px" },
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Ribeye", padding: "15px 30px", backgroundColor: "#6C0820", position: "sticky", top: 0, zIndex: 100 },
  navLeft: { display: "flex", gap: "20px" },
  navLink: { background: "none", border: "none", fontSize: "0.95rem", fontFamily: "Ribeye", cursor: "pointer", fontWeight: "bold" },
  dropdownContainer: { position: "relative", display: "inline-block" },
  dropdownMenu: { 
    position: "absolute", 
    top: "100%", 
    left: "0", 
    backgroundColor: "#F3E6D5", 
    borderRadius: "8px", 
    padding: "8px 0", 
    minWidth: "160px", 
    zIndex: 1000, 
    display: "flex", 
    border: "2px solid #800020",
    boxShadow: "0 8px 20px #80002080",
    flexDirection: "column" 
  },
  dropdownItem: { 
    padding: "10px 18px", 
    color: "#800020", 
    fontSize: "0.85rem", 
    cursor: "pointer", 
    fontFamily: "Ribeye", 
    fontWeight: "bold",
    transition: "all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  navCenter: { textAlign: "center", cursor: "pointer" },
  brandLogo: { fontSize: "1.5rem", fontFamily: "Ribeye", color: "#F2DCDB", letterSpacing: "4px", margin: 0 },
  navRight: { display: "flex", alignItems: "center", gap: "12px" },
  searchInput: { backgroundColor: "#F2AEBC", border: "2px solid #F2AEBC", borderRadius: "15px", color: "#6C0820", padding: "8px 12px", fontSize: "0.85rem", outline: "none" },
  accountBadge: { 
    border: "2px solid #F2AEBC", 
    padding: "8px 14px", 
    borderRadius: "15px", 
    backgroundColor: "#F2AEBC", 
    color: "#6C0820", 
    fontSize: "0.80rem", 
    cursor: "pointer", 
    fontFamily: "Ribeye",
    fontWeight: "bold" },
  cartBadge: { 
    border: "2px solid #F2AEBC", 
    padding: "8px 16px", 
    borderRadius: "15px", 
    backgroundColor: "#F2AEBC", 
    color: "#6C0820", 
    fontSize: "0.85rem", 
    cursor: "pointer", 
    fontWeight: "bold", 
    display: "flex", 
    alignItems: "center", 
    gap: "6px" 
  },
  cartContainer: { position: "relative", display: "inline-block" },
  cartDropdown: { position: "absolute", top: "120%", right: "0", backgroundColor: "#F3E6D5", border: "2px solid #800020", borderRadius: "8px", padding: "15px", width: "280px", zIndex: 1000, fontFamily: "Ribeye" },
  cartTitle: { color: "#800020", fontSize: "0.9rem", borderBottom: "1px dashed #ff758c", paddingBottom: "8px", marginBottom: "10px", textAlign: "center" },
  emptyCart: { color: "#800020", fontSize: "0.8rem", textAlign: "center", margin: "15px 0" },
  cartItemList: { maxHeight: "150px", overflowY: "auto", marginBottom: "10px", display: "flex", flexDirection: "column", gap: "8px" },
  cartItem: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "#800020", borderBottom: "1px solid #2a2a2a", paddingBottom: "5px" },
  cartItemName: { maxWidth: "160px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  cartItemPrice: { color: "#800020", fontWeight: "bold" },
  cartFooter: { borderTop: "1px dashed #ff758c", paddingTop: "10px", textAlign: "center" },
  checkoutButton: { backgroundColor: "#800020", color: "#F3E6D5", border: "none", padding: "8px 12px", borderRadius: "15px", fontWeight: "bold", fontFamily: "Ribeye", fontSize: "0.75rem", cursor: "pointer", width: "100%" },
  hero: { textAlign: "center", padding: "40px 20px", backgroundImage: "linear-gradient(rgba(255,117,140,0.1), transparent)" },
  heroTitle: { fontSize: "2.5rem", color: "#6C0820", letterSpacing: "4px", margin: "0 0 10px 0", textShadow: "2px 2px 0px #F2AEBC" },
  heroSub: { color: "#8A5A65", fontSize: "0.9rem", letterSpacing: "2px" },
  main: { maxWidth: "1000px", margin: "0 auto", padding: "0 20px" },
  sectionTitle: { color: "#6C0820", borderBottom: "1px solid #E5D0D0", paddingBottom: "10px", marginBottom: "20px", letterSpacing: "2px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" },
  card: { backgroundColor: "#EAE2D6", overflow: "hidden", display: "flex", borderRadius: "15px", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 0 10px rgba(255, 117, 140, 0.15)" },
  cardImageContainer: { 
    height: "220px", 
    width: "100%", 
    position: "relative",
    objectFit: "cover", 
    overflow: "hidden", 
    backgroundColor: "#800020" },
  productImage: { width: "100%", height: "100%", objectFit: "cover" },
  tag: { position: "absolute", top: "10px", right: "10px", backgroundColor: "#F2AEBC", color: "#6C0820", fontSize: "0.7rem", fontFamily: "Ribeye", padding: "2px 8px", borderRadius: "10px", fontWeight: "bold" },
  cardBody: { padding: "15px" },
  groupTag: { fontSize: "0.75rem", color: "#800020", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "bold" },
  productName: { fontSize: "0.95rem", color: "#6C0820", margin: "8px 0 15px 0" },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  price: { color: "#6C0820", fontWeight: "bold", fontSize: "1rem" },
  buyButton: { backgroundColor: "#F3E6D5", color: "#6C0820", fontFamily: "Ribeye", border: "2px solid #800020", borderRadius: "20px", padding: "8px 16px", fontSize: "0.75rem", cursor: "pointer", fontWeight: "bold", letterSpacing: "1px", position: "relative", overflow: "hidden", zIndex: 1, transition: "color 0.3s ease", boxShadow: "0 3px 10px rgba(255, 117, 140, 0.4)" },
  buttonSlideBg: { position: "absolute", top: 0, left: 0, height: "100%", width: "0%", backgroundColor: "#800020", zIndex: 1, transition: "width 0.35s ease-in-out" },
  footer: { textAlign: "center", marginTop: "50px", color: "#8A5A65", fontSize: "0.85rem" },
};