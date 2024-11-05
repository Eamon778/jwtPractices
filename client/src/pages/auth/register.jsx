import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import axios from "axios";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/api/v1/register', formData);
        if (response.status === 201) {
            dispatch(login(response.data.user));
            navigate("/home");
        }
    } catch (error) {
        console.error('Registration error', error);
        if (error.response && error.response.data) {
            console.log("Validation errors:", error.response.data.errors);
        }
    }
};

  return (
    <div className="flex w-full justify-center items-center">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Register
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {[
            { label: "Username", name: "username" },
            { label: "Email", name: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Name", name: "name" },
            { label: "Phone", name: "phone" },
            { label: "Street", name: "address.street" },
            { label: "City", name: "address.city" },
            { label: "State", name: "address.state" },
            { label: "Zip Code", name: "address.zipCode" },
            { label: "Country", name: "address.country" },
          ].map((field) => (
            <Input
              key={field.name}
              label={field.label}
              size="lg"
              name={field.name}
              type={field.type || "text"}
              value={field.name.startsWith("address.")
                ? formData.address[field.name.split(".")[1]]
                : formData[field.name]}
              onChange={handleChange}
            />
          ))}
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Typography
              as="a"
              href="/login"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Log in
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
