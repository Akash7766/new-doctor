import { useState, useEffect } from "react";

const useAdmin = (user) => {
  const [adminUser, setAdminUser] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const email = user?.email;
  useEffect(() => {
    fetch(`http://localhost:5000/admin/${email}`, {
      method: "GET",
      headers: {
        authoraization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdminLoading(false);
        setAdminUser(data.admin);
      });
  }, [user]);

  return [adminUser, adminLoading];
};
export default useAdmin;
