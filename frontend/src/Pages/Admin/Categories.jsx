import { toast } from "react-toastify"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCategory, getAllCategories, deleteCategory, updateCategory } from "@/store/features/categories/categorySlice.js"
export default function Categories() {
  const categories = useSelector((state) => state.category?.categories?.data)
  const status = useSelector((state) => state.category?.status)
  const error = useSelector((state) => state.category?.error)
  // const [inputValues, setInputValues] = useState({})
  const addRef = useRef("")
  const updateRef = useRef("")
  const dispatch = useDispatch()
  // function handleInputChange(e) {
  //   const { name, value } = e.target
  //   setInputValues({ ...inputValues, [name]: value })
  // }
  function handleSumbit(e) {
    e.preventDefault()
    const inputValues = { name: addRef.current.value }
    console.log(inputValues)
    dispatch(addCategory(inputValues)).unwrap().then((res) => {
      console.log(res)
      dispatch(getAllCategories())
      addRef.current = ""
    }).catch((err) => {
      console.log(err)
    })
  }
  function handleDelete(id) {
    dispatch(deleteCategory(id)).unwrap().then((res) => {
      console.log(res)
      dispatch(getAllCategories())
    }).catch((err) => {
      console.log(err)
    })
  }
  function handleUpdate(id) {
    const name = updateRef.current.value
    console.log(`name ${name} id ${id}`)
    const data = { name: name }
    const input = [id, data]
    dispatch(updateCategory(input)).unwrap().then((res) => {
      console.log(res)
      dispatch(getAllCategories())
    }).catch((err) => {
      console.log(err)
    })
  }
  function dateFormat(dateString) {
    if (dateString === null || dateString === undefined) {
      return
    }
    if (dateString === "") {
      return
    }
    if (typeof dateString === "string") {
      const [year, month, time] = dateString.split("-")
      const day = time.split("T")[0]
      let formatedDateString = `${day}-${month}-${year}`
      return formatedDateString
    }
    else {
      return
    }
  }
  useEffect(() => {
    console.log("useEffect")
    dispatch(getAllCategories())
  }, [dispatch])
  if (status === "loading") {
    return <p>Loading...</p>
  }
  if (status === "failed") {
    toast.error(error)
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
              ref={addRef}
              required
              defaultValue=""
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
                      {category.createdAt ? dateFormat(category.createdAt) : "27-10-1999"}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DialogTrigger asChild>
                              <DropdownMenuItem>
                                <button type="button" onClick={() => console.log('edit')}>Edit</button>
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem>
                              <button type="button" onClick={() => handleDelete(category.slug)}>Delete</button>
                            </DropdownMenuItem>

                          </DropdownMenuContent>
                        </DropdownMenu>

                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="username"
                                ref={updateRef}
                                defaultValue=""
                                placeholder="Name"
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={() => handleUpdate(category.slug)}>Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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

