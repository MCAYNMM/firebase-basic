import { useEffect, useState } from "react";
import "./App.css";
import { app,db, storage} from "./firebase.Config";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {  
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getFirestore
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";


function App() {
  const [data, setData] = useState();

  const collectionRef = collection(db, "users");
  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  const auth = getAuth();
  const handleSignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        alert("sign in");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const deleteData = () => {
    const doctoDelete = doc(db, "users", "On0knPcZHGQhtIRTDgo1");
    deleteDoc(doctoDelete)
      .then(() => {
        alert("updated");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
 

  const updateData = () => {
    const docRef = doc(db, "users", "26jkh1pcWYKXvTkl901p");
    updateDoc(docRef, {
      name:'manh',
      age: '19'
    }).then((res) => {
      console.log(res);
      console.log('200');
    }).catch((err) => {
      console.log(err);
      console.log('404');
    })
  };

  const handleSubmit = () => {
    addDoc(collectionRef, {
      email: data.email,
      password: data.password,
    })
      .then(() => {
        alert("added");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const getData = () => {
    getDocs(collectionRef).then((res) => {
      console.log(res.docs[0].data());
    });
  };

  

  const submitFile = () => {
    const storageRef = ref(storage, `images/${data.name}`);

    const uploadTask = uploadBytesResumable(storageRef, data);
    console.log(data);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  }

  return (
    <div className="App-header">
      <input
        placeholder="Email"
        name="email"
        type="email"
        className="input-fields"
        onChange={(event) => handleInputs(event)}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        className="input-fields"
        onChange={(event) => handleInputs(event)}
      />

      <button onClick={handleSignIn}>Submit</button>
      <br/>
      <input
        type="file"
        onChange={(event) => setData(event.target.files[0])}
      />
      

      <button onClick={() => getData()}>Submit2</button>
    </div>
  );
}

export default App;
