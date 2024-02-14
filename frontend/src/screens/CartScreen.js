import React from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import { addToCart, removeFromCart } from '../slices/cartSlice'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'

const CartScreen = () => {
 const navigate = useNavigate()
 const dispatch = useDispatch()
 const { cartItems } = useSelector((state) => state.cart)
 const updateCartHandler = async  (item, qty) => {
   dispatch(addToCart({ ...item, qty }))
 }

 const incrementQuantity = (item) => {
   const newQty = item.qty < item.countInStock ? item.qty + 1 : item.qty
   updateCartHandler(item, newQty)
 }

 const decrementQuantity = (item) => {
   const newQty = item.qty > 1 ? item.qty - 1 : item.qty
   updateCartHandler(item, newQty)
 }
 const removeFromCartHandler = async(id)=>{
  dispatch(removeFromCart(id))
 }
 const checkoutHandler =()=>{
  navigate(`/login?redirect=/shipping`)
 }
  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Error>
            Your car is Empty <Link to={`/`}>Go Back</Link>
          </Error>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2} className='quantity-controls'>
                    <FaMinus onClick={() => decrementQuantity(item)} />
                    <Form.Control as='input' value={item.qty} readOnly />
                    <FaPlus onClick={() => incrementQuantity(item)} />
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items{' '}
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
              onClick={checkoutHandler}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
