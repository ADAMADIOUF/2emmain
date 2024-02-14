import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useGetProductDetailQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'

import Message from '../components/Error'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'
const ProductScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const{id: productId} =useParams()
 const { data: product, isLoading, error } = useGetProductDetailQuery(productId)
 const incrementQuantity = () => {
   if (qty < product.countInStock) {
     setQty(qty + 1)
   }
 }

 const decrementQuantity = () => {
   if (qty > 1) {
     setQty(qty - 1)
   }
 }
 const addToCartHandler =()=>{
dispatch(addToCart({...product,qty}))
navigate(`/cart`)
 }
 if(isLoading){
  return<Loader/>
 }
 if(error){
  return<Message/>
 }
  return (
    <>
      <Link to={`/`} className='btn btn-light my-3'>
        back to product
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
             Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
             Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price :</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status :</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 &&(
                <ListGroup.Item>
                  <Row>
                    
              <Col>Quantity</Col>
              <Col className='quantity-controls'>
                <span onClick={decrementQuantity}>
                  <FaMinus />
                </span>
                <input
                  type='number'
                  value={qty}
                  onChange={(e) =>
                    setQty(
                      Math.max(
                        1,
                        Math.min(product.countInStock, Number(e.target.value))
                      )
                    )
                  }
                  min='1'
                  max={product.countInStock}
                />
                <span onClick={incrementQuantity}>
                  <FaPlus />
                </span>
              </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={product.countInStock === 0}
              onClick={addToCartHandler}>
                Add to Cart
              </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
