import React, { useState } from "react";

export default function DailyLogin() {
  const rewards = [1, 1, 1, 3, 1, 1, 21];

  const [spoint, setSpoint] = useState(() => {
    return parseInt(localStorage.getItem("seoulify_spoint")) || 0;
  });

  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem("seoulify_streak")) || 0;
  });

  const [lastClaimDate, setLastClaimDate] = useState(() => {
    return localStorage.getItem("seoulify_last_claim") || "";
  });

  const [claimMessage, setClaimMessage] = useState("");

  const handleDailyCheckIn = () => {
    const today = new Date().toDateString();
    
    if (lastClaimDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let newStreak = streak;
    if (lastClaimDate === yesterday.toDateString()) {
      newStreak = (streak + 1) % 7; 
    } else {
      newStreak = 0;
    }

    const earnedPoints = rewards[newStreak];
    const updatedSpoint = spoint + earnedPoints;

    setSpoint(updatedSpoint);
    setStreak(newStreak);
    setLastClaimDate(today);

    // Simpan dalam localStorage
    localStorage.setItem("seoulify_spoint", updatedSpoint);
    localStorage.setItem("seoulify_streak", newStreak);
    localStorage.setItem("seoulify_last_claim", today);

    // Hantar isyarat (event) supaya WalletWidget di atas tahu data telah berubah
    window.dispatchEvent(new Event("spointUpdated"));

    setClaimMessage(`Yay! You claimed +${earnedPoints} SPoint!`);
    setTimeout(() => setClaimMessage(""), 4000);
  };

  const handleResetData = () => {
    localStorage.removeItem("seoulify_balance");
    localStorage.removeItem("seoulify_spoint");
    localStorage.removeItem("seoulify_streak");
    localStorage.removeItem("seoulify_last_claim");
    
    // Hantar isyarat kemas kini
    window.dispatchEvent(new Event("balanceUpdated"));
    window.dispatchEvent(new Event("spointUpdated"));
    window.location.reload(); // Muat semula halaman secara automatik

    <button onClick={handleResetData} 
    style={{ marginTop: "10px", fontSize: "0.7rem", background: "none", border: "none", color: "#8A5A65", cursor: "pointer", textDecoration: "underline" }}>
</button>
  };

  const isCheckedInToday = lastClaimDate === new Date().toDateString();

  return (
    <div style={styles.cardContainer}>
      <div style={styles.headerSection}>
        <span style={styles.mainTitle}>Daily Check-in</span>
        <div style={styles.pointsPill}>✨ <strong>{spoint}</strong> pts</div>
      </div>

      <div style={styles.circleRow}>
        {rewards.map((pts, index) => {
          const isClaimed = index < streak || (index === streak && isCheckedInToday);
          const isCurrent = index === streak && !isCheckedInToday;

          return (
            <div key={index} style={styles.dayColumn}>
              <div 
                style={{
                  ...styles.circleNode,
                  backgroundColor: isClaimed ? "#6C0820" : isCurrent ? "#F2AEBC" : "#E5D0D0",
                  color: isClaimed || isCurrent ? "#FFF" : "#6C0820",
                  border: isCurrent ? "2px solid #6C0820" : "none",
                  transform: isCurrent ? "scale(1.1)" : "scale(1)",
                }}
              >
                {isClaimed ? "✓" : `+${pts}`}
              </div>
              <span style={{
                ...styles.dayLabel,
                fontWeight: isCurrent ? "bold" : "normal",
                color: isCurrent ? "#6C0820" : "#8A5A65"
              }}>
                Day {index + 1}
              </span>
            </div>
          );
        })}
      </div>

      <button 
        style={{
          ...styles.actionButton,
          backgroundColor: isCheckedInToday ? "#E5D0D0" : "#6C0820",
          color: isCheckedInToday ? "#6C0820" : "#FFF9F2",
          cursor: isCheckedInToday ? "default" : "pointer"
        }}
        onClick={handleDailyCheckIn}
        disabled={isCheckedInToday}
        onMouseEnter={(e) => {
          if (!isCheckedInToday) {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(108, 8, 32, 0.3)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isCheckedInToday) {
            e.currentTarget.style.transform = "translateY(0px) scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(108, 8, 32, 0.15)";
          }
        }}
      >
        {isCheckedInToday ? "Yay! See you tomorrow 🌟" : "Check In Now ✨"}
      </button>

      {claimMessage && <p style={styles.toastMsg}>{claimMessage}</p>}
    </div>
  );
}

const styles = {
  cardContainer: {
    backgroundColor: "#FFFFFF",
    border: "2px solid #E5D0D0",
    borderRadius: "20px",
    padding: "20px",
    width: "100%",
    maxWidth: "480px",
    margin: "15px auto",
    fontFamily: "Ribeye",
    boxShadow: "0 6px 15px rgba(108, 8, 32, 0.08)",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  mainTitle: {
    fontSize: "1rem",
    color: "#6C0820",
    fontWeight: "bold",
  },
  pointsPill: {
    fontSize: "0.85rem",
    color: "#6C0820",
    backgroundColor: "#F3E6D5",
    padding: "6px 14px",
    borderRadius: "20px",
    border: "1px solid #6C0820",
  },
  circleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    padding: "0 5px",
  },
  dayColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
  },
  circleNode: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
  },
  dayLabel: {
    fontSize: "0.7rem",
  },
  actionButton: {
    width: "100%",
    border: "none",
    padding: "12px",
    borderRadius: "25px",
    fontFamily: "Ribeye",
    fontSize: "0.85rem",
    fontWeight: "bold",
    letterSpacing: "1px",
    boxShadow: "0 4px 10px rgba(108, 8, 32, 0.15)",
    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    
  },
  toastMsg: {
    fontSize: "0.75rem",
    color: "#6C0820",
    backgroundColor: "#F3E6D5",
    padding: "8px",
    borderRadius: "10px",
    textAlign: "center",
    marginTop: "10px",
    border: "1px dashed #6C0820",
    margin: "10px 0 0 0",
  },
};