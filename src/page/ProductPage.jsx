import axios from 'axios'
import { useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProduct, updateSearchedProduct } from '../redux/features/productSlice'
import Product from '../components/Product'

const ProductPage = () => {

  const limit = 5
  const { products } = useSelector((state) => state.product)
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(products?.length / limit)
  const dispatch = useDispatch()
  const [productLoading, setProductLoading] = useState(false)
  const [search, setSearch] = useState('')
  const handleSearch = (e) => {
    setSearch(e.target.value)
    const filterProducts = products.filter(product => {
      return String(product.title).toLowerCase().includes(String(e.target.value).toLowerCase())
    }

    );
    dispatch(setProduct(filterProducts));
    setPage(1)
  }
  // const handleSearchClick = () => {
  //   const filterProducts = products.filter(product => {
  //     return String(product.title).toLowerCase().includes(String(search).toLowerCase())
  //   }

  //   );
  //   dispatch(setProduct(filterProducts));
  //   setPage(1)

  // }

  const getProducts = async () => {
    setProductLoading(true)
    try {
      const { data } = await axios.get('https://fakestoreapi.com/products')
      dispatch(setProduct(data))


    } catch (error) {
      console.log(error)

    } finally {
      setProductLoading(false)
    }
  }
  useEffect(() => {
    if (search === '') {
      getProducts()
    }
  }, [search])


  const renderProducts = useMemo(() =>
    products?.slice(page > 0 ? (page - 1) * limit : 0, (page) * limit)?.map((product) => (
      <Product product={product} key={product.id} />

    ))
    , [products, page, limit, search])

  return (
    <div>
      <div className=' max-w-[800px] mx-auto mb-8 flex gap-4 items-center'>
        <input
          className='py-2 px-8 border border-zinc-200 rounded-lg flex-grow '
          placeholder='search product by title'
          type="search"
          value={search}
          onChange={handleSearch}
        />
        {/* <button onClick={handleSearchClick} className='px-10 py-2 rounded-lg text-white bg-blue-500'>Search</button> */}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {productLoading ? 'loading...' : renderProducts}
      </div>


      <div className='flex justify-center my-10'>
        {

          Array(totalPages)?.fill(2)?.map((item, index) =>
            <button onClick={() => setPage(index + 1)} className={`w-12 h-12  border border-zinc-200  flex justify-center items-center gap-4 text-xl  ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>{index + 1}</button>
          )


        }
      </div>

    </div>
  )
}

export default ProductPage
