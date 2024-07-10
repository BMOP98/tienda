import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [products, setproducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        var item_valueid = sessionStorage.getItem("item_key");
        const response = await fetch('https://problem2-1.azurewebsites.net//apiproduct/' + item_valueid);
        if (response.ok) {
          const data = await response.json();
          setproducts(data);
        } else if (response.status === 404) {
          setError('No product found.');
        } else {
          throw new Error('Error fetching products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      }
    };

    fetchProducts();
  }, []);



  return (
    <div className="container">
      <h2>products</h2>
      <p>Manage your products here.</p>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <img style={{ width: 'auto', height: 150 }} src={'http://localhost:3003/apiimage/' + product.image} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
