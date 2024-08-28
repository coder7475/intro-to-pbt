import { useState } from "react";

export default function Form() {
  const [data, setData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const age = formData.get("age");
    const children = formData.get("children");
    const data = { name, age, children };
    console.log(data);
    setData(data);
    event.target.reset();
  };
  return (
    <div className="text-center">
      <h1>Form</h1>
      <p>This is the form component.</p>
      <form onSubmit={handleSubmit}>
        <br /> <br />
        <label htmlFor="name">Name:</label>
        <input
          className="p-2 border border-gray-300 rounded-md"
          type="text"
          id="name"
          name="name"
          required
        />
        <br /> <br />
        <label htmlFor="age">Age:</label>
        <input
          className="p-2 border border-gray-300 rounded-md"
          type="number"
          id="age"
          name="age"
          required
        />
        <br /> <br />
        <label htmlFor="children">Children:</label>
        <input
          className="p-2 border border-gray-300 rounded-md"
          type="number"
          id="children"
          name="children"
          required
        />

        <br /> <br />
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit">Submit</button>
      </form>
      <br /> <br />
      <hr />
      <br />
      {data && (
        <div>
          <p>Name: {data.name}</p>
          <p>Age: {data.age}</p>
          <p>Children: {data.children}</p>
        </div>
      )}
    </div>
  );
}
