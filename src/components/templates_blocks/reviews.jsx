import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import review1 from '../../assets/images/review_1.png';
import review2 from '../../assets/images/review_2.png';
import review3 from '../../assets/images/review_3.png';

const reviews = [
  {
    image: review1,
    name: 'Jane',
    rating: 3,
    review_text: 'This is a great degree to pursue! I really enjoyed using this online programme. '
  },
  {
    image: review2,
    name: 'Joe',
    rating: 4,
    review_text: 'I really enjoyed using this school. Classes were great and the teachers were very helpful. '
  },
  {
    image: review3,
    name: 'Aisha',
    rating: 4,
    review_text: ' Excellent school. I would recommend this school to anyone looking to further their education. '
  },
  // Add more reviews as needed
];

export default function Reviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container mx-auto py-8">
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className="p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden flex">
              <img src={review.image} alt={review.name} className="w-1/4 h-48 object-cover"/>
              <div className="p-4 flex flex-col justify-between">
                <div>
              <div className="flex items-center gap-0">
                  <span className="text-yellow">
                    {'★'.repeat(review.rating)}
                  </span>
                  <span className="text-light_black">
                    {'★'.repeat(5 - review.rating)}
                  </span>
                </div>
                
                <p className="mt-2 text-light_black">{review.review_text}</p>
                </div>
                <div>
                <h3 className="text-lg font-semibold">{review.name}</h3>

                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}