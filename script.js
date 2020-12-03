const descriptionInput = document.getElementById("job-description");
const locationInput = document.getElementById("location");
const jobTypeInput = document.getElementById("job-types");
const onClickHandler = (e) => {
  e.preventDefault();
  if (!descriptionInput.value && !locationInput.value) {
    return false;
  }
  getJobs(descriptionInput.value, locationInput.value, jobTypeInput.value);
  resetForm();
};

const getJobs = (description, location, jobType) => {
  let url = `https://jobs.github.com/positions.json?description=${description}&location=${location}&full_time=${
    typeof jobType === "boolean" ? jobType : false
  }`;
  axios
    .get(url)
    .then((jobs) => {
      jobs.data.map((job) => {
        let {
          company_logo: companyLogo,
          type,
          description,
          how_to_apply: howToApply,
          title,
        } = job;
        if (!(jobType === "part-time") && !(type === "full time")) {
          document
            .getElementById("card-container")
            .appendChild(
              getCard(
                title,
                companyLogo,
                description.substring(0, 100),
                howToApply,
                type
              )
            );
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const getCard = (title, logo, description, applyInfo, type) => {
  let card = document.createElement("div");
  let cardHTML = `
        <h1>${title}</h1>
        <div class="logo-container">
            <img height="auto" width="350px" src=${logo}/>
        </div>
        <div>${type}</div>
        <div class="job-details">
            <div>${description}</div>
            <div>${applyInfo}</div>
        </div>
        <button onclick="toggleDetails(event.currentTarget.parentElement)">Job Details</button>
    `;
  card.innerHTML = cardHTML;
  card.style.cssText =
    "height: fit-content; width: 350px; border: 10px solid red";
  return card;
};
const resetForm = () => {
  descriptionInput.value = "";
  locationInput.value = "";
};
const toggleDetails = (card) => {
  let jobDetails = card.getElementsByClassName("job-details")[0];

  if ((jobDetails.style.display = "none")) {
    jobDetails.style.display = "block";
  } else if ((jobDetails.style.display = "block")) {
    jobDetails.style.display = "none";
  }
};
