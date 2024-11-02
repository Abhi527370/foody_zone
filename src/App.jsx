import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import SearchResult from './components/SearchResult/SearchResult';

//generally important strings are stored in capital letters
export const BASE_URL = "http://localhost:3000"

const App = () => {
// performing network call by use state hook
const [data, setData] = useState(null); 
const[filteredData, setFilteredData] = useState(null);
const[loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [selectedBtn, setSelectedBtn] = useState("all");




// use effect run first before ui, so network call be performed first 
//and data will come first then accordingly ui will eb built 
//use Effect takes a callback function like this
useEffect(()=>{
  const fetchFoodData = async () => {
    //to show spinner while making call to network
    setLoading(true);
  try {
    //fetch is an api in jS by which we can perfrom network call
    const response = await fetch(BASE_URL);
  
    //convert the reponse in json
    const json = await response.json();
  
    setLoading(false);
    setFilteredData(json);
    //agar sahi json reponse aya to use data state mein send kar do
    setData(json);
  }
  catch (error) {
    //if there is any error while fetching the json then set the state with that error
    setError("unable to fetch data");
  }
    // console.log(json);
  };

  fetchFoodData();
},[]);

// console.log(data);

//yeh function tab call hoga jab input mein kuch change hoga
const searchFood = (e) => {
  const searchValue = e.target.value;
  console.log(searchValue);

  if(searchValue == ""){
    setFilteredData(null);
  }

  //it is just comparing food name from all data to which is serached in input 
  //if it matches then callfoodcard of all those food only 
  const filter = data?.filter((food)=>
  food.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  setFilteredData(filter);
};

const filteredFood = (type) =>{

  if(type == "all"){
    setFilteredData(data);
    setSelectedBtn("all");
    return;
  };

  const filter = data?.filter((food)=>
  food.type.toLowerCase().includes(type.toLowerCase())
  );
  setFilteredData(filter);
  setSelectedBtn(type);
} ;

// fetchFoodData();
if(error) return  <div>{error}</div>;
if(loading) return <div>Loading.......</div>;


  return (
    <>
  <Container>
        <TopContainer>
           <div className="logo">
            <img src="/logo.svg" alt="logo" />
           </div>

           <div className="search">
            <input onChange = {searchFood} placeholder="Search Food"/>
           </div>
        </TopContainer>
        <FilterContainer>
            <Button onClick={()=> filteredFood("all")}>All </Button>  
            <Button onClick={()=> filteredFood("Breakfast")}>Breakfast</Button>  
            <Button onClick={()=> filteredFood("Lunch")}>Lunch</Button>  
            <Button onClick={()=> filteredFood("Dinner")}>Dinner</Button>   
        </FilterContainer>
        
  </Container>
  <SearchResult data={filteredData}/>
 </>
  );
};

export default App;

export const Container = styled.div`
// background-color: #323334;
max-width:1200px;
margin: 0 auto;
`;

const TopContainer = styled.section`
height: 140px;
display: flex;
justify-content: space-between;
padding:16px;
align-items:center;

.search{
input{
background-color:transparent;
border:1px solid red;
color: white;
border-radius: 5px;
height:40px;
font-size:16px;
padding: 0 10px;
}}

@media (0<width<600px){
  flex-direction: column;
  height: 120px;
}
`;

const FilterContainer = styled.section`
display:flex;
justify-content:center;
gap:12px;
padding-bottom: 40px;

`;

export const Button =styled.button`
background: #ff4343;
border-radius:5px;
padding: 6px 12px;
border:None;
color:white;
cursor:pointer;
&:hover{
background-color: #f22f2f;
}
`;


