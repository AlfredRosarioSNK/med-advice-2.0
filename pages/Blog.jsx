import Header from "../src/components/Header";

import '../styles/Blog.css';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../src/Credentials';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';



export default function Blog() {
    const [createdDivs, setCreatedDivs] = useState([]);
    const [editable, setEditable] = useState(false);
    const [image, setImage] = useState(null);
    const [role, setRole] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {

                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                const userData = userDoc.data();
                setRole(userData.role);
            } else {
                setRole(null);
            }
        });

        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const loadPosts = async () => {
            const querySnapshot = await getDocs(collection(db, 'publicaciones'));
            const posts = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setCreatedDivs(posts);
        };

        loadPosts();
    }, []);

    const handlePublish = async () => {
        try {
            const dataToSave = {
                image: image,
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione deserunt perferendis incidunt soluta ullam itaque deleniti id fugit minima tempore, modi architecto, dolore vero exercitationem animi unde hic ipsam alias.",
                editable: false
            };

            const docRef = await addDoc(collection(db, 'publicaciones'), dataToSave);

            // Agregar la nueva publicación al estado para actualizar la UI instantáneamente
            setCreatedDivs(prevDivs => [
                ...prevDivs,
                {
                    ...dataToSave,
                    id: docRef.id // Añadir el ID del documento para poder identificar la publicación si es necesario
                }
            ]);

            console.log('Documento agregado con ID:', docRef.id);
        } catch (error) {
            console.error('Error al guardar el documento:', error);
        }
    };

    const handleCreateDiv = () => {
        setCreatedDivs(prevDivs => [
            ...prevDivs,
            {
                image: null,
                editable: false,
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione deserunt perferendis incidunt soluta ullam itaque deleniti id fugit minima tempore, modi architecto, dolore vero exercitationem animi unde hic ipsam alias."
            }
        ]);
    };



    const handleDeleteDiv = (index) => {
        setCreatedDivs(prevDivs => prevDivs.filter((_, i) => i !== index));
    };

    const handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setCreatedDivs(prevDivs => {
                const updatedDivs = [...prevDivs];
                updatedDivs[index].image = reader.result;
                return updatedDivs;
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleEditToggle = () => {
        setEditable(!editable);
    };

    const handleContentChange = (e, index) => {
        const newContent = e.target.value;
        setCreatedDivs(prevDivs => {
            const updatedDivs = [...prevDivs];
            updatedDivs[index].content = newContent;
            return updatedDivs;
        });
    };


    return (
        <div className="h-auto overflow-y-auto">
          <Header />
          <div className="flex justify-center">
            <div className="w-1/2 flex flex-col justify-center items-center">
              {createdDivs.map((div, index) => (
                <div key={index} className="w-full h-50v bg-white m-2 rounded-lg hover:shadow-2xl cursor-pointer relative">
                  {div.image ? (
                    <img src={div.image} alt="Uploaded" className="w-full h-2/4 object-cover rounded-t-lg" />
                  ) : (
                    role === 'medico' && (
                      <div className="w-full h-2/4 flex justify-center items-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index)}
                          className="absolute opacity-0 w-full h-2/4 cursor-pointer"
                        />
                        <span className="text-gray-500">Haz clic para subir una imagen</span>
                      </div>
                    )
                  )}
                  <p className="p-4" contentEditable={editable && role === 'medico'}>
                    {div.content}
                  </p>
                  <div className='flex'>
                    {role === 'medico' && (
                      <>
                        <button onClick={() => handleEditToggle(index)}>
                          {editable ? "Guardar" : "Editar"}
                        </button>
                        <button onClick={() => handleDeleteDiv(index)}>
                          Borrar
                        </button>
                      </>
                    )}
                    {role === 'medico' && (
                      <button onClick={handlePublish} type="submit">Publicar</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-1/0 h-96 ml-4 mt-2 rounded-lg">
              <div className="w-auto h-full bg-white m-2 rounded-lg hover:shadow-2xl cursor-pointer flex justify-center items-center">
                {role === 'medico' && (
                  <button onClick={handleCreateDiv} className="btn" type="submit">Crear</button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
      
}


