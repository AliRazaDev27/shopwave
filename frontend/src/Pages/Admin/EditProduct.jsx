import { useLocation } from 'react-router-dom'
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
import { updateProduct } from '../../store/features/products/productSlice.js'
export default function EditProduct() {
  const location = useLocation()
  console.log(location)
  const user = useSelector((state) => state.auth?.user)
  const categories = useSelector((state) => state.category?.categories?.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(user)
  const [inputValues, setInputValues] = useState({})
  const [data, setData] = useState({})
  console.log(inputValues)
  function handleSelectChange(value) {
    setInputValues({ ...inputValues, category: value })
  }
  function handleChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${location.state.id}`).then((res) => {
      setInputValues(res.data?.data)
    })
    dispatch(getAllCategories())
  }, [])
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      inputValues.user = user?.user?._id
      console.log(inputValues)
      dispatch(updateProduct(inputValues)).unwrap().then((data) => {
        console.log(data)
      })
      // BUG: check proper reloading
      navigate("/admin/products")

    } catch (error) {
      console.log(error)
    }
  }
  return <div>
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-xl">Edit Product</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Product Title</Label>
            <Input id="title" name="title" onChange={handleChange} value={inputValues?.title} required />
          </div>

          <div className="grid grid-cols-2 gap-2 items-center">
            <div>
              <Label htmlFor="categories">Category</Label>
              <Select id="categories" required onValueChange={handleSelectChange} value={inputValues?.category?._id}>
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
                value={inputValues?.price}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Description</Label>
            <Textarea name="description" onChange={handleChange} value={inputValues?.description} />
          </div>
          <div className="flex gap-2">
            <div className="w-32">
              <img src={inputValues?.picture?.picture_url} alt="picture" />
            </div>
            <div className='self-end'>
              <Input
                id="image"
                type="file"
                placeholder="Product Image"
                name="image"
                onChange={(e) => handleChange({ target: { name: "image", value: e.target.files[0] } })}
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="button" onClick={handleSubmit} className="w-max">
              Edit  Product
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
}
