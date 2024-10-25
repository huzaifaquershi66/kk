import React, { useEffect } from 'react';

const CheckoutForm = ({ designName, genuid, setPrice }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create a new form element
    const checkoutForm = document.createElement('form');
    checkoutForm.method = 'POST';
    checkoutForm.action = 'https://www.2checkout.com/checkout/spurchase';

    // Create hidden input fields
    const inputs = [
      { name: 'sid', value: '1694715' },
      { name: 'mode', value: '2CO' },
      { name: 'li_0_type', value: 'Digitizing Order' },
      { name: 'li_0_name', value: `${designName} ID:-${genuid}` },
      { name: 'li_0_price', value: setPrice },
      { name: 'li_0_recurrence', value: 'No' },
    ];

    inputs.forEach(input => {
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = input.name;
      hiddenInput.value = input.value;
      checkoutForm.appendChild(hiddenInput);
    });

    // Append the form to the body and submit
    document.body.appendChild(checkoutForm);
    checkoutForm.submit();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-300 to-orange-500">
      <div className="w-full bg-white p-10 shadow-lg rounded-2xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Checkout Form
        </h2>
        <form onSubmit={handleSubmit} id="2checkout">
          <label className="block mb-2 text-gray-800">
            Click Link If Not Redirected to Checkout.
          </label>
          <input
            type="submit"
            style={{ width: '140px', height: '25px' }}
            value="Check Out"
            className="bg-blue-600 text-white rounded-lg transition duration-200 hover:bg-blue-700"
          />
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
