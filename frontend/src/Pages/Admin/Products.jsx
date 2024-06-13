import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { dateFormat } from "../../helper/format"
import { useSelector, useDispatch } from "react-redux"
import { getAllProducts, deleteProduct } from "../../store/features/products/productSlice.js"
import { toast } from "react-toastify"

export default function Products() {
  // const [products, setProducts] = useState([])
  const products = useSelector((state) => state.product?.products?.data)
  const dispatch = useDispatch()
  console.log(products)
  function handleDelete(id) {
    dispatch(deleteProduct(id))
      .unwrap().then((res) => {
        toast.success(res.message, { autoClose: 1000 })
        dispatch(getAllProducts())
      }).catch((err) => {
        toast.error(err)
      })

  }
  // console.log(products)
  useEffect(() => {
    // axios.get("http://localhost:3000/api/products").then((response) => {
    //   setProducts(response.data.data)
    // })
    //   .catch((err) => { console.log(err) })
    try {
      dispatch(getAllProducts())
    } catch (err) {
      console.log(err)
    }
  }, [dispatch])
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold md:text-2xl">Products</h2>
        <Link to="/admin/products/add"><Button>Add Product</Button></Link>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Price</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Total Sales
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Created at</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products && products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product?.picture?.picture_url}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product?.title}
                    </TableCell>
                    <TableCell>
                      {product?.category?.name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">${product?.price}</TableCell>
                    <TableCell className="hidden md:table-cell">{product?.user?.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {dateFormat(product?.createdAt)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem><button type="button" onClick={() => handleDelete(product._id)}>Delete</button></DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
