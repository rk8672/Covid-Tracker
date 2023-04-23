import React, { useState, useEffect } from "react";
import styles from "./CountryPicker.module.css";
import { FormControl, NativeSelect } from "@material-ui/core";
import { fetchCountries, fetchCountriesViaBackupAPI } from "./../../api/index";

function CountryPicker({ handleSelectedCountry }) {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let fetched_country_names_array = await fetchCountriesViaBackupAPI();
      // Check if fetched_country_names_array is empty. If it is, it means that the first API call failed. Hence, we will try using a second backup API call.
      if (fetched_country_names_array.length === 0) {
        fetched_country_names_array = await fetchCountries();
      }
      console.log("COVID-19 Countries array - ", fetched_country_names_array);
      setFetchedCountries(fetched_country_names_array); // FYI, setSomething() will cause component to render again.
    }
    fetchMyAPI();
  }, []);

  // FormControl component is a material UI component/container that encapsulates items or components of a form
  // In this case, it is used to wrap the NativeSelect material UI component, which is a drop-down bar with <options></options>
  // Similar to <select></select> dropdown bar with <options></options> in HTML

  return (
    <FormControl className={styles.formControl} data-testid="country">
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleSelectedCountry(e.target.value)}
        className={styles.font}
      >
        <option value="">Global*</option>
        {fetchedCountries.map((country) => (
          <option value={country} key={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

export default CountryPicker;
