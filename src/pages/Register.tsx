import { Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../interfaces/User.interface";
import { registerUser } from "../services/RegisterService";
import "./Register.css";

function Register() {
  const [username, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const navigate = useNavigate()

  const handleSubmit = async() => {
    const user: User = {
      username: username,
      password: password,
      email: email
    }
    console.log(user)
    const response = await registerUser(user)
    if(response){
      localStorage.setItem("token", response.access_token)
      navigate("/login")
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
          Registrar
      </Button>
      <Link to="/login">Já tenho conta</Link>
    </div>
  );
}

export default Register;