'use client';
import { useRouter } from "next/router";
import { faker } from '@faker-js/faker';
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./details.css"
import Link from "next/link";

const getCurrentApartment = async (id) => {
  if(id){
    const response = await fetch(`https://nextjs-eight-xi-78.vercel.app/api/${id}`);
    const data = await response.json();
    return data
  }
}

const Detail = () => {
    const router = useRouter();
    const id = router.query.id;
    const [apartmentDetail,setApartmentDetail] = useState([])
    
    useEffect(() => {
      getCurrentApartment(id).then((result) => {
        if(result?.length > 0){
          setApartmentDetail(result[0])
        }
      })
    }, id);


    return (
        <div className="detailsPage">
            <Card style={{ width: '25rem' }}>
            <Card.Body>
              <Card.Title>{apartmentDetail?.title} - {apartmentDetail?.price} €</Card.Title>
              <Card.Text>
                    {apartmentDetail?.description}
              </Card.Text>
                <Link href={{
                        pathname: "../"
                      }}
                    >
                    Revenir en arrière
                </Link>
                
            </Card.Body>
          </Card>
        </div>
    )
  }

  export default Detail;