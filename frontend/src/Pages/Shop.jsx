import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import CardProduct from "../components/CardProduct.jsx"
import { getPaginatedProducts } from "../store/features/products/productSlice.js"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
export default function Shop() {
  const products = useSelector((state) => state.product?.products?.data)
  const [currentPage, setCurrentPage] = useState(1)
  console.log(currentPage)
  //BUG: check how 0/-1 efects the page / add error page and catch no product erros
  let numberOfPages = products?.numberOfPages || 0
  console.log(products)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPaginatedProducts({ page: currentPage, limit: 12 }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [dispatch, currentPage])
  return (

    <div className="">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {
          products && products.products && products?.products?.map((product) => {
            return (
              <CardProduct key={product?._id} product={product} />
            )
          })
        }
      </div>
      <div className="my-4">
        <Pagination>
          <PaginationContent className="flex gap-2">
            <PaginationItem>
              <button type="button" hidden={currentPage === 1} onClick={() => { setCurrentPage(currentPage - 1) }}>Previous</button>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                <button type="button" hidden={currentPage === 1} onClick={(e) => { setCurrentPage(parseInt(e.target.innerText)); }}>{currentPage - 1}</button>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <button type="button" className="px-2 py-1 rounded-md hover:bg-red-300 border-2 border-orange-700" disabled>{currentPage}</button>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">
                <button type="button" hidden={currentPage === numberOfPages} onClick={(e) => { setCurrentPage(parseInt(e.target.innerText)); }}>{currentPage + 1}</button>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <button type="button" hidden={currentPage === numberOfPages} onClick={() => { setCurrentPage(currentPage + 1) }}>Next</button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
