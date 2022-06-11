import { Component, useEffect, useState } from "react";
import InputFile from "./InputFile";

const InputPrestasi = (props) => {
  const [prestasis,setPrestasis] = useState(props['value']?props['value']:{});
  // const [prestasiBaru,setPrestasiBaru] = useState({});

  useEffect(()=>{
    props['handleChange']?.(prestasis);
    // console.log(prestasis);
  },[prestasis]);

  const nextPrestasiName = () => {
    let count = 1;
    let name;
    do {
      name = ('prestasi-'+count);
      count += 1;
    } while (prestasis[name]);
    return name;
  }

  // if (!prestasiBaru['name']) {
  //   setPrestasiBaru({name:nextPrestasiName()});
  //   return;
  // }

  const isValid = (prestasi) => {
    if (prestasi && prestasi['file'] && prestasi['level']) return true;

    return false;
  }

  const handleAddPrestasi = (prestasi) => {
    // setPrestasiBaru(prestasi);

    // console.log('change');
    if (prestasi['isValid'] && prestasi['submited']){
      if (prestasi['deleting']){
        const prev = {...prestasis};
        delete prev[prestasi['name']];
        setPrestasis(prev);
      } else {
        setPrestasis(prev => {return{...prev,[prestasi['name']]:prestasi}});
      }
      
      // setPrestasiBaru({});
      // return;
    }
    // console.log(prestasi);
  }
  const handlePrestasiChange = (prestasi) => {
    
    if (prestasi['isValid'] && prestasi['submited']){
      if (prestasi['deleting']){
        const prev = {...prestasis};
        delete prev[prestasi['name']];
        setPrestasis(prev);
      } else {
        setPrestasis(prev => {return{...prev,[prestasi['name']]:prestasi}});
      }
      
      // setPrestasiBaru({});
      // return;
    }
  }
  // console.log("InputPrestasi",prestasiBaru);

  const prestasiNames = Object.keys(prestasis);

  return (
    <>
      {
        prestasiNames?.map((name,idx) => (
          <InputFile key={idx} name={()=>prestasis[name]['name']} header={"Prestasi ke-"+(idx+1)} data={prestasis[name]} handleChange={handlePrestasiChange} validation={isValid} />
        ))
      }
      <InputFile name={nextPrestasiName} header="Tambahkan Prestasi" handleChange={handlePrestasiChange} validation={isValid}/>
    </>
  );
}

export default InputPrestasi;