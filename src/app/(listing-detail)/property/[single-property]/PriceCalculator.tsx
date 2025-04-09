import { useState, useEffect } from "react";

interface PropertyDate {
  date: string; // 'YYYY-MM-DD' format
  price: number; // Surge price for the day
}

interface PriceCalculatorProps {
  startDate: any;
  endDate: any;
  normalFare: number; // Normal price for each day
  propertyDates: PropertyDate[]; // Array of property dates with surged prices
  setSurgedPrice: any;
}

const PriceCalculator = ({
  startDate,
  endDate,
  normalFare,
  propertyDates,
  setSurgedPrice
}: PriceCalculatorProps) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      const currentDate = new Date(startDate);

      // Loop through each day from startDate to endDate
      while (currentDate.getTime() < new Date(endDate).getTime()) {
        const currentDateStr = currentDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'

        // Check if the current date is in the propertyDates array
        const surgeDate = propertyDates.find((item) => item.date === currentDateStr);

        // If the date is found, apply the surged price
        if (surgeDate) {
          const surgedPrice = normalFare + ((surgeDate?.price / 100) * normalFare);
          total += surgedPrice;
        } else {
          total += normalFare; // Else, use the normal fare
        }

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setTotalPrice(total); // Set the total price after calculating
      setSurgedPrice(total);
    };

    calculateTotalPrice();
  }, [startDate, endDate, normalFare, propertyDates]); // Added surgedPrice to dependencies

  return <p>{totalPrice}</p>;
};

export default PriceCalculator;