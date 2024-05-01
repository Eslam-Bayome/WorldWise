import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

const CitiesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "startFetching":
      return { ...state, isLoading: true };
    case "endFetching":
      return { ...state, isLoading: false };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "cities/getting":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("unKnown action type");
  }
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "startFetching" });
      try {
        const res = await fetch(`http://localhost:3000/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (+id === currentCity.id) return;
      dispatch({ type: "startFetching" });
      try {
        const res = await fetch(`http://localhost:3000/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "cities/getting", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error getting cities...",
        });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    dispatch({ type: "startFetching" });
    try {
      const res = await fetch(`http://localhost:3000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error on adding city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "startFetching" });
    try {
      await fetch(`http://localhost:3000/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error on deleteing city...",
      });
    }
  }

  const values = useMemo(() => {
    return {
      cities,
      isLoading,
      currentCity,
      getCity,
      createCity,
      deleteCity,
      error,
    };
  }, [cities, isLoading, currentCity, getCity, createCity, deleteCity, error]);
  return (
    <CitiesContext.Provider value={values}>{children}</CitiesContext.Provider>
  );
}
function useCities() {
  let context = useContext(CitiesContext);
  if (context === undefined) throw new Error("You Cant Use Context Here");
  return context;
}
export { CitiesProvider, useCities };
