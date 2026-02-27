import React, { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Central State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation Logic
  const isStepValid = () => {
    if (step === 1) {
      return formData.firstName.trim() !== "" && 
             formData.lastName.trim() !== "" && 
             formData.dob !== "";
    }
    if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailRegex.test(formData.email);
      const isPasswordValid = formData.password.length >= 8;
      const isMatch = formData.password === formData.confirmPassword;
      return isEmailValid && isPasswordValid && isMatch;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Submission Data:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={styles.card}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2 style={{ color: "#2e7d32" }}>Success! 🎉</h2>
          <p>Your onboarding is complete. Check the console for your data.</p>
          <button style={styles.buttonSecondary} onClick={() => window.location.reload()}>Start Over</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Progress Bar */}
        <div style={styles.progressContainer}>
          <div style={styles.progressText}>
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div style={styles.progressBarBg}>
            <div style={{ ...styles.progressBarFill, width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 style={styles.title}>Personal Info</h2>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First Name</label>
                <input style={styles.input} type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Last Name</label>
                <input style={styles.input} type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Date of Birth</label>
                <input style={styles.input} type="date" name="dob" value={formData.dob} onChange={handleChange} />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 style={styles.title}>Account Details</h2>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input style={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="mail@example.com" />
                {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && <span style={styles.errorText}>Invalid email format</span>}
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password (min 8 chars)</label>
                <div style={{ position: "relative" }}>
                  <input style={styles.input} type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.toggleBtn}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input style={styles.input} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && <span style={styles.errorText}>Passwords do not match</span>}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 style={styles.title}>Review & Submit</h2>
              <div style={styles.reviewBox}>
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>DOB:</strong> {formData.dob}</p>
                <p><strong>Email:</strong> {formData.email}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={styles.navButtons}>
            {step > 1 && (
              <button type="button" style={styles.buttonSecondary} onClick={() => setStep(step - 1)}>Back</button>
            )}
            
            {step < 3 ? (
              <button 
                type="button" 
                style={isStepValid() ? styles.buttonPrimary : styles.buttonDisabled} 
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid()}
              >
                Next
              </button>
            ) : (
              <button type="submit" style={styles.buttonSubmit}>Submit</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// Vanilla CSS-in-JS Styles
const styles = {
  container: { padding: "50px 20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7f6", minHeight: "100vh" },
  card: { maxWidth: "450px", margin: "0 auto", background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
  progressContainer: { marginBottom: "30px" },
  progressText: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: "#666" },
  progressBarBg: { width: "100%", height: "8px", background: "#eee", borderRadius: "10px" },
  progressBarFill: { height: "100%", background: "#4A90E2", borderRadius: "10px", transition: "width 0.3s ease" },
  title: { margin: "0 0 20px 0", fontSize: "22px", color: "#333" },
  inputGroup: { marginBottom: "20px" },
  label: { display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold", color: "#555" },
  input: { width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px", boxSizing: "border-box" },
  errorText: { color: "red", fontSize: "11px", marginTop: "4px", display: "block" },
  toggleBtn: { position: "absolute", right: "10px", top: "10px", border: "none", background: "none", color: "#4A90E2", cursor: "pointer", fontSize: "12px" },
  reviewBox: { background: "#f9f9f9", padding: "15px", borderRadius: "8px", lineHeight: "1.6" },
  navButtons: { display: "flex", justifyContent: "space-between", marginTop: "30px" },
  buttonPrimary: { padding: "10px 25px", background: "#4A90E2", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginLeft: "auto" },
  buttonDisabled: { padding: "10px 25px", background: "#ccc", color: "white", border: "none", borderRadius: "6px", cursor: "not-allowed", marginLeft: "auto" },
  buttonSecondary: { padding: "10px 25px", background: "transparent", color: "#666", border: "1px solid #ccc", borderRadius: "6px", cursor: "pointer" },
  buttonSubmit: { padding: "10px 25px", background: "#2e7d32", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginLeft: "auto" }
};

export default MultiStepForm;