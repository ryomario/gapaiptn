import { Component, useEffect, useRef, useState } from "react";
import InputSelection from "./InputSelection";
import InputText from './InputText';
import dataTingkatPrestasi from '../data/tingkat-prestasi.json';

const levelsPrestasi = () => dataTingkatPrestasi;
const getLevelPrestasi = (val) => {
  return levelsPrestasi().find(prestasi => prestasi.value == val);
}

const InputFile = (props) => {
  const [data,setData] = useState(props['data']?props['data']:{});
  const [editing,setEditing] = useState(false);

  useEffect(()=>{
    if (props['data']){
      setData(props['data']);
    }
  },[props['data']]);

  const onChange = (prestasi) => {
    if (prestasi['isValid'] && prestasi['submited']) {
      // setEditing(false);
      // setData({});
      // console.log("onChange");
      props['handleChange']?.(prestasi);
      setData({});
      setEditing(false);
  // console.log(data);

    }
  }
  const editingPrestasi = (isEdit) => (e) => {
    if (isEdit) {
      setData((prev)=>{return {...prev,'submited':false}});
    }
    setEditing(isEdit);
  }
  const deletePrestasi = (e) => {
    data['submited'] = true;
    data['deleting'] = true;
    // console.log('delete');
    data['isValid'] = props['validation']?.(data);
    props['handleChange']?.({...data});
    setData({})
    setEditing(false);
  }
  
  
  
    // console.log(props['name']?.(),editing);
  // console.log(data);

  if (data['submited'] && !editing) {
    return (<Preview data={data} handleEditing={editingPrestasi} handleDelete={deletePrestasi}/>);
  }

  if (!data['submited']) {
    return (<EditDataFile name={props['name']?.()} data={data} editing={editing} handleChange={onChange} validation={props['validation']} header={props['header']}/>);
  }

}

