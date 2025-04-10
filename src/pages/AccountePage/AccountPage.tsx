import { Header } from "@/widgets/header";
import UserLogistician from "./ui/UserLogistician/UserLogistician";
// import UserDriver from "./ui/UserDriver";
export default function AccountPage() {
  return (
    <div className="w-[75%] mx-auto">
      <Header />
      {/* <UserDriver /> */}
      <UserLogistician />
    </div>
  );
}
