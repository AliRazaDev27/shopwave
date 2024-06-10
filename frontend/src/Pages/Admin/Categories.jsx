import { MoreHorizontal } from "lucide-react"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCategory, getAllCategories } from "@/store/features/categories/categorySlice.js"
export default function Categories() {
  const categories = useSelector((state) => state.category?.categories?.data)
  const status = useSelector((state) => state.category?.status)
  const error = useSelector((state) => state.category?.error)
  console.log(`categories: ${categories}`)
  console.log(`status: ${status}`)
  console.log(`error: ${error}`)
  const [inputValues, setInputValues] = useState({})
  const dispatch = useDispatch()
  function handleInputChange(e) {
    const { name, value } = e.target
    setInputValues({ ...inputValues, [name]: value })
  }
  function handleSumbit(e) {
    e.preventDefault()
    console.log(inputValues)
    dispatch(addCategory(inputValues)).unwrap().then((res) => {
      console.log(res)
      dispatch(getAllCategories())
      setInputValues({})
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    console.log("useEffect")
    dispatch(getAllCategories())
  }, [dispatch])
  if (status === "loading") {
    return <p>Loading...</p>
  }
  if (status === "failed") {
    return <p>{error}</p>
  }
  return (
    <>
      <form onSubmit={handleSumbit}>
        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Category</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Input
              placeholder="Category Name"
              type="text"
              id="name"
              name="name"
              required
              value={inputValues.name || ""}
              onChange={handleInputChange}
            />
            <Button>Add</Button>
          </CardContent>
        </Card>
      </form>
      <div className="border-2">
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
                  <TableHead>Sr#</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>
                    <span>Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {console.log(categories)}
                {categories && categories.map((category, index) => (
                  <TableRow key={category._id}>
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {category.name}
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>
                      {category.createdAt || "27 October 1999"}
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
                          <DropdownMenuItem>Delete</DropdownMenuItem>
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
