import React, { useState } from "react";
import "./App.css";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    eca: "",
    term: "",
    classLevel: "",
    day: "",
  });

  const [registrations, setRegistrations] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  // 💌 Auto-generate email
  const handleNameChange = (e) => {
    const enteredName = e.target.value;
    const email =
      enteredName.toLowerCase().trim().replace(/\s+/g, ".") +
      "@greenhillsacademy.rw";
    setFormData({ ...formData, fullName: enteredName, email });
  };

  // 🗓 ECA → Day mapping
  const ecaDays = {
    Football: { "MYP 1": "Monday", "MYP 2": "Thursday", "MYP 3": "Thursday" },
    Basketball: { "MYP 1": "Monday", "MYP 2": "Tuesday", "MYP 3": "Tuesday" },
    Swimming: { "MYP 1": "Monday", "MYP 2": "Monday", "MYP 3": "Monday" },
    "Table Tennis": { "MYP 1": "Thursday", "MYP 2": "Thursday", "MYP 3": "Thursday" },
    Volleyball: { "MYP 1": "Thursday", "MYP 2": "Thursday", "MYP 3": "Thursday" },
    Gymnastics: { "MYP 1": "Tuesday", "MYP 2": "Tuesday", "MYP 3": "Tuesday" },
    Cricket: { "MYP 1": "Tuesday", "MYP 2": "Tuesday", "MYP 3": "Tuesday" },
    Badminton: { "MYP 1": "Tuesday", "MYP 2": "Tuesday", "MYP 3": "Tuesday" },
    "Book Club (French & English)": { "MYP 1": "Thursday", "MYP 2": "Thursday", "MYP 3": "Thursday" },
    Debate: { "MYP 1": "Tuesday", "MYP 2": "Tuesday", "MYP 3": "Tuesday" },
    "Public Speaking": { "MYP 1": "Thursday", "MYP 2": "Thursday", "MYP 3": "Thursday" },
    "Model United Nations (GHAMUN)": { "MYP 1": "Monday", "MYP 2": "Monday", "MYP 3": "Monday" },
    "Science Practicals": { "MYP 1": "Tuesday", "MYP 2": "Tuesday", "MYP 3": "Tuesday" },
    Entrepreneurship: { "MYP 1": "Tuesday", "MYP 2": "Tuesday", "MYP 3": "Tuesday" },
    Coding: { "MYP 1": "Monday", "MYP 2": "Monday", "MYP 3": "Monday" },
    Robotics: { "MYP 1": "Tuesday", "MYP 2": "Tuesday", "MYP 3": "Tuesday" },
    Chess: { "MYP 1": "Thursday", "MYP 2": "Thursday", "MYP 3": "Thursday" },
    "Les Créatifs (Creative Projects)": { "MYP 1": "Thursday", "MYP 2": "Thursday", "MYP 3": "Thursday" },
    "Middle School Choir": { "MYP 1": "Tuesday", "MYP 2": "Tuesday", "MYP 3": "Tuesday" },
    "Traditional Dance": { "MYP 1": "Monday", "MYP 2": "Tuesday", "MYP 3": "Tuesday" },
    "Green Ambassadors / Environment Club": { "MYP 1": "Monday", "MYP 2": "Monday", "MYP 3": "Monday" },
    Cooking: { "MYP 1": "Monday", "MYP 2": "Monday", "MYP 3": "Monday" },
  };

  // 📚 ECA categories
  const ecaList = [
    { category: "Sports Activities", activities: ["Football","Basketball","Swimming","Table Tennis","Volleyball","Gymnastics","Cricket","Badminton"] },
    { category: "Academic & Clubs", activities: ["Book Club (French & English)","Debate","Public Speaking","Model United Nations (GHAMUN)","Science Practicals","Entrepreneurship","Coding","Robotics","Chess"] },
    { category: "Performing Arts", activities: ["Les Créatifs (Creative Projects)","Middle School Choir","Traditional Dance"] },
    { category: "Community & Life Skills", activities: ["Green Ambassadors / Environment Club","Cooking"] },
  ];

  // 🧩 Generic handler + auto-day
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...formData, [name]: value };

    if (name === "eca" || name === "classLevel") {
      const selectedECA = name === "eca" ? value : formData.eca;
      const selectedClass = name === "classLevel" ? value : formData.classLevel;
      if (ecaDays[selectedECA] && ecaDays[selectedECA][selectedClass]) {
        updated.day = ecaDays[selectedECA][selectedClass];
      } else updated.day = "";
    }
    setFormData(updated);
  };

  // 💾 Submit or update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.day) {
      alert("⚠️ Please select a valid ECA and class to get the correct day.");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...registrations];
      updated[editingIndex] = formData;
      setRegistrations(updated);
      setEditingIndex(null);
      alert(`✏️ Updated ${formData.fullName}'s registration.`);
    } else {
      setRegistrations([...registrations, formData]);
      alert(`✅ ${formData.fullName} registered for ${formData.eca} on ${formData.day}`);
    }

    setFormData({ fullName:"", email:"", eca:"", term:"", classLevel:"", day:"" });
  };

  const handleDelete = (index) => {
    setRegistrations(registrations.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setFormData(registrations[index]);
    setEditingIndex(index);
  };

  // 🔐 Handle Admin Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "ECAadmin2025!") {
      setIsAdmin(true);
      alert("🔓 Admin access granted!");
    } else {
      alert("❌ Incorrect password!");
    }
    setPassword("");
  };

  // 🧱 Student view (no admin rights)
  const renderForm = () => (
    <div className="form-container">
      <h1>{isAdmin ? "🌟 GHA ECA REGISTRATION (Admin View)" : "🌼 GHA ECA REGISTRATION (Student View)"}</h1>

      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleNameChange} required />

        <label>Email (@greenhillsacademy.rw):</label>
        <input type="email" name="email" value={formData.email} readOnly />

        <label>Class Level:</label>
        <select name="classLevel" value={formData.classLevel} onChange={handleChange} required>
          <option value="">-- Select Class --</option>
          <option value="MYP 1">MYP 1</option>
          <option value="MYP 2">MYP 2</option>
          <option value="MYP 3">MYP 3</option>
        </select>

        <label>Term:</label>
        <select name="term" value={formData.term} onChange={handleChange} required>
          <option value="">-- Select Term --</option>
          <option value="Term 1">Term 1</option>
          <option value="Term 2">Term 2</option>
          <option value="Term 3">Term 3</option>
        </select>

        <label>Activity (ECA):</label>
        <select name="eca" value={formData.eca} onChange={handleChange} required>
          <option value="">-- Select Activity --</option>
          {ecaList.map((group, i) => (
            <optgroup key={i} label={group.category}>
              {group.activities.map((act, j) => (
                <option key={j} value={act}>{act}</option>
              ))}
            </optgroup>
          ))}
        </select>

        <label>Day:</label>
        <input type="text" name="day" value={formData.day} readOnly placeholder="Auto-filled" />

        <button type="submit">{editingIndex !== null ? "Update" : "Register"}</button>
      </form>

      {/* Admin-only table */}
      {isAdmin && registrations.length > 0 && (
        <div className="table-container">
          <h2>🧾 Registered Students</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Class</th><th>ECA</th><th>Day</th><th>Term</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r, i) => (
                <tr key={i}>
                  <td>{r.fullName}</td>
                  <td>{r.email}</td>
                  <td>{r.classLevel}</td>
                  <td>{r.eca}</td>
                  <td>{r.day}</td>
                  <td>{r.term}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(i)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(i)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <>
      {!isAdmin && (
        <div className="login-container">
          <h2>🔒 Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
      {renderForm()}
    </>
  );
}

export default RegistrationForm;