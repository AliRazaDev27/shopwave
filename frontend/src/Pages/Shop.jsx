import CardProduct from "../components/CardProduct.jsx"
import { getAllProducts } from "../store/features/products/productSlice.js"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
export default function Shop() {
  const products = useSelector((state) => state.product?.products?.data)
  console.log(products)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProducts()).unwrap().then((res) => {
      console.log(res)
    })
  }, [dispatch])
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {
        products && products?.map((product) => {
          return (
            <CardProduct key={product?._id} product={product} />
          )
        })
      }
    </div>
  )
}
