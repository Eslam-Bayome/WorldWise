import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountriesList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../Context/CitiesContext";

function CountriesList() {
  const { cities, isLoading } = useCities();
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((v) => v.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message={"add you first city by clicking on a city on map"} />
    );
  return (
    <ul className={styles.countriesList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountriesList;
