import { useEffect, useState } from 'react';
import Input from 'react-phone-number-input/input'
import 'react-phone-number-input/style.css'
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DOMPurify from 'dompurify';

interface QuoteForm {
  products: any | undefined;
}

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  product: string;
  artwork: string;
  quantity: string;
}

const phoneNumberRegex = /^\d{1,3}\d{3,}$/;
const nameRegex = /^[A-Za-z\u00C0-\u00FF]+$/;

const cleanPhone = (value: string) => {
  try {
    return value.replace(/\D+/g, '');
  } catch (error) {
    console.error('Error cleaning phone value:', error);
  }
};

const schema = yup.object({
  firstName: yup.string().matches(nameRegex, 'First name should only contain letters').required('First name is required'),
  lastName: yup.string().matches(nameRegex, 'Last name should only contain letters').required('Last name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  phone: yup.string()
    .transform((originalValue) => {
      return cleanPhone(originalValue);
    })
    .required('Phone number is required').matches(phoneNumberRegex, 'Invalid phone number'),
  product: yup.string().required('Field is required'),
  artwork: yup.string().required('Field is required'),
  quantity: yup.string().required('Field is required'),
}).required();

function QuoteForm({ products }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [product, setProduct] = useState('')
  const [artwork, setArtwork] = useState('')
  const [quantity, setQuantity] = useState('')
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (products) {
      setProductList(products);
    }
  }, [products]);

  const handlePhoneChange = (value: string) => {
    if (typeof value === 'string') {
      setPhone(value)
    } else {
      // Handle the case where value is not a valid number (or is not a string)
    }
  };

  // Initialize useForm

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>({//@ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const submissionData = {
      firstName: DOMPurify.sanitize(data.firstName),
      lastName: DOMPurify.sanitize(data.lastName),
      email: DOMPurify.sanitize(data.email),
      phone: DOMPurify.sanitize(data.phone),
      product: DOMPurify.sanitize(data.product),
      artwork: DOMPurify.sanitize(data.artwork),
      quantity: DOMPurify.sanitize(data.quantity),
    };
    try {
      const response = await fetch('/api/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Provide feedback to the user
      alert("Form submitted successfully!");
      reset({ firstName: '', lastName: '', email: '', phone: '' })
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error - display error message to user
    }
  };

  return (
    <>
      <h2 className="text-3xl lg:text-4xl">Request a quote</h2>
      <p className="text-lg lg:text-xl">Get a custom quote for boxes and more.</p>

      <form id="quote-form" className="form-control w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>

        <label className="label" htmlFor="firstName">
          <span className="label-text ">First Name</span>
        </label>
        <input
          id="firstName" // Added id to link with label
          type="text"
          placeholder="First Name"
          aria-label="First Name"
          className={`input input-bordered text-base-content w-full ${errors.firstName ? 'input-error' : ''}`}
          {...register('firstName')}
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName &&
          <div className="label" aria-live="polite">
            <span className="label-text-alt ">{errors.firstName.message}</span>
          </div>}

        <label className="label" htmlFor="lastName">
          <span className="label-text ">Last Name</span>
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="Last Name"
          aria-label="Last Name"
          className={`input input-bordered text-base-content w-full ${errors.lastName ? 'input-error' : ''}`}
          {...register('lastName')}
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName &&
          <div className="label" aria-live="polite">
            <span className="label-text-alt ">{errors.lastName.message}</span>
          </div>}

        <label className="label" htmlFor="email">
          <span className="label-text ">Email</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          aria-label="Email"
          className={`input input-bordered text-base-content w-full ${errors.email ? 'input-error' : ''}`}
          {...register('email')}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email &&
          <div className="label" aria-live="polite">
            <span className="label-text-alt ">{errors.email.message}</span>
          </div>}

        <label className="label" htmlFor="phone">
          <span className="label-text ">Phone Number</span>
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="+971 12 345 6789"
          aria-label="Phone Number"
          value={phone}
          className={`input input-bordered text-base-content w-full ${errors.phone ? 'input-error' : ''}`}
          {...register('phone')}
          onChange={handlePhoneChange}
        />
        {errors.phone &&
          <div className="label" aria-live="polite">
            <span className="label-text-alt ">{errors.phone.message}</span>
          </div>}

        <label className="label" htmlFor="product">
          <span className="label-text ">What products are you interested in?</span>
        </label>
        <select
          id="product"
          aria-required="true" // Indicating that the field is required
          aria-invalid={errors.product ? "true" : "false"} // Indicates whether the field has an error
          aria-describedby={errors.product ? "product-error" : undefined} // Describes the element that contains the error message
          className={`select select-bordered text-base-content w-full ${errors.product ? 'select-error' : ''}`}
          {...register('product')}
          required value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value='' disabled>Select one</option>
          {
            products.map((product, index) => (
              <option key={index} value={product.data.title}>{product.data.title}</option>
            ))
          }
        </select>
        {errors.product &&
          <div className="label" id="product-error" aria-live="polite">
            <span className="label-text-alt ">{errors.product.message}</span>
          </div>}

        <label className="label" htmlFor="artwork">
          <span className="label-text ">Do you have artwork?</span>
        </label>
        <select
          id="artwork" // Added id to link with label
          aria-labelledby="artwork-label"
          className={`select select-bordered text-base-content w-full ${errors.artwork ? 'select-error' : ''}`}
          {...register('artwork')} required value={artwork} onChange={(e) => setArtwork(e.target.value)}>
          <option value='' disabled>Select one</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {errors.artwork &&
          <div className="label" aria-live="polite">
            <span className="label-text-alt ">{errors.artwork.message}</span>
          </div>}

        <label className="label" htmlFor="quantity">
          <span className="label-text ">Quantity</span>
        </label>
        <select
          id="quantity"
          aria-labelledby="quantity-label"
          className={`select select-bordered text-base-content w-full ${errors.quantity ? 'select-error' : ''}`}
          {...register('quantity')} required value={quantity}
          onChange={(e) => setQuantity(e.target.value)}>
          <option value='' disabled>Select one</option>
          <option value="less-than-1000">Less than 1,000</option>
          <option value="1000-4000">1,000 - 4,000</option>
          <option value="4000+">4,000 or more</option>
        </select>
        {errors.quantity &&
          <div className="label" aria-live="polite">
            <span className="label-text-alt ">{errors.quantity.message}</span>
          </div>}
        <button type="submit" className="btn btn-neutral mt-4 max-w-fit mx-auto">Submit</button>
      </form>
    </>
  );
};

export default QuoteForm;
