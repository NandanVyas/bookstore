import React from "react";
import { TextField} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import { useState } from "react";

const Delivery2 = ({
  setDisabled,
  name,
  setName,
  address,
  setAddress,
  phone,
  setPhone,
  pincode,
  setPincode,
  email,
  setEmail,
  state,
  setState,
  city,
  setCity,
}) => {
  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [phone, setPhone] = useState("");
  // const [pincode, setPincode] = useState("");
  // const [email, setEmail] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    } else if (e.target.name == "state") {
      setState(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    }
    if (
      name.length >= 3 &&
      address.length >= 3 &&
      pincode.length >= 3 &&
      phone.length >= 3 &&
      email.length >= 3
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <div className="text-xl font-semibold my-4 dark:text-orange-300">
        1.Delivery Details
      </div>
      <ThemeProvider theme={theme}>
      <div className="flex py-2 w-full sm:flex-row flex-col mx-auto mt-10 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        <div className="flex-grow w-full">
        
        <TextField  fullWidth id="name" label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        
        <div className="flex-grow w-full">
        <TextField  fullWidth id="email" label="Email" variant="outlined" value={email} InputProps={{
            readOnly: true,
          }}/>
        </div>
      </div>
      <div className="py-2 w-full">
        <div className="relative">
        <TextField multiline rows={3} fullWidth id="address" label="Address" variant="outlined" value={address} onChange={(e)=>setAddress(e.target.value)} />
        </div>
      </div>
      <div className="flex py-2 w-full sm:flex-row flex-col mx-auto  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        <div className="flex-grow w-full">
          <TextField  value={phone} fullWidth  label="Phone" type="number" variant="outlined"  onChange={(e)=>setPhone(e.target.value)}/>
        </div>
        <div className="flex-grow w-full">
        <TextField  value={pincode} fullWidth  label="Pin Code" type="number" variant="outlined"  onChange={(e)=>setPincode(e.target.value)}/>
        </div>
      </div>
      <div className="flex py-2 w-full sm:flex-row flex-col mx-auto  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        <div className="flex-grow w-full">
        <TextField  value={city} fullWidth  label="City"  variant="outlined"  onChange={(e)=>setCity(e.target.value)}/>
        </div>
        <div className="flex-grow w-full">
        <TextField  value={state} fullWidth  label="State"  variant="outlined"  onChange={(e)=>setState(e.target.value)}/>
        </div>
      </div>
      </ThemeProvider>
    </>
  );
};

export default Delivery2;
