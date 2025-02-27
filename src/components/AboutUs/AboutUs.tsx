import { useLocation } from "react-router-dom";


function AboutUs() {
  const location = useLocation();
  const message = location.state?.texto || 'Nada aqui'
  return (
    <div>
      <h1>About Us</h1>
      <p>
        {message}
      </p>
    </div>
  );
}

export default AboutUs;