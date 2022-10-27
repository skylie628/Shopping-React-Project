import { useEffect , useState} from 'react';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];

const AvailableMeals  = () =>{
  const [meals,setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError,setHttpError] = useState('');
    useEffect(()=>{
      const fetchMeals = async () =>{
      const respond = await fetch('https://react-pratice-610f2-default-rtdb.firebaseio.com/Meals.json') ;
      if(!respond.ok) {
        throw new Error('something went wrong!');
      }
      const respondData = await respond.json();
      const loadedMeals = [];
      console.log(respondData);
      for(const key in respondData){
        loadedMeals.push({
          id: key,
          name : respondData[key].name,
          description : respondData[key].description,
          price : respondData[key].price,
        });
      }
      //console.log(loadedMeals)
      setMeals(loadedMeals)
      setIsLoading(false)
      };
      
      fetchMeals().catch(
        (error) =>{
        setIsLoading(false) ;
        setHttpError(error.message) ;}
      )
    },[]);
    if(isLoading){
      return (
        <section className = {classes.MealsLoading}>
          <p>Loading...</p>
        </section>
      )
    }
    console.log(httpError)
    if(httpError){
      return (
        <section className = {classes.MealsError}>
          <p>{httpError}</p>
        </section>
      )
    }
    const mealsList = meals.map(meal => <MealItem key = {meal.id}  id = {meal.id} name = {meal.name} description = {meal.description} price = {meal.price}/>)
    return <section>
        <Card>
        <ul>
            {mealsList}
        </ul>
        </Card>
    </section>

}
export default AvailableMeals;