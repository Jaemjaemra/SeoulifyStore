// CheckoutPage.js
import React from "react";
import { PaymentMethodSection } from "./PaymentMethod.js";

export function CheckoutPage({ 
  cart, 
  totalPrice, 
  paymentMethod, 
  setPaymentMethod, 
  onReturnToShop, 
  onOrderSuccess 
}) {
  return (
    <div style={styles.shopifyCheckoutWrapper}>
      
      <div style={styles.checkoutHeaderNav}>
        <h2 style={{ color: "#6C0820", letterSpacing: "2px", margin: 0 }}>SEOULIFY</h2>
        <button style={styles.backButton} onClick={onReturnToShop}>
          ← Return to shop
        </button>
      </div>

      <div style={styles.shopifyLayout}>
        
        {/* KIRI: Borang Maklumat Penghantaran & Pembayaran */}
        <div style={styles.checkoutLeftCol}>
          <div style={styles.checkoutSectionBlock}>
            <h3 style={styles.checkoutBlockTitle}>Contact</h3>
            <input type="text" placeholder="Email or mobile phone number" style={styles.inputFieldFull} />
            <label style={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked /> Email me with news and offers
            </label>
          </div>

          <div style={styles.checkoutSectionBlock}>
            <h3 style={styles.checkoutBlockTitle}>Delivery / Shipping Address</h3>
            <select style={styles.inputFieldFull}>
              <option>Malaysia</option>
              <option>United States</option>
              <option>South Korea</option>
              <option>Singapore</option>
            </select>
            <div style={styles.rowInputs}>
              <input type="text" placeholder="First name" style={styles.inputFieldHalf} />
              <input type="text" placeholder="Last name" style={styles.inputFieldHalf} />
            </div>
            <input type="text" placeholder="Address" style={styles.inputFieldFull} />
            <input type="text" placeholder="Apartment, suite, etc. (optional)" style={styles.inputFieldFull} />
            <div style={styles.rowInputsThree}>
              <input type="text" placeholder="City" style={styles.inputFieldThird} />
              <input type="text" placeholder="State" style={styles.inputFieldThird} />
              <input type="text" placeholder="ZIP code" style={styles.inputFieldThird} />
            </div>
          </div>

          <PaymentMethodSection 
            paymentMethod={paymentMethod} 
            setPaymentMethod={setPaymentMethod} 
            totalPrice={totalPrice} 
          />

          {/* Butang Pay Now dengan Kesan Animasi Meluncur */}
          <button 
            style={styles.shopifyPayNowBtn}
            onClick={onOrderSuccess}
            onMouseEnter={(e) => {
              const bgSlide = e.currentTarget.querySelector(".slide-bg");
              if (bgSlide) bgSlide.style.width = "100%";
              e.currentTarget.style.color = "#F3E6D5";
            }}
            onMouseLeave={(e) => {
              const bgSlide = e.currentTarget.querySelector(".slide-bg");
              if (bgSlide) bgSlide.style.width = "0%";
              e.currentTarget.style.color = "#800020";
            }}
          >
            <span className="slide-bg" style={styles.buttonSlideBg}></span>
            <span style={{ position: "relative", zIndex: 2 }}>Pay now 🛍️</span>
          </button>
        </div>

        {/* KANAN: Ringkasan Troli (Order Summary) */}
        <div style={styles.checkoutRightCol}>
          <h3 style={styles.checkoutBlockTitle}>Order Summary</h3>
          <div style={styles.summaryItemList}>
            {cart.length === 0 ? (
              <p style={{ fontSize: "0.85rem", color: "#8A5A65" }}>No items in cart.</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} style={styles.summaryItemRow}>
                  <img src={item.image} alt={item.name} style={styles.summaryThumb} />
                  <div style={{ flex: 1, marginLeft: "10px" }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#6C0820" }}>{item.name}</div>
                    <div style={{ fontSize: "0.7rem", color: "#8A5A65" }}>{item.group}</div>
                  </div>
                  <span style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#6C0820" }}>RM {item.price}</span>
                </div>
              ))
            )}
          </div>

          <div style={styles.discountRow}>
            <input type="text" placeholder="Discount code or gift card" style={styles.discountInput} />
            <button style={styles.applyBtn}>Apply</button>
          </div>

          <div style={styles.summaryCalcRows}>
            <div style={styles.calcRow}>
              <span>Subtotal</span>
              <span>RM {totalPrice}</span>
            </div>
            <div style={styles.calcRow}>
              <span>Shipping</span>
              <span style={{ fontSize: "0.75rem", color: "#8A5A65" }}>Calculated at next step</span>
            </div>
            <div style={styles.calcTotalRow}>
              <span>Total</span>
              <span style={{ fontSize: "1.1rem", color: "#6C0820" }}>RM {totalPrice}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Gaya Tampilan CSS khusus untuk Checkout (Termasuk Gaya Butang Animasi)
const styles = {
  shopifyCheckoutWrapper: { maxWidth: "1100px", margin: "0 auto", padding: "20px" },
  checkoutHeaderNav: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E5D0D0", paddingBottom: "15px", marginBottom: "30px" },
  shopifyLayout: { display: "flex", gap: "40px", flexWrap: "wrap" },
  checkoutLeftCol: { flex: "1.2", minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" },
  checkoutRightCol: { flex: "1", minWidth: "280px", backgroundColor: "#EAE2D6", padding: "25px", borderRadius: "15px", height: "fit-content" },
  checkoutSectionBlock: { display: "flex", flexDirection: "column", gap: "10px" },
  checkoutBlockTitle: { fontSize: "1rem", color: "#6C0820", marginBottom: "5px" },
  inputFieldFull: { padding: "10px 14px", borderRadius: "8px", border: "1px solid #F2AEBC", backgroundColor: "#FFF", color: "#6C0820", fontSize: "0.85rem", outline: "none" },
  inputFieldHalf: { flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #F2AEBC", backgroundColor: "#FFF", color: "#6C0820", fontSize: "0.85rem", outline: "none" },
  inputFieldThird: { flex: 1, padding: "10px 10px", borderRadius: "8px", border: "1px solid #F2AEBC", backgroundColor: "#FFF", color: "#6C0820", fontSize: "0.85rem", outline: "none" },
  rowInputs: { display: "flex", gap: "10px" },
  rowInputsThree: { display: "flex", gap: "10px" },
  checkboxLabel: { fontSize: "0.8rem", color: "#8A5A65", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" },
  
  /* Gaya Butang Pay Now dengan Animasi Meluncur */
  shopifyPayNowBtn: { 
    backgroundColor: "#F3E6D5", 
    color: "#800020", 
    fontFamily: "Ribeye", 
    border: "2px solid #800020", 
    borderRadius: "15px", 
    padding: "12px 6px", 
    fontSize: "1rem", 
    cursor: "pointer", 
    fontWeight: "bold", 
    letterSpacing: "1px", 
    width: "100%", 
    marginTop: "10px",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
    transition: "color 0.3s ease",
    boxShadow: "0 3px 10px rgba(255, 117, 140, 0.4)",
  },
  buttonSlideBg: { 
    position: "absolute", 
    top: 0, 
    left: 0, 
    height: "100%", 
    width: "0%", 
    backgroundColor: "#800020", 
    zIndex: 1, 
    transition: "width 0.35s ease-in-out" 
  },

  backButton: { backgroundColor: "transparent", border: "none", color: "#6C0820", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem" },
  summaryItemList: { display: "flex", flexDirection: "column", gap: "12px", maxHeight: "250px", overflowY: "auto", marginBottom: "15px" },
  summaryItemRow: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  summaryThumb: { width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px", border: "1px solid #F2AEBC" },
  discountRow: { display: "flex", gap: "10px", marginBottom: "15px" },
  discountInput: { flex: 1, padding: "8px 12px", borderRadius: "8px", border: "1px solid #F2AEBC", backgroundColor: "#FFF", fontSize: "0.8rem", outline: "none" },
  applyBtn: { backgroundColor: "#800020", color: "#F3E6D5", border: "none", padding: "8px 15px", borderRadius: "8px", fontWeight: "bold", fontSize: "0.8rem", cursor: "pointer" },
  summaryCalcRows: { borderTop: "1px dashed #F2AEBC", paddingTop: "15px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem", color: "#6C0820" },
  calcRow: { display: "flex", justifyContent: "space-between" },
  calcTotalRow: { display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "1rem", borderTop: "1px solid #F2AEBC", paddingTop: "10px", marginTop: "5px" },
};