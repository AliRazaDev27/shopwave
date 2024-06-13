import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import axios from "axios"
import { getAllCategories } from "../../store/features/categories/categorySlice.js"
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

export default function AddProduct() {
  const user = useSelector((state) => state.auth?.user)
  const categories = useSelector((state) => state.category?.categories?.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(user)
  const [inputValues, setInputValues] = useState({})

  console.log(inputValues)
  function handleSelectChange(value) {
    setInputValues({ ...inputValues, category: value })
  }
  function handleChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      inputValues.user = user?.user?._id
      console.log(inputValues)
      const result = await axios
        .post("http://localhost:3000/api/products", inputValues, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        })
      if (result.data.success) {
        toast.success(result.data.message, { autoClose: 1000 })
        navigate("/admin/products")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Card className="mx-auto w-full">
          <CardHeader>
            <CardTitle className="text-xl">Create New Product</CardTitle>
            <CardDescription>
              Enter product information to create a product.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Product Title</Label>
                <Input id="title" name="title" onChange={handleChange} placeholder="Product Title" required />
              </div>

              <div className="grid grid-cols-2 gap-2 items-center">
                <div>
                  <Label htmlFor="categories">Category</Label>
                  <Select id="categories" required onValueChange={handleSelectChange}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories && categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}> {category.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 ">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    name="price"
                    onChange={handleChange}
                    placeholder="Product Price"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Description</Label>
                <Textarea name="description" onChange={handleChange} placeholder="Type your message here." />
              </div>
              <div>
                <Input
                  id="price"
                  type="file"
                  placeholder="Product Price"
                  name="image"
                  onChange={(e) => handleChange({ target: { name: "image", value: e.target.files[0] } })}
                  required
                />
              </div>
              <div className="flex justify-center">
                <Button type="sumbit" className="w-max">
                  Create  Product
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}


