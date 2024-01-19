import React from "react";
import { useState } from "react";
import { City, State, Country } from "country-state-city";
import axios from "axios";
function CreateForm() {
  
  const countries = Country.getAllCountries();
  
  const [isoCountry,setIsoCountry] = useState("");
  const [isoState,setIsoState] = useState("")
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const handleChange1 = event => {
    const result = event.target.value.replace(/[^a-z]/gi, '');

    setFirstName(result);
  };
  const handleChange2 = event => {
    const result = event.target.value.replace(/[^a-z]/gi, '');

    setLastName(result);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('https://formbackend-cikr.onrender.com/forms',{firstName,lastName,email,country,state,city,dob,age,gender}).then(data=>{
     
      alert("user Created Successfully!")
    }).catch(e=>{
     
      if(e.response.data.error.includes('dup key')){
        alert('User already exist with this Email!')
      }
    })
  };
  return (
    <div>
      {
        <>
          <p className="text-center my-6 text-blue-500 font-normal text-[2rem]">
            Create User
          </p>
          <div className="flex justify-center items-center my-6">
            
             
              <div className="flex flex-col  lg:flex-row justify-center md:justify-start gap-3 mt-3">
                <div className="flex  flex-col flex-1 gap-3">
                  <label className="text-[#FEFEFF]">Country</label>
                  <select
                    defaultValue="Country"
                
                    className="border focus:border-blue-500 focus:outline-none border-gray-600 rounded text-white bg-[#46464f] p-3"
                    onChange={(e) => {
                     
                      setIsoCountry(e.target.value);
                      Array.from(e.target).map((data) => {
                        if (data.value === e.target.value) {
                          setCountry(data.label);
                        
                        }
                      });
                    
                      setStates(State.getStatesOfCountry(e.target.value));
                      setCities(
                        City.getCitiesOfState(
                         []
                        )
                      );
                    }}
                    
                  >
                    <option disabled value="Country">
                      Select Countries
                    </option>
                    {countries.map((data, index) => (
                      <option  key={index} label={data.name} value={data.isoCode}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col flex-1 gap-3">
                  <label className="text-[#FEFEFF]">State</label>
                  <select
                    className="border border-gray-600 focus:border-blue-500 focus:outline-none  rounded text-white bg-[#46464f] p-3"
                    onChange={(e) => {
                      setIsoState(e.target.value);
                      
                      setCities(City.getCitiesOfState(isoCountry, e.target.value));
                      Array.from(e.target).map((data) => {
                        if (data.value === e.target.value) {
                          setState(data.label);
                         
                        }
                      });
                    }}
                    defaultValue="State"
                  >
                    <option disabled value="State">Select States</option>
                    {states.map((data, index) => {
                      return (
                        <option
                          key={index}
                          label={data.name}
                          value={data.isoCode}
                        >
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col flex-1 gap-3">
                  <label className="text-[#FEFEFF]">City</label>
                  <select
                    className="border border-gray-600 focus:border-blue-500 focus:outline-none  rounded text-white bg-[#46464f] p-3"
                    onChange={(e) => setCity(e.target.value)}
                    defaultValue={"City"}
                  >
                    <option value="City">Select Cities</option>
                    {cities.map((data, index) => {
                      return (
                        <option
                          key={index}
                          label={data.name}
                          value={data.name}
                        >
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              
             
            
          </div>
        </>
      }
    </div>
  );
}

export default CreateForm;