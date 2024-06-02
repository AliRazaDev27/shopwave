import axios from "axios"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
export default function Users() {
  const [users, setUsers] = useState([])
  const getAllUsers = () =>
    axios.get("http://localhost:3000/api/users/all-users", {
      withCredentials: true,
      headers: { "ContentType": "application/json" }
    })
      .then((res) => {
        console.log(res.data.data)
        setUsers(res.data.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      });
  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <div className="w-full">
            <table className="border border-slate-300">
              {users.map((user) => {
                return <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              })}
            </table>
          </div>
          <Button className="mt-4">Users</Button>
        </div>
      </div>
    </>)
}
