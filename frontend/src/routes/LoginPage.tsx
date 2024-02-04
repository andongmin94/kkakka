import Login from "@/components/auth/Login";
const electron = window.electron;

export default function LoginPage() {
  const sendTokenToElectron = () => {
    electron.send("token", localStorage.getItem("token"));
  };
  return (
    <div onClick={sendTokenToElectron}>
      <Login/>
    </div>
  );
}
