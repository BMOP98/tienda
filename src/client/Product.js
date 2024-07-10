import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Product = () => {
  var item_valueid = sessionStorage.getItem("item_key");
  const [nameproduct, setNameproduct] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://problem2-3.azurewebsites.net/apiproduct";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_valueid, nameproduct, price, stock })
      });
      const inputFile = document.getElementById('pro_urlimg');
      const file = inputFile.files[0];
      const name = document.getElementById('nameproduct');
      const namepro = name.value;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', namepro);
      fetch('https://problem2-3.azurewebsites.net/apiimage', {
        method: 'POST',
        body: formData
      })
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <h2>New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameproduct">Name</label>
          <input
            type="text"
            className="form-control"
            id="nameproduct"
            value={nameproduct}
            onChange={(e) => setNameproduct(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="text"
            className="form-control"
            id="stoc"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div class="checkout__input">
          <p>Seleccionar imágen:</p>
        </div>
        <div class="checkout__input">
          <input id="pro_urlimg" type="file" placeholder="Ingresar la url de la imágen" name="file" onChange={changeHandler} accept=".png, .jpg, .jpeg" />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Product;
