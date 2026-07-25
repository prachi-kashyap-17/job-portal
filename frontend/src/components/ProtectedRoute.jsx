import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedrole, children }) {
  const { isLoggedIn, user } = useSelector((store) => store.auth);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (allowedrole && allowedrole !== user.role) {
    return <Navigate to="/" />;
  }
  return children;
}
export default ProtectedRoute;

// FARAK: useNavigate() vs <Navigate />
// useNavigate() -> ek FUNCTION deta hai. Use karte hain jab
//   koi ACTION ho (button click, form submit). Jaise:
//   const navigate = useNavigate();
//   navigate("/login");   <- button click ke andar likhte hain

// <Navigate /> -> ek COMPONENT/TAG hai (jaise <div>, <button>).
//   Use karte hain jab component seedha "return" kar raha ho,
//   bina kisi click ke. Jaise:
//   return <Navigate to="/login" />;

// RULE: return ke andar hamesha <Navigate /> (tag wala),
//       button/event ke andar hamesha useNavigate() (function wala)
