import { useState, useEffect } from "react";
import axios from "axios";

import styles from "@/styles/components/Filters.module.scss";

export default function Filters({
  setProducts,
  category,
  subCategories,
  products: originalProducts,
}) {
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [filtersValues, setFiltersValues] = useState(
    category.properties.map((prop) => ({ name: prop.name, value: "all" }))
  );

  const [sort, setSort] = useState("_id-desc");

  function clearAllFilters(container, filterName) {
    container.querySelectorAll(
      `.${styles["group--filter-button"]}.${styles["selected"]}`
    ).forEach((button) => { button.classList.toggle(styles["selected"]); });

    // Reset the filter values of the specified property to "all"
    setFiltersValues((prev) =>
      prev.map((prop) => ({
        ...prop,
        value: prop.name === filterName ? "all" : prop.value,
      }))
    );

    // Trigger a change in filters
    setFiltersChanged(true);
  }

  function handleFilterChange(filterName, filterValue) {
    setFiltersValues((prev) => {
      return prev.map((prop) => {
        if (prop.name === filterName) {
          let updatedValue = Array.isArray(prop.value) ? [...prop.value] : [];

          // Check if the value is already in the array, and if so, remove it
          if (updatedValue.includes(filterValue)) {
            updatedValue = updatedValue.filter((val) => val !== filterValue);
          } else {
            // Add the value to the array
            updatedValue.push(filterValue);
          }

          // If the updated value is empty, add "all" back to the array
          if (updatedValue.length === 0) {
            updatedValue = ["all"];
          }

          return { ...prop, value: updatedValue };
        }
        return prop;
      });
    });

    setFiltersChanged(true);
  }

  useEffect(() => {
    if (!filtersChanged) {
      return;
    }

    const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
    const params = new URLSearchParams();

    params.set("categories", catIds.join(","));
    params.set("sort", sort);
    filtersValues.forEach((f) => {
      if (Array.isArray(f.value)) {
        f.value.forEach((val) => {
          if (val !== "all") {
            params.append(f.name, val);
          }
        });
      } else if (f.value !== "all") {
        params.set(f.name, f.value);
      }
    });

    const url = `/api/products?` + params.toString();

    axios.get(url).then((res) => {
      setProducts(res.data);
    });
  }, [filtersValues, sort, filtersChanged]);

  return (
    <div className={styles["Filter"]}>
      <h1>{category.name}</h1>
      <hr className="my-0" />
      {category.properties.map((prop) => (
        <div className={styles["property-group"]} key={prop.name}>
          <h1>
            {prop.name}

            {/* Clear Property Filters */}
            <div
              className={styles["group--filters-clear"]}
              onClick={(e) => {
                clearAllFilters(
                  e.target.parentElement.parentElement.parentElement.querySelector(
                    `.${styles["group--filters"]}`
                  ),
                  prop.name
                );
              }}
            >
              <svg
                class="h-[24px] w-[24px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                {" "}
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />{" "}
                <line x1="18" y1="9" x2="12" y2="15" />{" "}
                <line x1="12" y1="9" x2="18" y2="15" />
              </svg>
            </div>
          </h1>
          {/* Property Filters */}
          <div className={styles["group--filters"]}>
            {prop.values.map((val) => (
              <button
                key={val}
                onClick={(e) => {
                  e.target.classList.toggle(styles["selected"]);
                  handleFilterChange(prop.name, val);
                }}
                className={styles["group--filter-button"]}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
