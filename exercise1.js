let input_box = document.getElementById("interests");
let submit_btn = document.getElementById("submit_interests");
let interest_content = document.getElementById("interest_content");
let interest_list = document.getElementById("interest_list");

submit_btn.addEventListener("click", () => {

    let int_value = input_box.value;

    if (!int_value.includes(",")) {
        alert("Please enter your interests as a comma-separated list.");
    }
    else {
        let interests = int_value.split(",");

        interest_list.innerHTML = "";

        interests.forEach((interest) => {
            let listItem = interest_list.appendChild(
                document.createElement("li")
            );

            listItem.textContent = interest.trim();
        });

        interest_content.hidden = false;
    }

});