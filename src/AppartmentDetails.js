
import React from 'react';
import "./Appartmentsstyle.css";










function AppartmentsDetails(props) {



  return (
    <div className="container">
      <div className="container-head">

        <div className="figure">
          
          <figcaption className = "ImgCaption">{props.details.available === true ? <h3>Available</h3>  : null }</figcaption>
          <img className="containerImg" src={props.details.images[0].url} alt="" height="100px" />        
        </div>
      </div>
      <div className="container2">
        <p>{props.details.type}</p>
        <h2><span className="subInfo">{props.details.title}</span></h2>
        <div className='Containerinfo'>
          <p><span className="subInfo">{props.details.tenants}</span> inquilini</p>
          <p><span className="subInfo">{props.details.baths}</span> bagno</p>
          <p><span className="subInfo">{props.details.beds} </span>letto</p>
        </div>

        <p className="container-details"> {props.details.description.substring(0, 100)}....</p>
        <div className="container-footer">
          <p className="subFooter">Canone d'affitto</p>
          <p><span className="subInfo">{props.details.price}</span>/mese</p>

        </div>
      </div>
    </div>
  );

}

export default AppartmentsDetails;