const UploadFile = (props) => {
  const [file,setFile] = useState(props['file']);
  useEffect(()=>{
    setFile(props['file']);
    // console.log('file',props['file']);
  },[props['file']]);
  useEffect(()=>{
    props['handleChange']?.(file);
  },[file]);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  }
  const deleteFile = () => {
    setFile(undefined);
  }
  const inputFile = useRef();
  if (file) {
    return (
      <div className="input-group">
        <button type="button" className="btn btn-warning" onClick={()=>inputFile.current.click()}>Pilih lainnya</button>
        <input hidden={true} className="form-control" type="file" onChange={onFileChange} name={props['name']} id={props['name']} accept={props['accept']} ref={inputFile}/>
        <input type="text" readOnly={true} className="form-control" value={file['name']}/>
        <button type="button" className="btn btn-danger" onClick={deleteFile}>Hapus</button>
      </div>
    )
  } else {
    return (<input className="form-control" type="file" onChange={onFileChange} name={props['name']} id={props['name']} accept={props['accept']}/>);
  }
}
const EditData = (props) => {
  const [editing,setEditing] = useState(props['editing']);
  const [lastData,setLastData] = useState({'desc':props['desc'],'type':props['type'],'level':props['level']});
  const [desc,setDesc] = useState(props['desc']);
  const [type,setType] = useState(props['type']);
  const [level,setLevel] = useState(props['level']);

  // console.log("edit data",level);
  useEffect(()=>{
    setEditing(props['editing']);
    setDesc(props['desc']);
    setType(props['type']);
    setLevel(props['level']);
    setLastData({'desc':props['desc'],'type':props['type'],'level':props['level']});
  },[props['editing'],props['desc'],props['type'],props['level']]);
  const editMode = (isEdit,isSubmit = false) => () => {
    // props['editMode']?.(isEdit,isSubmit);
    if (isEdit || isSubmit) {
      setLastData({
        'desc':desc,
        'type':type,
        'level':level
      });
      if (isSubmit) {
        props['handleChange']?.({
          'desc':desc,
          'type':type,
          'level':level,
          'submited':true
        })
      }
    } else {
      setDesc(lastData['desc']);
      setType(lastData['type']);
      setLevel(lastData['level']);
      props['handleChange']?.({
        ...lastData,
        'submited':true
      })
    }
    setEditing(isEdit);
  }
  const isValid = () => {
    return props['validation']?.({
      'desc':desc,
      'type':type,
      'level':level
    });;
  }
  if (editing) {
    return (
      <div>
        <InputText
          className="mb-2"
          name={"desc-"+props['name']}
          label="Deskripsi"
          hint="Deskripsi singkat"
          handleValueChange={(_,val)=>setDesc(val)}
          value={desc}
        />
        <div className="row mb-3">
          <InputText
            className="col"
            name={"type-"+props['name']}
            label="Bidang prestasi"
            hint="Bidang prestasi yang didapat"
            handleValueChange={(_,val)=>setType(val)}
            value={type}/>
          <InputSelection
            className="col"
            name={"level-"+props['name']}
            label="Tingkat prestasi"
            hint="Pilih salah satu"
            options={levelsPrestasi()}
            handleValueChange={(_,val)=>setLevel(val)}
            value={level}
            required={true}
          />
        </div>
        <div className="d-flex gap-2 justify-content-end">
          <button type="button" className="btn btn-outline-danger" onClick={editMode(false)}>Batal</button>
          {
            (isValid()) ?
            (<button type="button" className="btn btn-success" onClick={editMode(false,true)}>Selesai</button>)
            :
            (<button type="button" className="btn btn-outline-success disabled" disabled={true}>Selesai</button>)
          }
        </div>
      </div>
    );
  }
}
const EditDataFile = (props) => {
  const [data,setData] = useState(props['data']);
  const [editing,setEditing] = useState(props['editing']);
  
  useEffect(()=>{
    setData(props['data']);
    // console.log('data',props['data']);
  },[props['data']])
  const onFileChange = (file) => {
    // console.log('file change',data);
    setData((prev)=>{
      return {
        ...prev,
        'file':file
      }
    });
    setEditing(file !== undefined);
  }
  const onDataChange = (d) => {
    setData((prev)=>{
      return {
        ...prev,
        ...d
      }
    });
    // console.log('data change',);
  }
  const dataValidation = (d) => {
    const file = data['file'] || d['file'];

    return props['validation']?.({
      ...d,
      'file':file
    });
  }
  useEffect(()=>{
    const d = {...data};
    d['isValid'] = dataValidation(d);
    d['name'] = props['name'];
    if (d['isValid'] && d['submited']) {
      props['handleChange']?.(d);
    }
    console.log('data change',d);
  },[data]);

  // const editMode = (isEdit,isSubmit = false) => {
  //   if (isEdit || isSubmit) {
  //     setLastData({
  //       ...data
  //     });
  //     if (isSubmit) {
  //       onDataChange({
  //         ...data,
  //         'submited':true
  //       })
  //     }
  //   } else {
  //     onDataChange({
  //       ...lastData,
  //       'submited':true
  //     })
  //   }
  //   setEditing(isEdit);
  // }

  return (
    <div className="card bg-primary mb-4">
      <div className="card-header">{props['header']}</div>
      <div className="card-body">
        <fieldset className="mb-2">
          <label htmlFor={props['name']} className="form-label">Bukti prestasi</label>
          <UploadFile name={props['name']} file={data['file']} handleChange={onFileChange}/>
        </fieldset>
        <EditData name={props['name']} editing={editing} desc={data['desc']} type={data['type']} level={data['level']} validation={dataValidation} handleChange={onDataChange}/>
      </div>
    </div>
  );
}

const Preview = ({data,handleEditing,handleDelete}) => (
  <div className="card bg-primary d-flex flex-row align-items-baseline mb-3">
    <div className="card-body">
      <h5 className="card-title">{data['desc']||data['file']?.['name']||"[unknown]"}</h5>
      <h6 className="card-subtitle text-muted">{(data['type']||"[unknown]") + " - " + (getLevelPrestasi(data['level'])?.label)}</h6>
    </div>
    <div className="d-inline-flex">
      <button type="button" className="btn btn-success btn-sm me-2" onClick={handleEditing(true)}>
        <i className="bi bi-pencil-fill"></i>
      </button>
      <button type="button" className="btn btn-danger btn-sm me-2" onClick={handleDelete}>
        <i className="bi bi-trash-fill"></i>
      </button>
    </div>
  </div>
);


export default InputFile;

















// export default class InputFile extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       data: props['data'],
//       editing: true
//     }
//     this.lastData = props['data'];
//     // console.log(this.state);

