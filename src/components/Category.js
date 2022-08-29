import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import {db, collection, query, orderBy} from '../firebase'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/Category.module.css';

const Category = () => {
    const queries = query(collection(db, 'category'), orderBy('timestamp', 'desc'));
    const [categories, loading, error] = useCollectionData(queries);
    
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

  return (
    <>
        {error && <p>{error}</p>}
        <Slider {...settings}>
          {loading ? <p>Loading...</p> :  categories.map(category => (
              <Link to={{ pathname: `/add-music/${category.name}` }} key={category.name} className="card">
                  <div className="card-top">
                    <img src={category.image} alt={category.name} className={styles.img} />
                    <p className={styles.text}>{category.name}</p>
                  </div>
              </Link>
          ))}
        </Slider>
          
    </>
  )
}

export default Category