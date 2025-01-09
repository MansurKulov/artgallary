'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

import s from "./style.module.css"

export default function Home() {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Загружаем изображения с сервера
  async function fetchImages() {
    try {
      const response = await axios.get('http://vkatun.42web.io/get_images.php');
      if (response.data.success) {
        setImages(response.data.images || []); // Обеспечиваем, что images всегда будет массивом
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }
  useEffect(() => {

    fetchImages();
  }, []);

  // Обработчик выбора файла
  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // // Обработчик загрузки файла
  // const handleUpload = async () => {
  //   if (!selectedFile) {
  //     alert('Выберите файл');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('image', selectedFile);

  //   try {
  //     const response = await axios.post('https://artdb.local/upload.php', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (response.data.success) {
  //       setImages([...images, response.data.path]); // Добавляем новое изображение в список
  //       alert('Файл успешно загружен');
  //     } else {
  //       alert('Ошибка загрузки файла');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };

  {/* <div>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>Загрузить</button>
  </div> */}

  return (
    <div className={s.gallary}>
      {images.length > 0 ? (
        <div className={s.gallary_grid}>
          {images.map((item, index) => (
            <div key={index} className={s.gallary_item}>
              <div className={s.gallary_item__content}>
                <div className={s.gallary_item__image_container}>
                  <img
                    src={`https://artdb.local/${item.image}`}
                    alt={`image-${index}`}
                    style={{ width: '100%', objectFit: 'cover' }}
                  />
                </div>
                {item.description && (
                  <div className={s.gallary_item__image_prop}>
                    <h3 className={s.gallary_item__image_title}>{item.description.name}</h3>
                    <p className={s.gallary_item__image_size}>{item.description.size.SI.width} x {item.description.size.SI.height} cm</p>
                    <p className={s.gallary_item__image_price}>Available · {item.description.price} {">"}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Нет изображений</p>
      )}
    </div>
  );
}
