import React, { useState, useEffect } from "react";
import { getAccountStorageKey } from "./AccountStorage";

export function WalletWidget() {
  const [balance, setBalance] = useState(() => {
  return (
    parseFloat(
      localStorage.getItem(getAccountStorageKey("balance"))
    ) || 0
  );
});

  const [spoints, setSpoints] = useState(() => {
    return(
      parseInt(
        localStorage.getItem(getAccountStorageKey("spoint")),
        10
       ) || 0
      );
  });

  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");

  useEffect(() => {
    const handleUpdate = () => {
      const updatedBalance = 
        parseFloat(
          localStorage.getItem(getAccountStorageKey("balance")) 
        ) || 0;

      const updatedSpoints = 
      parseInt(
        localStorage.getItem(getAccountStorageKey("spoint")),
        10
       ) || 0;

      setBalance(updatedBalance);
      setSpoints(updatedSpoints);
    };

    window.addEventListener("spointUpdated", handleUpdate);
    window.addEventListener("balanceUpdated", handleUpdate);
    
    return () => {
      window.removeEventListener("spointUpdated", handleUpdate);
      window.removeEventListener("balanceUpdated", handleUpdate);
    };
  }, []);

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(topUpAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid top-up amount!");
      return;
    }

    const newBalance = balance + amount;
    setBalance(newBalance);
    localStorage.setItem(
      getAccountStorageKey("balance"),
      newBalance.toFixed(2)
    );
    
    window.dispatchEvent(new Event("balanceUpdated"));

    alert(`Successfully topped up RM ${amount.toFixed(2)} to your SeoulWallet! ✨`);
    setTopUpAmount("");
    setShowTopUpModal(false);
  };

  return (
    <>
      <div style={styles.walletBox}>
        {/* Bahagian Dompet / Balance */}
        <div style={styles.walletItem}>
          <img 
            src="https://i.pinimg.com/736x/93/bf/61/93bf616207286ab29bdac831e04d5101.jpg" 
            alt="Wallet Icon" 
            style={styles.walletImage} 
          />
          <div>
            <span style={styles.label}>BALANCE (RM)</span>
            <div style={styles.value}>{balance.toFixed(2)}</div>
          </div>
        </div>

        {/* Butang + untuk Top-up */}
        <button 
          style={styles.topUpPlusBtn} 
          onClick={() => setShowTopUpModal(true)}
          title="Top Up Wallet"
        >
          +
        </button>

        <div style={styles.divider}></div>

        {/* Bahagian SPoints */}
        <div style={styles.walletItem}>
          <img 
            src="https://i.pinimg.com/1200x/d7/13/48/d71348a03e20a77a2835a65e2e5b8025.jpg" 
            alt="SPoints Icon" 
            style={styles.walletImage} 
          />
          <div>
            <span style={styles.label}>SPOINTS</span>
            <div style={styles.value}>{spoints}</div>
          </div>
        </div>
      </div>

      {/* Modal Popup Top-Up */}
      {showTopUpModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Top Up SeoulWallet 💳</h3>
            <p style={styles.modalSub}>Enter an amount to top up the balance:</p>
            
            <div style={styles.quickPresetRow}>
               <button style={styles.presetBtn} onClick={() => setTopUpAmount("50")}>RM 10</button>
              <button style={styles.presetBtn} onClick={() => setTopUpAmount("50")}>RM 50</button>
              <button style={styles.presetBtn} onClick={() => setTopUpAmount("100")}>RM 100</button>
              <button style={styles.presetBtn} onClick={() => setTopUpAmount("200")}>RM 200</button>
            </div>

            <form onSubmit={handleTopUpSubmit}>
              <input 
                type="number"
                step="0.01"
                placeholder="Enter amount RM ..."
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                style={styles.modalInput}
                autoFocus
              />
              <div style={styles.modalBtnRow}>
                <button 
                  type="button" 
                  style={styles.cancelBtn} 
                  onClick={() => setShowTopUpModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.confirmBtn}>
                  Confirm Top Up ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  walletBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    border: "2px solid #F2AEBC",
    borderRadius: "35px",
    padding: "8px 20px",
    maxWidth: "430px",
    margin: "0 auto 15px auto",
    boxShadow: "0 4px 10px rgba(108, 8, 32, 0.08)",
    fontFamily: "Ribeye",
    justifyContent: "space-between",
  },
  walletItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  walletImage: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid #F2AEBC",
  },
  label: {
    fontSize: "0.65rem",
    color: "#8A5A65",
    display: "block",
    letterSpacing: "1px",
  },
  value: {
    fontSize: "0.95rem",
    color: "#6C0820",
    fontWeight: "bold",
  },
  topUpPlusBtn: {
    backgroundColor: "#6C0820",
    color: "#FFF9F2",
    border: "none",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 5px rgba(108, 8, 32, 0.2)",
    transition: "transform 0.2s",
  },
  divider: {
    width: "1px",
    height: "25px",
    backgroundColor: "#E5D0D0",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(108, 8, 32, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#FFF9F2",
    border: "2px solid #6C0820",
    borderRadius: "20px",
    padding: "25px",
    width: "90%",
    maxWidth: "350px",
    fontFamily: "Ribeye",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  modalTitle: {
    color: "#6C0820",
    fontSize: "1rem",
    marginBottom: "5px",
    textAlign: "center",
  },
  modalSub: {
    color: "#8A5A65",
    fontSize: "0.75rem",
    textAlign: "center",
    marginBottom: "15px",
  },
  quickPresetRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "12px",
    justifyContent: "center",
  },
  presetBtn: {
    backgroundColor: "#F3E6D5",
    border: "1px solid #6C0820",
    color: "#6C0820",
    padding: "6px 10px",
    borderRadius: "10px",
    fontSize: "0.75rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
  modalInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "12px",
    border: "2px solid #F2AEBC",
    backgroundColor: "#FFF",
    color: "#6C0820",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: "15px",
    textAlign: "center",
  },
  modalBtnRow: {
    display: "flex",
    gap: "10px",
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#E5D0D0",
    border: "none",
    padding: "10px",
    borderRadius: "15px",
    color: "#6C0820",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: "#6C0820",
    border: "none",
    padding: "10px",
    borderRadius: "15px",
    color: "#FFF9F2",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
};