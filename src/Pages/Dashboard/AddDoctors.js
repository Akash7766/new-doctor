import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddDoctors = () => {
  const [services, setServices] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const imageBB = "aa4aaa3a9ccbadaf185b172aaa46e5ff";

  const onSubmit = (data) => {
    const picture = data.picture[0];
    const formData = new FormData();
    formData.append("image", picture);
    const url = `https://api.imgbb.com/1/upload?key=${imageBB}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const imgSrc = result.data.url;
          const Doctor = {
            name: data.name,
            email: data.email,
            service: data.service,
            imgSrc: imgSrc,
          };
          fetch("http://localhost:5000/doctors", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authoraization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(Doctor),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                toast.success("Doctor added successful", {
                  autoClose: 1000,
                  position: "top-center",
                });
                reset();
              }
            });
        } else {
          alert("Image upload failed");
        }
        // .
      });
    //   .
    console.log(data);
  };

  //   load all services info
  useEffect(() => {
    fetch("http://localhost:5000/schdule")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Add Your Doctors</h2>
      <div className="mx-auto w-80 py-5">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
          <input
            type="name"
            placeholder="Doctors Name"
            required
            class="input input-bordered input-accent w-full max-w-xs"
            {...register("name")}
          />
          <input
            type="email"
            placeholder="Doctors Email"
            required
            class="input input-bordered input-accent w-full max-w-xs"
            {...register("email")}
          />
          <select
            {...register("service")}
            className="select select-accent"
            required
          >
            <option value="">Please select a service</option>
            {services.map((service) => (
              <option value={service.name} key={service._id}>
                {service.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            required
            class="input input-bordered input-accent w-full max-w-xs"
            {...register("picture")}
          />
          <input type="submit" className="btn btn-accent w-full" value="Add" />
        </form>
      </div>
    </div>
  );
};

export default AddDoctors;
