import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './viewProject.css';
import imageOne from './invincible.webp';
import axios from 'axios';

const ViewProject = () => {

    const [imageInLarge, setImageInLarge] = useState(imageOne);
    const [data, setData] = useState({});

    const params = useParams();

    useEffect(() => {
        const { id } = params;
        const fetch = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API}/projectById/${id}`);
                console.log("data",data);

                setImageInLarge(data.image_one);
                setData(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetch();
    }, []);

    const changeImage = (event) => {
        const { src } = event.target;
        setImageInLarge(src);
    };

    return ( 
        <section className="viewProject">
            <div className="container">
                <div className="imagesCont">
                    <div className="imageOne">
                        <img onClick={changeImage} src={data.image_one} alt="" />
                    </div>
                    <div className="imageTwo">
                        <img onClick={changeImage} src={data.image_two} alt="" />
                    </div>
                    <div className="imageThree">
                        <img onClick={changeImage} src={data.image_three} alt="" />
                    </div>
                    <div className="imageFour">
                        <img onClick={changeImage} src={data.image_four} alt="" />
                    </div>
                    <div className="imageLarge">
                        <img src={imageInLarge} alt="" />
                    </div>
                </div>
                <div className="discription">
                    <h2>Discription</h2>
                    <div className="discCOnt">
                        <h3>{data.title}</h3>
                        <p>{data.discription}.</p>
                        <a href={data.demo_link}>Demo</a><a href={data.github_link}>Github</a>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default ViewProject;