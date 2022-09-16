import React, { useEffect, useState }  from 'react';
import Clock from 'react-clock';
import moment from "moment";
import { BrowserRouter as Router, Routes, Route, useParams, Link } from "react-router-dom";





function Time() {
  const [value, setValue] = useState(new Date());
  const [data, setData] = useState();
  const [countrytime, setCountryTime] = useState();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const { place } = useParams();

 useEffect(() => {
   setQuery('')
   fetch(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${place || 'Johor Bahru'}&days=3&aqi=no&alerts=no`)
   .then(res => res.json())
   .then(d => setData(d))
 }, [place]);
 
 useEffect(() => {
   setResults([])
   if (query){
     fetch( `https://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_API_KEY}&q=${query}}`)
     .then(res => res.json())
   .then(d => setResults(d))
   }
 }, [query]);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (data ?
    <div className="w-full min-h-screen bg-black flex justify-center ">
      <div className='flex flex-col items-center w-full'>
      <h1 className='text-white text-2xl lg:text-4xl'>{moment(Date()).format('LTS')}</h1>
      <div className='mt-4'>
       <Clock value={value} />
       </div>
       <h1 className="mt-8 text-white text-5xl">Malaysia , GMT+8</h1>
       <div className='line w-full mt-3'></div>
       <div className='mt-5 flex items-center flex flex-col'>
         <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Type to search" className='flex-1 p-2 pr-80 border-zinc-200 border-2 placeholder-zinc-300 pb-2 text-2xl bg-black focus:bg-white rounded-full'/>
         <div className=" w-[calc(100%-3rem)] flex flex-col bg-black text-white rounded-b-md divide-y shadow-lg bg-black border-white border-1">
            {query && !results.length
              ? "No results"
              : results.map((result) => (
                <Link className="py-3 px-4 text-xl " to={`/${result.url}`}>
                  {[result.country, result.region, result.name]
                    .filter((e) => e)
                    .join(",")}
                </Link>
              ))}
          </div>
       </div>
       <div className='bg-white flex items-center flex flex-col p-16 mt-9 rounded-lg'>
       <div className='flex flex-row text-5xl mt-3'>
       <h1 className=''>{data.location.country}</h1>
       <h1 className=''>,</h1>
       <h1 className=''>{data.location.region}</h1>
       </div>
       <h1 className='bg-white text-5xl mt-3 '>{data.location.localtime}</h1>
       </div>
       </div>
    </div>
  :"");
}


function App(){
  return( 
    <Router>
      <Routes>
        <Route path="/" element={<Time/>}/>
        <Route path="/:place" element={<Time/>}/>
      </Routes>
    </Router>
  );
}

export default App
