// PaymentMethod.js
import React from "react";

export function PaymentMethodSection({ paymentMethod, setPaymentMethod, totalPrice }) {
  return (
    <div style={styles.checkoutSectionBlock}>
      <h3 style={styles.checkoutBlockTitle}>Payment Method</h3>
      <p style={{ fontSize: "0.75rem", color: "#8A5A65", marginBottom: "10px" }}>All transactions are secure and encrypted.</p>
      
      <div style={styles.paymentOptionsContainer}>

        {/* Pilihan 1: Credit Card */}
        <div 
          style={{
            ...styles.paymentOptionCard, 
            borderColor: paymentMethod === "card" ? "#800020" : "#F2AEBC"
          }}
          onClick={() => setPaymentMethod("card")}
        >
          <label style={styles.paymentLabel}>
            <input 
              type="radio" 
              name="payment" 
              checked={paymentMethod === "card"} 
              onChange={() => setPaymentMethod("card")} 
            />
            <span>Credit / Debit Card 💳</span>
          </label>
        </div>
        
        {paymentMethod === "card" && (
          <div style={styles.paymentCardBox}>
            <input type="text" placeholder="Card number" style={styles.inputFieldFull} />
            <div style={styles.rowInputs}>
              <input type="text" placeholder="MM / YY" style={styles.inputFieldHalf} />
              <input type="text" placeholder="Security code (CVV)" style={styles.inputFieldHalf} />
            </div>
            <input type="text" placeholder="Name on card" style={styles.inputFieldFull} />
          </div>
        )}

        {/* Pilihan 2: Online Banking (FPX) */}
        <div 
          style={{
            ...styles.paymentOptionCard, 
            borderColor: paymentMethod === "fpx" ? "#800020" : "#F2AEBC"
          }}
          onClick={() => setPaymentMethod("fpx")}
        >
          <label style={styles.paymentLabel}>
            <input 
              type="radio" 
              name="payment" 
              checked={paymentMethod === "fpx"} 
              onChange={() => setPaymentMethod("fpx")} 
            />
            <span>Online Banking (FPX) 🏦</span>
          </label>
        </div>

        {paymentMethod === "fpx" && (
          <div style={styles.paymentCardBox}>
            <select style={styles.inputFieldFull}>
              <option>Select your bank...</option>
              <option>Maybank2u</option>
              <option>CIMB Clicks</option>
              <option>Public Bank</option>
              <option>RHB Now</option>
              <option>Bank Islam</option>
              <option>GXBank</option>
            </select>
          </div>
        )}

        {/* Pilihan 3: Atome (Buy Now, Pay Later) */}
        <div 
          style={{
            ...styles.paymentOptionCard, 
            borderColor: paymentMethod === "atome" ? "#800020" : "#F2AEBC"
          }}
          onClick={() => setPaymentMethod("atome")}
        >
          <label style={styles.paymentLabel}>
            <input 
              type="radio" 
              name="payment" 
              checked={paymentMethod === "atome"} 
              onChange={() => setPaymentMethod("atome")} 
            />
            <span>Atome (3 Easy Payments, 0% Interest) 🌸</span>
          </label>
        </div>

        {paymentMethod === "atome" && (
          <div style={{ ...styles.paymentCardBox, backgroundColor: "#FFF0F3" }}>
            <p style={{ fontSize: "0.8rem", color: "#6C0820", margin: 0, lineHeight: "1.4" }}>
              Pay <b>RM {(totalPrice / 3).toFixed(2)}</b> today (1st payment). The next 2 payments will be billed automatically every 30 days. No hidden fees! ✨
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

// Gaya CSS khusus untuk bahagian Payment
const styles = {
  checkoutSectionBlock: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "10px" 
},
  checkoutBlockTitle: { 
    fontSize: "1rem", 
    color: "#6C0820", 
    marginBottom: "5px" 
},
  paymentOptionsContainer: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "10px" 
},
  paymentOptionCard: { 
    border: "2px solid #F2AEBC", 
    padding: "12px 15px", 
    borderRadius: "8px", 
    backgroundColor: "#FFF", 
    cursor: "pointer", 
    transition: "all 0.2s ease" },
  paymentLabel: { 
    display: "flex", 
    alignItems: "center", 
    gap: "10px", 
    fontWeight: "bold", 
    color: "#6C0820", 
    fontSize: "0.85rem", 
    cursor: "pointer" 
    },
  paymentCardBox: { 
    border: "1px solid #F2AEBC", 
    padding: "15px", 
    borderRadius: "8px", 
    backgroundColor: "#FFF", 
    display: "flex", 
    flexDirection: "column", 
    gap: "10px" 
    },
  inputFieldFull: { 
    padding: "10px 14px", 
    borderRadius: "8px", 
    border: "1px solid #F2AEBC", 
    backgroundColor: "#FFF", 
    color: "#6C0820", 
    fontSize: "0.85rem", 
    outline: "none" 
    },
  inputFieldHalf: { 
    flex: 1, 
    padding: "10px 14px", 
    borderRadius: "8px", 
    border: "1px solid #F2AEBC", 
    backgroundColor: "#FFF", 
    color: "#6C0820", 
    fontSize: "0.85rem", 
    outline: "none" 
    },
  rowInputs: { 
    display: "flex", 
    gap: "10px"
 },
};