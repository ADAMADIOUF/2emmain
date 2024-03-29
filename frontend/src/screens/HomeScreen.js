import React from 'react'
import { Col, Row } from 'react-bootstrap'

import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'

import Message from '../components/Error'

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()
  if(isLoading){
    return<Loader/>
  }
  if(error){
    return<Message/>
  }
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
       {products.map((product)=>(
        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
         <Product product={product}/>
        </Col>
       ))}
      </Row>
    </>
  )
}

export default HomeScreen
