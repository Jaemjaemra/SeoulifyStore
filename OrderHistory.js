// OrderHistory.js
import React, { useState } from "react";

export function OrderHistorySection({ orderHistory, onReturnToShop }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Sila masukkan e-mel anda! ✨");
      return;
    }
    setIsLoggedIn(true);
  };

  return (
    <div style={styles.accountPageWrapper}>
      <div style={styles.checkoutHeaderNav}>
        <h2 style={{ color: "#6C0820", letterSpacing: "2px", margin: 0 }}>SEOULIFY :: ACCOUNT</h2>
        <button style={styles.backButton} onClick={onReturnToShop}>
          ← Return to shop
        </button>
      </div>

      {!isLoggedIn ? (
        <div style={styles.authContainer}>
          <div style={styles.accountCard}>
            <h3 style={styles.checkoutBlockTitle}>✨ Welcome to Seoulify Starlight!</h3>
            <p style={{ fontSize: "0.85rem", color: "#8A5A65", marginBottom: "20px" }}>
              Log in or create an account to view your order history and track your K-Pop merch.
            </p>
            
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input 
                type="email" 
                placeholder="Enter your email (e.g. stan@kpop.my)" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.inputFieldFull} 
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.inputFieldFull} 
                required
              />
              <button type="submit" style={styles.authSubmitBtn}>
                Continue / Sign In 🌸
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div style={styles.accountLayout}>
          <div style={styles.accountCard}>
            <h3 style={styles.checkoutBlockTitle}>👤 Profile Information</h3>
            <div style={styles.profileDetails}>
              <p><b>Email:</b> {email}</p>
              <p><b>Member Level:</b> VIP Y2K Starlight ✨</p>
            </div>
          </div>

          <div style={styles.accountCard}>
            <h3 style={styles.checkoutBlockTitle}>📦 Past Orders</h3>
            {orderHistory.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "#8A5A65" }}>No past orders found.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {orderHistory.map((order, idx) => (
                  <div key={idx} style={styles.orderHistoryRow}>
                    <div>
                      <div style={{ fontWeight: "bold", color: "#6C0820" }}>{order.id} ({order.date})</div>
                      <div style={{ fontSize: "0.8rem", color: "#8A5A65" }}>{order.items}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: "bold", color: "#6C0820" }}>{order.total}</div>
                      <div style={{ fontSize: "0.75rem", color: "#2E7D32" }}>{order.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            style={styles.logoutBtn}
            onClick={() => setIsLoggedIn(false)}
          >
            Log Out 🔒
          </button>
        </div>
      )}
    </div>
  );
}

// Gaya CSS untuk Akaun
const styles = {
  accountPageWrapper: { maxWidth: "700px", margin: "0 auto", padding: "20px" },
  checkoutHeaderNav: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E5D0D0", paddingBottom: "15px", marginBottom: "30px" },
  backButton: { backgroundColor: "transparent", border: "none", color: "#6C0820", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem" },
  authContainer: { display: "flex", justifyContent: "center" },
  accountLayout: { display: "flex", flexDirection: "column", gap: "20px" },
  accountCard: { backgroundColor: "#EAE2D6", padding: "25px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(255, 117, 140, 0.15)", width: "100%" },
  checkoutBlockTitle: { fontSize: "1rem", color: "#6C0820", marginBottom: "10px" },
  profileDetails: { fontSize: "0.9rem", color: "#6C0820", display: "flex", flexDirection: "column", gap: "8px" },
  orderHistoryRow: { display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFF9F2", padding: "12px", borderRadius: "10px", border: "1px dashed #800020" },
  inputFieldFull: { padding: "10px 14px", borderRadius: "8px", border: "1px solid #F2AEBC", backgroundColor: "#FFF", color: "#6C0820", fontSize: "0.85rem", outline: "none" },
  authSubmitBtn: { backgroundColor: "#800020", color: "#F3E6D5", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "0.9rem", letterSpacing: "1px" },
  logoutBtn: { backgroundColor: "#800020", color: "#F3E6D5", border: "none", padding: "12px", borderRadius: "15px", fontWeight: "bold", cursor: "pointer", textAlign: "center", fontSize: "0.9rem" }
};