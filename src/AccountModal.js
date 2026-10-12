import React, { useState } from "react";

export default function AccountModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false); // false = Sign In, true = Sign Up
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Paparan Lupa Kata Laluan
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // Langkah 1: Emel, Langkah 2: Kata Laluan

  if (!isOpen) return null;

  const handleNext = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Enter Your Email!");
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Seoulify account successfully created for: ${email} ✨`);
    } else {
      alert(`Successfully logged in as: ${email} ✨`);
    }

    localStorage.setItem("seoulify_user", email);
    window.dispatchEvent(new Event("userLoggedIn"));
    handleClose();
  };

  // Fungsi hantar emel set semula kata laluan
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your account email!");
      return;
    }
    alert(`Password reset link has been sent to ${email} ✉️ Please check your email!`);
    handleClose();
  };

  // Tutup dan tetapkan semula semua state
  const handleClose = () => {
    setIsSignUp(false);
    setIsForgotPassword(false);
    setStep(1);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    onClose();
  };

  // Tukar mod (Sign In / Sign Up)
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setIsForgotPassword(false);
    setStep(1);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modalBox}>
        {/* Butang Tutup (X) */}
        <button style={styles.closeBtn} onClick={handleClose}>×</button>

        {/* Bahagian Gambar Ikon di Atas */}
        <div style={styles.iconContainer}>
          <img 
            src="https://i.pinimg.com/736x/29/02/6f/29026f18ff79655fcfdda9a2a2490051.jpg" 
            alt="Seoulify Logo" 
            style={styles.iconImage} 
          />
        </div>

        <h2 style={styles.title}>
          {isForgotPassword 
            ? "Reset Password" 
            : isSignUp 
            ? "Create Seoul Account" 
            : "Sign in to Seoulify"}
        </h2>
        <p style={styles.subtitle}>
          {isForgotPassword 
            ? "Enter your email to receive reset instructions." 
            : isSignUp 
            ? "Join the ultimate Y2K K-Pop community today." 
            : "Your ultimate K-Pop destination account."}
        </p>

        {/* PAPARAN 1: BORANG FORGOT PASSWORD */}
        {isForgotPassword ? (
          <form onSubmit={handleForgotPasswordSubmit} style={styles.form}>
            <div style={styles.inputWrapper}>
              <input 
                type="email" 
                placeholder="Enter your account email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.inputField}
                required
                autoFocus
              />
            </div>
            
            <button 
              type="submit" 
              style={styles.primaryButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(242, 174, 188, 0.4)";
                e.currentTarget.style.backgroundColor = "#ff758c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px) scale(1)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.backgroundColor = "#F2AEBC";
              }}
            >
              Send Reset Link ➔
            </button>
            <button 
              type="button" 
              onClick={() => setIsForgotPassword(false)} 
              style={styles.backTextBtn}
            >
              Back to Sign In
            </button>
          </form>
        ) : step === 1 ? (
          /* PAPARAN 2: MASUKKAN EMEL (SIGN IN / SIGN UP) */
          <form onSubmit={handleNext} style={styles.form}>
            <div style={styles.inputWrapper}>
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.inputField}
                required
                autoFocus
              />
            </div>
            
            <button 
              type="submit" 
              style={styles.primaryButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(242, 174, 188, 0.4)";
                e.currentTarget.style.backgroundColor = "#ff758c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px) scale(1)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.backgroundColor = "#F2AEBC";
              }}
            >
              Continue with Email ➔
            </button>
          </form>
        ) : (
          /* PAPARAN 3: MASUKKAN KATA LALUAN */
          <form onSubmit={handleSubmit} style={styles.form}>
            <p style={{ fontSize: "0.8rem", color: "#8A5A65", textAlign: "center" }}>
              {isSignUp ? "Daftar untuk: " : "Log masuk untuk: "} <strong>{email}</strong>
            </p>
            <div style={styles.inputWrapper}>
              <input 
                type="password" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.inputField}
                required
                autoFocus
              />
            </div>

            {isSignUp && (
              <div style={styles.inputWrapper}>
                <input 
                  type="password" 
                  placeholder="Confirm password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.inputField}
                  required
                />
              </div>
            )}
            
            <button 
              type="submit" 
              style={styles.primaryButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(242, 174, 188, 0.4)";
                e.currentTarget.style.backgroundColor = "#ff758c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px) scale(1)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.backgroundColor = "#F2AEBC";
              }}
            >
              {isSignUp ? "Sign Up ✨" : "Sign In ✨"}
            </button>
            <button 
              type="button" 
              onClick={() => setStep(1)} 
              style={styles.backTextBtn}
            >
              Use a different email?
            </button>
          </form>
        )}

        {/* PAUTAN BAWAH (FOOTER LINKS) */}
        {!isForgotPassword && (
          <div style={styles.footerLinks}>
            <span style={styles.linkText} onClick={toggleMode}>
              {isSignUp ? "Already have an account? Sign In" : "Create New Seoulify Account"}
            </span>
            {!isSignUp && (
              <>
                <span style={styles.dot}>•</span>
                <span style={styles.linkText} onClick={() => setIsForgotPassword(true)}>
                  Forgot Password?
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(5px)",
  },
  modalBox: {
    backgroundColor: "#1c1c1e",
    color: "#F3E6D5",
    border: "1px solid #333",
    borderRadius: "24px",
    padding: "35px 30px",
    width: "100%",
    maxWidth: "440px",
    fontFamily: "Ribeye",
    position: "relative",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    textAlign: "center",
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "none",
    color: "#fff",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  iconImage: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #F2AEBC",
    boxShadow: "0 0 15px rgba(255, 117, 140, 0.4)",
  },
  title: {
    fontSize: "1.4rem",
    color: "#FFF",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "0.8rem",
    color: "#8A5A65",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputWrapper: {
    position: "relative",
  },
  inputField: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "12px",
    padding: "14px 1px",
    color: "#FFF",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "box-border",
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: "#F2AEBC",
    color: "#6C0820",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    fontWeight: "bold",
    fontSize: "0.9rem",
    cursor: "pointer",
    fontFamily: "Ribeye",
    transition: "all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  backTextBtn: {
    background: "none",
    border: "none",
    color: "#ff758c",
    fontSize: "0.75rem",
    cursor: "pointer",
    textDecoration: "underline",
  },
  footerLinks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "25px",
    fontSize: "0.75rem",
    color: "#ff758c",
  },
  linkText: {
    cursor: "pointer",
  },
  dot: {
    color: "#666",
  },
};