import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../services/UserService";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    contactNumber: "",
    address: "",
    username: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const age = String(formData.age).trim();
    const contactNumber = String(formData.contactNumber).trim();

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    if (!age) newErrors.age = "Age is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!contactNumber) newErrors.contactNumber = "Contact number is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.username.trim()) newErrors.username = "Username is required.";

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (age && (!/^\d+$/.test(age) || Number(age) < 1 || Number(age) > 120)) {
      newErrors.age = "Age must be a number between 1 and 120.";
    }

    if (contactNumber && (!/^\d+$/.test(contactNumber) || contactNumber.length !== 11)) {
      newErrors.contactNumber = "Contact number must be exactly 11 digits.";
    }

    if (password && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (formData.username.trim().includes(" ")) {
      newErrors.username = "Username must not contain spaces.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      await createUser({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        age: formData.age,
        gender: formData.gender,
        contactNumber: formData.contactNumber,
        address: formData.address.trim(),
        username: formData.username.trim(),
        type: "editor", 
        isActive: true,
      });

      alert("Account created successfully! Please log in.");
      navigate("/auth/signin");
    } catch (error) {
      console.error("Sign up failed:", error);
      setApiError(error.response?.data?.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full rounded-2xl p-8 shadow-xl"
      style={{ border: "1px solid #f0f0f0" }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div
          className="h-px flex-1"
          style={{ backgroundColor: "#D4AF37", opacity: 0.4 }}
        />
        <span
          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ backgroundColor: "#0a1628", color: "#D4AF37" }}
        >
          New Account
        </span>
        <div
          className="h-px flex-1"
          style={{ backgroundColor: "#D4AF37", opacity: 0.4 }}
        />
      </div>

      <div className="mb-7">
        <h1
          className="text-5xl font-black tracking-tight text-black leading-none mb-1"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Sign Up
        </h1>
        <p className="text-sm text-zinc-400 mt-2">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="font-semibold underline underline-offset-2 decoration-yellow-400 hover:decoration-black transition-all"
            style={{ color: "#0a1628" }}
          >
            Log in
          </Link>
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {apiError && (
          <div className="p-3 rounded-lg bg-red-100 border border-red-300">
            <p className="text-sm text-red-700">{apiError}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="first-name"
              className="block text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#0a1628" }}
            >
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              name="firstName"
              placeholder="John"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 px-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-zinc-300 hover:border-zinc-200 focus:border-yellow-400 focus:bg-white focus:ring-0"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#0a1628" }}
            >
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              name="lastName"
              placeholder="Doe"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 px-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-zinc-300 hover:border-zinc-200 focus:border-yellow-400 focus:bg-white focus:ring-0"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="block text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "#0a1628" }}
          >
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </span>
            <input
              id="signup-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 pl-11 pr-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-zinc-300 hover:border-zinc-200 focus:border-yellow-400 focus:bg-white focus:ring-0"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="signup-password"
              className="block text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#0a1628" }}
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </span>
              <input
                id="signup-password"
                type="password"
                name="password"
                placeholder="••••••••"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 pl-11 pr-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-zinc-300 hover:border-zinc-200 focus:border-yellow-400 focus:bg-white focus:ring-0"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#0a1628" }}
            >
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </span>
              <input
                id="confirm-password"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 pl-11 pr-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-zinc-300 hover:border-zinc-200 focus:border-yellow-400 focus:bg-white focus:ring-0"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="age"
              className="block text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#0a1628" }}
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              name="age"
              placeholder="25"
              value={formData.age}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 px-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-zinc-300 hover:border-zinc-200 focus:border-yellow-400 focus:bg-white focus:ring-0"
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#0a1628" }}
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 px-4 py-3.5 text-sm text-black outline-none transition-all hover:border-zinc-200 focus:border-yellow-400 focus:bg-white focus:ring-0"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="contact"
              className="block text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#0a1628" }}
            >
              Contact Number
            </label>
            <input
              id="contact"
              type="tel"
              name="contactNumber"
              placeholder="09123456789"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 px-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-zinc-300 hover:border-zinc-200 focus:border-yellow-400 focus:bg-white focus:ring-0"
            />
            {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#0a1628" }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 px-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-zinc-300 hover:border-zinc-200 focus:border-yellow-400 focus:bg-white focus:ring-0"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "#0a1628" }}
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="123 Main Street, City, Country"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-xl border-2 border-zinc-100 bg-zinc-50 px-4 py-3.5 text-sm text-black outline-none transition-all placeholder:text-zinc-300 hover:border-zinc-200 focus:border-yellow-400 focus:bg-white focus:ring-0"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl py-4 text-sm font-bold uppercase tracking-widest text-white transition-all active:scale-95 mt-2 disabled:opacity-50"
          style={{ backgroundColor: "#0a1628", letterSpacing: "0.18em" }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = "#D4AF37")}
          onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = "#0a1628")}
        >
          {loading ? "Creating Account..." : "Create Account →"}
        </button>

        <p className="text-center text-xs text-zinc-300 pt-1">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="font-semibold underline underline-offset-2 decoration-yellow-400 hover:decoration-black transition-all"
            style={{ color: "#0a1628" }}
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;