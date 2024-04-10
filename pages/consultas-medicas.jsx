import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, orderBy, onSnapshot, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { appFirebase } from "../src/Credentials";
import "./ConsultasMedicas.css";


const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

const ConsultasMedicas = () => {
    const [doctores, setDoctores] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [imagen, setImagen] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);


  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
  
      // Obtener el documento del usuario
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsuarioActual({
            uid: user.uid,
            rol: userData.role, 
            fullName: userData.fullName,
            email: userData.email,
            age: userData.age,  
            allergies: userData.allergies,
            username: userData.username,
            weight: userData.weight,
          });
        } else {
          console.log("No se encontró el documento del usuario.");
        }
      }).catch((error) => {
        console.error("Error al obtener el documento del usuario:", error);
      });
    }
  }, []);
  

  useEffect(() => {
    if (!usuarioActual || !usuarioActual.rol) {
        return;
    }
  
    const mensajesQuery = query(
      collection(db, "mensajes"),
      orderBy("fecha", "desc")
    );
  
    const unsubscribe = onSnapshot(mensajesQuery, (querySnapshot) => {
      const mensajesArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMensajes(mensajesArray);
    });
  
    return () => unsubscribe();
  }, [usuarioActual]);

  useEffect(() => {
    if (!doctorSeleccionado) {
      return;
    }

    console.log("Abriendo chat con:", doctorSeleccionado.fullName);
    
  }, [doctorSeleccionado]);


useEffect(() => {
  obtenerDoctores().then(doctoresData => {
    setDoctores(doctoresData);
  });
}, []);

useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const doctoresData = await obtenerDoctores();
        setDoctores(doctoresData);
      } catch (error) {
        console.error('Error al obtener los doctores:', error);
      }
    };
    fetchDoctores();
  }, []);
  

  const obtenerDoctores = async () => {
    const doctoresRef = collection(db, 'users');
    const doctoresSnapshot = await getDocs(doctoresRef);
    const doctoresData = doctoresSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(usuario => usuario.role === 'medico');
    return doctoresData;
  };
  
  const enviarMensaje = async () => {
    if (mensaje.trim() === '' && !imagen) return;
  
    try {
      let imageUrl = '';
      if (imagen) {
        const storageRef = ref(storage, `imagenes/${Date.now()}_${imagen.name}`);
        await uploadBytes(storageRef, imagen);
        imageUrl = await getDownloadURL(storageRef);
      }
  
      // Verificar si usuarioActual y su rol están definidos
      if (usuarioActual && usuarioActual.rol) {
        await addDoc(collection(db, "mensajes"), {
          texto: mensaje,
          imagenUrl: imageUrl,
          usuarioId: usuarioActual.uid,
          rol: usuarioActual.rol,
          fecha: new Date(),
          
        });
  
        setMensaje('');
        setImagen(null);
      } else {
        console.error('Rol de usuario no definido');
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="consultas-container">
      <h1 className="titulo">Consultas Médicas</h1>
      <div className="mensaje-lista">
        {mensajes.map((msg) => (
          <div key={msg.id} className={`mensaje-item ${msg.rol}`}>
            <div className="mensaje-autor">{msg.rol === 'medico' ? 'Médico' : 'Usuario'}</div>

            <p>{msg.texto}</p>
            {msg.imagenUrl && <img src={msg.imagenUrl} alt="Imagen adjunta" className="imagen" />}
          </div>
        ))}
      </div>

      <div className="seleccion-doctor">
  <h2>Seleccionar Doctor:</h2>
  <select onChange={(e) => setDoctorSeleccionado(doctores.find(doctor => doctor.id === e.target.value))} className="select-doctor">

    <option value="">Seleccione un doctor...</option>
    {doctores.map(doctor => (
      <option key={doctor.id} value={doctor.id}>{doctor.fullName}</option>
    ))}
  </select>
</div>
      <div className="input-mensaje">
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          className="textarea-mensaje"
        ></textarea>
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
          accept="image/*"
          className="input-imagen"
        />
        <button onClick={enviarMensaje} className="boton-enviar">Enviar</button>
      </div>
    </div>
  );
};

export default ConsultasMedicas;