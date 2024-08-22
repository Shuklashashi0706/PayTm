import axios from "axios";
import Appbar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: number;
  balance: number;
}

interface BalanceResponse {
  balance: {
    balance: number;
  };
}

function Dashboard() {
  const user = localStorage.getItem("user");
  const res: User | null = user ? (JSON.parse(user) as User) : null;
  const userName = res?.name || "Guest";
  const userId = res?._id || "";
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get<BalanceResponse>(
          `http://localhost:5000/api/v1/account/getBalance?userId=${userId}`,
          {
            withCredentials: true,
          }
        );
        setBalance(response?.data.balance.balance);
      } catch (error) {
        console.error("Failed to fetch balance", error);
        setBalance(0);
      }
    };

    if (userId) {
      fetchBalance();
    }
  }, [userId]);

  return (
    <div>
      <Appbar userName={userName} />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
