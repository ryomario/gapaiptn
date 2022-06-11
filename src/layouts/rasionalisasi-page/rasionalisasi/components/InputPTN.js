import { useEffect, useState } from "react"
import InputSelection from "./InputSelection";
import dataPtn from "../data/ptn.json"
import dataProdi from "../data/prodi.json";

const InputPTN = (props) => {
  const [ptn, setPtn] = useState(props['value']?.['ptn']);
  const [prodi, setProdi] = useState(props['value']?.['prodi']);

  useEffect(()=>{
    props['onChange']?.(props['name'],{'ptn':ptn,'prodi':prodi});
  },[ptn,prodi]);

  const handleInputChange = (name,value) => {
    // console.log(name,value);
    switch (name) {
      case 'ptn-'+props['name']:
        setPtn(value);
        break;
      case 'prodi-'+props['name']:
        setProdi(value);
        break;
    }

  }

  const validasiSeleksi = (val) => {
    if (val === undefined) return {}
    const isValid = val.length > 0;

    const messages = [];
    if (isValid){
      messages.push(<span className="valid">Pilihan sudah valid</span>);
    } else {
      messages.push(<span className="invalid">Pilihan tidak boleh kosong!</span>)
    }

    return {isValid:isValid, messages:messages};
  }
  return (
    <div className={props['className']}>
      <InputSelection
        className="mb-1"
        name={'ptn-'+props['name']}
        label="Perguruan Tinggi Negeri"
        hint="Pilih salah satu"
        options={dataPtn}
        optionName={{'value':'npsn','label':'singkatan'}}
        handleValueChange={handleInputChange}
        value={ptn}
        required={true}
        autoFocus={props['autoFocus']}
        validation={validasiSeleksi}
      />
      {
        (ptn) ? 
        (
          <InputSelection
            className="ms-4"
            name={'prodi-'+props['name']}
            label="Program Studi"
            hint="Pilih salah satu"
            options={dataProdi[ptn]}
            optionName={{'value':'kode','label':'nama'}}
            handleValueChange={handleInputChange}
            value={prodi}
            required={true}
            validation={validasiSeleksi}
          />
        ):undefined
      }
    </div>
  )
}

export default InputPTN;