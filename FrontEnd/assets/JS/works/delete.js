import { token } from "../authentication/logout.js";
import { refreshBothGalleries } from "../gallery.js";

// delete works from database
export function deleteWork() {
    const buttons = document.querySelectorAll(".modal-del-buttons");
    buttons.forEach(button => {
        button.addEventListener("click", async () => {
            const id = button.id;
            const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (response.ok) {
                refreshBothGalleries();
            }
        })
    })
}