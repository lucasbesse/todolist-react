
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User.interface";
import { loginUser } from "../services/RegisterService";
import "./Login.css";

function Login() {
  const [username, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const navigate = useNavigate()

  const handleSubmit = async (): Promise<void> =>{
    const user: User = {
      username: username,
      password: password,
      email: email
    }

    const result = await loginUser(user);
    if(result){
      localStorage.setItem("token", result.access);
      navigate("/home")
    }
  }

  return (
    <div className="form" onSubmit={handleSubmit}>
      <span>Nome</span>
      <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
      <span>Email</span>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <span>Senha</span>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleSubmit} className="add-btn">
          Login
      </Button>
    </div>
  );
}

export default Login;