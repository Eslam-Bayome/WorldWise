import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from "./Context/CitiesContext";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountriesList from "./components/CountriesList";

// import Pricing from "./Pages/Pricing";
// import Homepage from "./Pages/Homepage";
// import PageNotFound from "./Pages/PageNotFound";
// import AppLayout from "./Pages/AppLayout";
// import Product from "./Pages/Product";
// import Login from "./Pages/Login";
// dist/assets/index-a5c020b5.css   29.90 kB │ gzip:   5.07 kB
// dist/assets/index-becbecfe.js   515.29 kB │ gzip: 148.21 kB

const Homepage = lazy(() => import("./Pages/Homepage"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const Product = lazy(() => import("./Pages/Product"));
const Login = lazy(() => import("./Pages/Login"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
import SpinnerFullPage from "./components/SpinnerFullPage";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