//     this.onFileChange = this.onFileChange.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this); 
//     this.editingPrestasi = this.editingPrestasi.bind(this);
//     this.deletePrestasi = this.deletePrestasi.bind(this);
//   }
//   componentDidUpdate(prevProps,prevState){
//     if (prevProps['data'] !== this.props['data']) {
//       // console.log('beda');
//       this.setState({data: this.props['data']});
//     }
//     // if (prevState['editing'] != this.state['editing']){
//     //   // console.log('beda edit');
//     //   this.setState({editing: this.props['editing']});
//     // }
//     // console.log('prev',prevState)
//     // console.log('curr',this.state)
//   }

  

//   render() {
//     if (!this.state['data']?.['uploaded'] && this.state['editing']) {
//       return (
//         <div className="card bg-primary mb-4">
//           <div className="card-header">{this.props['header']}</div>
//           <div className="card-body">
//             <this.Input/>
//             <this.FileData/>
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="card bg-primary d-flex flex-row align-items-baseline mb-3">
//           <div className="card-body">
//             <h5 className="card-title">{this.state['data']?.['desc']||this.state['data']?.['file']?.['name']||"[unknown]"}</h5>
//             <h6 className="card-subtitle text-muted">{(this.state['data']?.['type']||"[unknown]") + " - " + (this.getLevelPrestasi(this.state['data']?.['level'])?.label)}</h6>
//           </div>
//           <div className="d-inline-flex">
//             <button type="button" className="btn btn-success btn-sm me-2" onClick={this.editingPrestasi(true)}>
//               <i className="bi bi-pencil-fill"></i>
//             </button>
//             <button type="button" className="btn btn-danger btn-sm me-2" onClick={this.deletePrestasi}>
//               <i className="bi bi-trash-fill"></i>
//             </button>
//           </div>
//         </div>
//       );
//     }
//   }

//   Input = () => {
//     return (
//       <fieldset className="mb-2">
//         <label htmlFor={this.props['name']} className="form-label">Bukti prestasi</label>
//         <this.File/>
//       </fieldset>
//     );
//   }
//   File = () => {
//     if (this.state['data']?.['file']) {
//       return (
//         <div className="input-group">
//           <input type="text" readOnly={true} className="form-control" value={this.state['data']?.['file']?.['name']}/>
//           <button type="button" className="btn btn-danger" onClick={this.deleteFile}>Hapus</button>
//         </div>
//       );
//     } else {
//       return (
//         <input className="form-control" type="file" onChange={this.onFileChange} name={this.props['name']} id={this.props['name']} accept={this.props['accept']}/>
//       )
//     }
//   }
//   FileData = () => {
//     if (this.state['data']?.['file'] && !this.state['data']?.['uploaded']) {
//       return (
//         <div>
//           <InputText
//             className="mb-2"
//             name={"desc-"+this.props['name']}
//             label="Deskripsi"
//             hint="Deskripsi singkat"
//             handleValueChange={this.handleInputChange}
//             value={this.state['data']?.['desc']}
//             autoFocus={true}/>
//           <div className="row mb-3">
//             <InputText
//               className="col"
//               name={"type-"+this.props['name']}
//               label="Bidang prestasi"
//               hint="Bidang prestasi yang didapat"
//               handleValueChange={this.handleInputChange}
//               value={this.state['data']?.['type']}/>
//             <InputSelection
//               className="col"
//               name={"level-"+this.props['name']}
//               label="Tingkat prestasi"
//               hint="Pilih salah satu"
//               options={this.levelsPrestasi()}
//               handleValueChange={this.handleInputChange}
//               value={this.state['data']?.['level']}
//               required={true}
//             />
//           </div>
//           <div className="d-flex gap-2 justify-content-end">
//             <button type="button" className="btn btn-outline-danger" onClick={this.editingPrestasi(false)}>Batal</button>
//             <this.Button/>
//           </div>
//         </div>
//       );
//     }
//   }
//   Button = () => {
//     if (this.state['data']?.['isValid']){
//       return (<button type="button" className="btn btn-success" onClick={() => this.onSubmit()}>Selesai</button>);
//     } else {
//       return (<button type="button" className="btn btn-outline-success disabled" disabled={true}>Selesai</button>)
//     }
//   }
// }