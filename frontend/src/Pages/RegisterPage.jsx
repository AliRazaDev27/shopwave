import { register } from "../store/features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "react-toastify"

export default function RegisterPage() {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.auth.status)
  const [inputValues, setInputValues] = useState({})
  const navigate = useNavigate()
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputValues(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(inputValues)).unwrap().then((res) => {
      if (res?.success == true) {
        toast.success(res.message, { autoClose: 1500 })
        navigate("/")
      }
      else {
        toast.error(res.message)
      }
      console.log(res)
    }).catch((err) => {
      toast.error(err)
    })

  }
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-neutral-800">
        <Card className="mx-auto max-w-md ">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullname">Full name</Label>
                    <Input
                      id="fullname"
                      placeholder="Ali"
                      required name="name"
                      value={inputValues.name || ""}
                      onChange={handleChange} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ali@example.com"
                    required
                    name="email"
                    value={inputValues.email || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required name="password"
                    value={inputValues.password || ""}
                    onChange={handleChange} />
                </div>
                <Button type="submit" className="w-full" disabled={status == "loading" ? true : false}>
                  Create an account
                </Button>
                <Button variant="outline" className="w-full">
                  Sign up with GitHub
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
