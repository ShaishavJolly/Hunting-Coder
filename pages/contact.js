import React, { useState } from 'react'
import styles from '../styles/Contact.module.css'

const Contact = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [desc, setdesc] = useState('')

  const data = {name,email,phone,desc}
  const handleSubmit = (e)=>{
    e.preventDefault()

    fetch("http://localhost:3000/api/postcontact", {
      method: "POST",
      body: JSON.stringify({
        data,
      }),
      headers: {
        "content-type": "application/json",
      }
    }).catch((e) => console.log(e))
    .then(data=>{
        alert("Thank You for Contacting us!")
        setname('')
        setemail('')
        setphone('')
        setdesc('')
      });

  };

  const handleChange = (e)=>{
    if(e.target.name === "name"){
      setname(e.target.value)
    }
    else if(e.target.name === "email"){
      setemail(e.target.value)
    }
    else if(e.target.name === "phone"){
      setphone(e.target.value)
    }
    else if(e.target.name === "desc"){
      setdesc(e.target.value)
    }
  }

  return (
    <container className={styles.container}>
      <h2 className={styles.heading}>Contact us</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formelements}>
          <label htmlFor="name">Name:</label>
          <input className={styles.input} value={name} onChange={handleChange} type="text" name="name" id="name" required />
        </div>
        <div className={styles.formelements}>
          <label htmlFor="email">Email:</label>
          <input className={styles.input} value={email} onChange={handleChange} type="email" name="email" id="email" required />
        </div>
        <div className={styles.formelements}>
          <label htmlFor="phone">Phone:</label>
          <input className={styles.input} value={phone} onChange={handleChange} type="text" name="phone" id="phone" required />
        </div>
        <div className={styles.formelements}>
          <label htmlFor="desc">Description:</label>
          <textarea className={styles.input} value={desc} onChange={handleChange} name="desc" id="desc" rows={5} cols={50} />
        </div>
        <button className={styles.btn} type="submit">Submit</button>
      </form>
    </container>
  )
}

export default Contact