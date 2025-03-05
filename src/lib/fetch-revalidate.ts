export const fetchRevalidate = async () => {
  const url = "http://localhost:3000/api/revalidate";

  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
