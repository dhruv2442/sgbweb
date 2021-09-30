import React from 'react';
import img1 from '../img/About.jpg';
import img2 from '../img/About00.png';

const About = () => {
  return (
    <div className='main col-md-10 col-11 m-auto'>
      <div className='title_text text-center mx-3'>About Us</div>
      <div className='row mt-3'>
        <div className='left_part col-md-6 col-12 d-flex justify-content-center align-items-center'>
          <div className='head_container'>
            <div className='wrapper'>
              <img src={img1} alt='' />
              <img src={img2} alt='' />
            </div>
          </div>
        </div>
        <div className='right_part col-md-6 col-12 d-flex justify-content-center align-items-center'>
        <div className='About_info'>
          <p className="my-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
            nostrum accusamus commodi nesciunt in id? Quae dolore architecto
            asperiores aut eveniet amet non debitis est neque recusandae aperiam
            dolorum doloribus reprehenderit, doloremque aliquam placeat! Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Numquam
            consequuntur rem fugiat at minus, vero earum ullam ducimus quae
            laboriosam temporibus repellat praesentium ut neque necessitatibus
            est quas error doloremque nihil veniam sed voluptatem incidunt
            accusamus. Consequuntur deleniti ullam exercitationem quaerat
            pariatur suscipit optio earum?
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default About;
