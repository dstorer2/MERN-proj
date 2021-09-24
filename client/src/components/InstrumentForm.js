import axios from "axios";
import React, {useState} from "react";

const InstrumentForm = props => {
    const _id = props.id
    const [formInfo, setFormInfo] = useState({
        instrument: "",
        proficiency: "Want to learn!"
    })

    const [errors, setErrors] =  useState({
        instrument: "",
    })

    const handleChange = event => {
        event.preventDefault();
        setFormInfo({
            ...formInfo,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios.patch("http://localhost:8000/api/user/update/instruments/"+_id, formInfo)
            .then(res=>{
                console.log(res);
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    alert("Nice you've added an instrument to your repertuar!")
                    setFormInfo({
                        instrument: "",
                        proficiency: "Want to learn!"
                    })
                }
            })
            .catch(err=>console.log(err))
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Instrument: </label>                
                    <input value={formInfo.instrument} type="text" className="form-control" name="instrument" onChange={handleChange}/>
                    <span className="alert-danger">{errors.instrument && errors.instrument.message}</span>
                </div>
                <div className="form-group">
                    <label>Proficiency Level: </label>
                    <select value={formInfo.proficiency} name="proficiency" onChange={handleChange}>
                        <option value="Want to learn!">Want to learn!</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                    </select>
                    <span className="alert-danger">{errors.instrument && errors.instrument.message}</span>
                </div>
                <input type="submit" value="Add"/>
            </form>
        </div>
    )
}

export default InstrumentForm;