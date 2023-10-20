'use client';
import { faker } from '@faker-js/faker';
import styles from './page.module.css'
import { useState,useRef,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import "./globals.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { redirect } from 'next/navigation'
import { getSession, useSession } from 'next-auth/react';


const getAirbnbs = async () => {
  let response;
  try{
    response = await fetch(`https://nextjs-eight-xi-78.vercel.app/api/test`);
  console.log("response",response)
  }catch(err){
    console.log("errerr",err)
  }

  console.log("herree")
  const data = await response.json();
  console.log("datadata",data)
  return data
}

export default  function Home(){
  const titleForm = useRef();
  const cityForm = useRef();
  const priceForm = useRef();
  const descForm = useRef();
  const [airbnbs,setAirbnbs] = useState([])
  const {data:session} = useSession();

  const addAnnonce = async(e) => {
    e.preventDefault();
    let title = titleForm.current.value;
    let city = cityForm.current.value;
    let price = priceForm.current.value;
    let desc = descForm.current.value;
    let geometryData = {}
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyBmzrfAtBj3pSQDMa1AG4dAmeP5cUBpziA`;
    const geocodeResult = await fetch(geocodingUrl).then(result => result.json())
     if(geocodeResult?.results?.length > 0){
      geocodeResult.results.forEach(item => {
        geometryData["lat"]= item.geometry.location.lat;
        geometryData["long"]= item.geometry.location.lng;
        geometryData["city"]= item.formatted_address;
      });
     }

     if(Object.keys(geometryData)?.length > 0){
      const formData = {
        title: title,
        city: geometryData.city,
        price: price,
        description: desc,
        lat:geometryData.lat,
        long:geometryData.long
      }
      const apiUrl = "http://localhost:3000/api";
      fetch(`${apiUrl}/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then(async result => {
        titleForm.current.value = " ";
        cityForm.current.value = " ";
        descForm.current.value = " ";
        priceForm.current.value = " ";
      });
     }

  }
      useEffect(() => {
        getAirbnbs().then((result) => {
          setAirbnbs(result)
        })
      }, []);
    
  return (
    <main className={styles.main}>
      <div className="formData">
        <Form  onClick={(e) => addAnnonce(e)}>
          <h3>Ajouter une annonce</h3>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Control type="text" value={faker.lorem.sentence(3)} ref={titleForm}  placeholder="Titre" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Control type="text"  ref={cityForm} placeholder="Adresse" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Control type="number" value={faker.number.int({min:100000,max:300000})} ref={priceForm} placeholder="Prix" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Control type="text" value={faker.lorem.sentence()}  ref={descForm} placeholder="description" />
        </Form.Group>
        <div className="btnContainer">
        <Button variant="primary" className="formButton" type="submit">
          Ajouter
        </Button>
        </div>
      </Form>
      </div>
      
      <div className="getAirbnbs">
        <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>Title</th>
                <th>city</th>
                <th>Price</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {airbnbs && Array.isArray(airbnbs) && airbnbs.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.title}</td>
                    <td>{item.city}</td>
                    <td>{item.price}€</td>
                    <Button variant="warning">
                      <Link
                      href={{
                        pathname: `details/${item._id}`
                      }}
                    >
                      Voir
                    </Link>
                    </Button>
                  </tr>
                )
              })}
            </tbody>
    </Table>
      </div>
  </main>
  )
}
