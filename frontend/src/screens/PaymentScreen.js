import React, { useEffect, useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../slices/cartSlice'

const PaymentScreen = () => {
 const navigate =useNavigate()
 const dispatch = useDispatch()
 const[paymentMethod,setPaymentMethod]=useState("Paypal")
 const{shippingAddress}=useSelector((state)=>state.cart)
 useEffect(()=>{
  if(!shippingAddress){
   navigate("/shipping")
  }
 },[shippingAddress,navigate])
 const submitHandler =(e)=>{
  e.preventDefault()
  dispatch(savePaymentMethod(paymentMethod))
  navigate("/placeorder")
 }
  return (
    <FormContainer>
      <CheckoutSteps step1 setep2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
<Form.Group>
 <Form.Label as="legend">Select Method</Form.Label>
 <Col>
 <Form.Check type='radio' className='my-2' label="Paypal or Credit Card" id='payPal' name='paymentMethod' value="payPal" checked onChange={(e)=> setPaymentMethod(e.target.value)}>
  </Form.Check></Col>
</Form.Group>
<Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
