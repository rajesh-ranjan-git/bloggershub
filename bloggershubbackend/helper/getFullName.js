export const getFullname = (firstName, middleName, lastName) => {
  let fullName = "";

  {
    firstName
      ? lastName
        ? middleName
          ? (fullName = `${firstName} ${middleName} ${lastName}`)
          : (fullName = `${firstName} ${lastName}`)
        : (fullName = `${firstName}`)
      : "";
  }

  return fullName;
};
