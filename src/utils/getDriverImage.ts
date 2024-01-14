import { Driver } from "../types/championship.types";

const getDriverImage = (driver: Driver) => {
  const firstName = driver.givenName.split(' ').at(0);
  const lastName = driver.familyName.split(' ').at(0);
  const firstNameInitial = firstName?.charAt(0);
  const first3LettersFirstName = firstName?.slice(0, 3);
  const first3LettersLastName = lastName?.slice(0, 3);

  return `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${firstNameInitial?.toUpperCase()}/${first3LettersFirstName?.toUpperCase()}${first3LettersLastName?.toUpperCase()}01_${firstName}_${lastName}/${first3LettersFirstName?.toLowerCase()}${first3LettersLastName?.toLowerCase()}01.png.transform/2col-retina/image.png`;
};

export default getDriverImage;