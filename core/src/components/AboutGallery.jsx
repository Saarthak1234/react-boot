import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import i13 from '../assets/images/imgs/img13.jpg'
import i2 from '../assets/images/imgs/img2.jpg'
import i9 from '../assets/images/imgs/img9.jpg'
import i17 from '../assets/images/imgs/img17.jpg'
import i18 from '../assets/images/imgs/img18.jpg'
import i19 from '../assets/images/imgs/img19.jpg'
import i20 from '../assets/images/imgs/img20.jpg'
import i21 from '../assets/images/imgs/img21.jpg'
import i22 from '../assets/images/imgs/img22.jpg'

const data = [
  { id: 1, imgSrc: i2 },
  { id: 2, imgSrc: i9 },
  { id: 3, imgSrc: i13 },
  { id: 4, imgSrc: i17 },
  { id: 5, imgSrc: i18 },
  { id: 5, imgSrc: i19 },
  { id: 6, imgSrc: i20 },
  { id: 7, imgSrc: i21 },
  { id: 8, imgSrc: i22 },
];

export default function AboutGallery() {
    const [datas, setData] = useState({ img: '', i: 0 });

    const viewImage = (img, i) => {
        setData({ img, i });
    };

    const closeModal = () => {
        setData({ img: '', i: 0 });
    };

    const imgAction = (action) => {
        let i = datas.i;
        if (action === 'next-img') {
            const nextIndex = i + 1 === data.length ? 0 : i + 1;
            setData({ img: data[nextIndex].imgSrc, i: nextIndex });
        } else if (action === 'prev-img') {
            const prevIndex = i === 0 ? data.length - 1 : i - 1;
            setData({ img: data[prevIndex].imgSrc, i: prevIndex });
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (datas.img) {
                if (e.key === 'ArrowLeft') {
                    imgAction('prev-img');
                } else if (e.key === 'ArrowRight') {
                    imgAction('next-img');
                } else if (e.key === 'Escape') {
                    closeModal();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [datas]);

    return (
        <div>
            {/* Modal */}
            {datas.img && (
                <div style={{
                    marginTop: '100px',
                    width: '100%',
                    height: '100vh',
                    background: 'rgba(2, 2, 2, 0.75)',
                    position: 'fixed',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    top: '0',
                    left: '0',
                    zIndex: 1000,
                    backdropFilter: 'blur(20px)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                }}>
                    <button onClick={closeModal} style={{
                        position: 'absolute',
                        top: '60px',
                        right: '20px',
                        background: 'transparent',
                        color: 'white',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        overflow: 'hidden',
                    }}>X</button>
                    <button onClick={() => imgAction('prev-img')} style={{
                        position: 'absolute',
                        left: '350px',
                        background: 'transparent',
                        color: 'white',
                        border: 'none',
                        fontSize: '36px',
                        cursor: 'pointer'
                    }}>&lt;</button>
                    <img src={datas.img} style={{ width: 'auto', maxWidth: '90%', maxHeight: '90%' }} alt="Modal content" />
                    <button onClick={() => imgAction('next-img')} style={{
                        position: 'absolute',
                        right: '350px',
                        background: 'transparent',
                        color: 'white',
                        border: 'none',
                        fontSize: '36px',
                        cursor: 'pointer'
                    }}>&gt;</button>
                </div>
            )}

            {/* Gallery */}
            <div style={{ padding: '100px' }}>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry gutter="20px">
                        {data.map((item, index) => (
                            <img
                                key={index}
                                src={item.imgSrc}
                                style={{ width: '100%', display: 'block', cursor: 'pointer' }}
                                alt={`Gallery Image ${index + 1}`}
                                onClick={() => viewImage(item.imgSrc, index)}
                            />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </div>
    );
}