/* eslint-disable react/prop-types */
import { useState } from "react";
import { login } from "../lib/auth";

/**
 * LoginPage Component
 *
 * @param {{ onLogin: any; }} param0
 * @param {*} param0.onLogin
 * @returns {*}
 */
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  /**
   * Submit Handler
   *
   * @async
   * @param {*} e
   * @returns {unknown}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await login(email, password);

    console.log(user);

    if (user) return onLogin(user);

    setError(true);
  };

  /**
   * LoginFailedMessage
   *
   * @returns {*}
   */
  const LoginFailedMessage = () => {
    return (
      <div className="message is-danger">
        <p className="message-body">Login Failed</p>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button type="submit" className="button is-link">
            Login
          </button>
        </div>
      </div>

      {error && <LoginFailedMessage />}
    </form>
  );
};

export default LoginPage;
