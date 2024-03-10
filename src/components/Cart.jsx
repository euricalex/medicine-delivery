import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import '../scss/cart.scss'
import medicinies from '../data.json'
import { inputSchema } from './Formik/formik';

function Cart() {
const initialValues = {
  name: '',
  email: '',
  phone: '',
  address: ''
}
const handleSubmit = (values, {resetForm}) => {
console.log(values);
resetForm()
}
  return (
    <section className=''>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={inputSchema} validateOnMount>
      <Form  >
<div className='cart-container'>

    <div className="input-container">
     
        <ul className='input-list'>
        <li>
          <label htmlFor="name">Name:</label>
          <Field name ="name" id="name" className="input-item" type="text" />
          <ErrorMessage component='div' className='error-input'  name='name'/>
        </li>
        <li>
          <label htmlFor="email">Email:</label>
          <Field name="email" id="email" className="input-item" type="email" />
          <ErrorMessage className='error-input' component='div' name='email'/>
        </li>
        <li>
          <label htmlFor="phone">Phone:</label>
          <Field name="phone" id="phone" className="input-item" type="tel" />
          <ErrorMessage component='div' className='error-input' name='phone'/>
        </li>
        <li>
          <label htmlFor="address">Address:</label>
          <Field name="address" id="address" className="input-item" type="text" />
          <ErrorMessage component='div' className='error-input' name='address'  />
        </li>

        </ul>

    </div>
    <div className='add-container'>
<ul className='add-list'>
{medicinies.slice(0, 3).map(item =>( <li key={item.id}>
             <h2>{item.name}</h2>
             <p>Price: {item.price}</p>
       
             </li>
))}
</ul>
    </div>
    </div>
    <div className='submit-container'>
        <h1 className='price-title'>Total price: 999 </h1>
        <button className='btn-submit' type='submit'>Submit</button>
       
    </div>
    </Form>
    </Formik>
    </section>
  )
}

export default Cart
