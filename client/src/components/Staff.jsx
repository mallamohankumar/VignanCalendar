import {useState} from 'react'
import React from "react";
import * as XLSX from "xlsx";

const Staff = () => {
  const [files,setfiles] = useState()

  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
    //   const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      const data = XLSX.utils.sheet_to_json(ws);
        // console.log(data);
        // const workbookHeaders = xlsx.readFile(req.file.path, { sheetRows: 1 });
        // const columnsArray = xlsx.utils.sheet_to_json(workbookHeaders.Sheets["Sheet1"], { header: 1 })[0];
      setfiles(data);
      // console.log(Object.keys(data[0]));
      // console.log(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async(e) => {

    e.preventDefault();

    console.log(files);
    const res = await fetch('https://vignancalendar.herokuapp.com/staff',{
        method:'POST',
        headers: {
             'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            files
        })
    })

    const data = await res.json()
    if(data.status === 'ok'){
        alert("successful");
    }
    else{
        alert(data.error)
    }
    
}

  return (
    <section className="user1" id="user1">
        <div className="container2">
            <div className="user signinBx">
                <div className="imgBx">
                    <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_h9rxcjpi.json"  background="transparent"  speed="1"  style={{width: "100%" , height: "100%"}}  loop  autoplay></lottie-player>
                </div>
                <div className="formBx">
                    <form onSubmit={handleSubmit}>
                    <h2>Staff Details</h2>
                    <label htmlFor="file" id="lab">Add file</label>
                    <input type="file" id="file" onChange={onChange} style={{display : 'none'}}/>
                    <input type="submit"  />
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Staff