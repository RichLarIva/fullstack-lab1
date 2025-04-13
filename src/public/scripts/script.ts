import axios from "axios";

interface Dish {
  _id: string;
  name: string;
  ingredients: string[];
  preparationSteps: string[];
  cookingTime: string;
  origin: string;
  spiceLevel: string;
}

const tableBody = document.querySelector("#dish-table tbody") as HTMLTableSectionElement;
const form = document.getElementById("dish-form") as HTMLFormElement;
const editModal = document.getElementById("edit-modal") as HTMLElement;
const closeModal = document.getElementById("close-modal") as HTMLElement;
const editForm = document.getElementById("edit-form") as HTMLFormElement;

let currentDishId: string | null = null;

const fetchDishes = async () => {
  try {
    const res = await axios.get<Dish[]>("/api/v1/dishes");
    tableBody.innerHTML = "";

    res.data.forEach((dish) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${dish.name}</td>
        <td>${dish.origin}</td>
        <td>${dish.spiceLevel}</td>
        <td>
          <button onclick="openEditModal('${dish._id}', '${dish.name}', '${dish.ingredients.join(",")}', '${dish.preparationSteps.join(",")}', '${dish.cookingTime}', '${dish.origin}', '${dish.spiceLevel}')">Edit</button>
          <button onclick="deleteDish('${dish._id}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching dishes:", error);
  }
};

const deleteDish = async (id: string) => {
  if (confirm("Delete this dish?")) {
    try {
      await axios.delete(`/api/v1/dishes/${id}`);
      fetchDishes();
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  }
};

const openEditModal = (
  id: string,
  name: string,
  ingredients: string,
  preparationSteps: string,
  cookingTime: string,
  origin: string,
  spiceLevel: string
) => {
  currentDishId = id;
  (document.getElementById("edit-name") as HTMLInputElement).value = name;
  (document.getElementById("edit-ingredients") as HTMLInputElement).value = ingredients;
  (document.getElementById("edit-preparationSteps") as HTMLInputElement).value = preparationSteps;
  (document.getElementById("edit-cookingTime") as HTMLInputElement).value = cookingTime;
  (document.getElementById("edit-origin") as HTMLInputElement).value = origin;
  (document.getElementById("edit-spiceLevel") as HTMLInputElement).value = spiceLevel;
  editModal.style.display = "block";
};

closeModal.onclick = () => {
  editModal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === editModal) {
    editModal.style.display = "none";
  }
};

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(editForm)) as unknown as Dish;
  data.ingredients = (data.ingredients as unknown as string).split(",").map((i) => i.trim());
  data.preparationSteps = (data.preparationSteps as unknown as string).split(",").map((s) => s.trim());

  try {
    await axios.put(`/api/v1/dishes/${currentDishId}`, data);
    editModal.style.display = "none";
    fetchDishes();
  } catch (error) {
    console.error("Error updating dish:", error);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form)) as unknown as Dish;
  data.ingredients = (data.ingredients as unknown as string).split(",").map((i) => i.trim());
  data.preparationSteps = (data.preparationSteps as unknown as string).split(",").map((s) => s.trim());

  try {
    await axios.post("/api/v1/dishes", data);
    form.reset();
    fetchDishes();
  } catch (error) {
    console.error("Error adding dish:", error);
  }
});

fetchDishes();