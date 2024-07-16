const [formData, setFormData] = useState({
  projectName: "",
  discription: "",
  image: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  axios
    .post("http://localhost:3000/api/UPDATE", formData)
    // const data = response.json();
    .then((response) => {
      navigate("/");
      console.log("this is", response.data, "data");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
