import React, { Fragment, useState, useRef } from 'react';
import swal from 'sweetalert';
import '../App.css';

const BaseForm = (props) => {
  const display = props.processing ? { display: 'none' } : { display: 'block' };

  return <div className={props.className} id={props.id} style={display}>
      {props.children}
  </div>;
};

export default BaseForm;
