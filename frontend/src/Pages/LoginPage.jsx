import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/features/auth/authSlice"

export default function LoginPage() {
  const navigate = useNavigate()
  const [inputValues, setInputValues] = useState({})
  const status = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputValues(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(inputValues))
      .unwrap()
      .then((res) => {
        if (res?.success == true) {
          toast.success(res.message, { autoClose: 1500 })
          navigate('/admin')
        }
        else {
          toast.error(res.message)
        }
        console.log(res)
      })
      .catch((err) => {
        toast.error(err)
      })
  }
  return (
    <div className="flex items-center justify-center h-screen bg-neutral-800">
      <form onSubmit={handleSubmit} >

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
                value={inputValues.email || ""}
                onChange={handleChange}
                required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={inputValues.password || ""}
                onChange={handleChange}
                required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={status == "loading" ? true : false}>
              {status == "loading" ? "Loading..." : "Sign in"}
            </Button>
          </CardFooter>

          <div className="mb-4 text-center text-sm">
            Don&apos;t have an account?
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </Card>
      </form>


    </div>
  )
}
