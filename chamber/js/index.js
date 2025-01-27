function displayMembers(members) {
  const container = document.getElementById("directory-container")
  container.innerHTML = ""

  members.forEach((member) => {
    const card = document.createElement("div")
    card.classList.add("member-card")
    if (member.image) {
      const img = document.createElement("img");
      img.src = `images/${member.image}`;
      img.alt = member.name;
      card.appendChild(img);
    }

    if (member.name) {
      const name = document.createElement("h3");
      name.textContent = member.name;
      card.appendChild(name);
    }

    if (member.address) {
      const address = document.createElement("p");
      address.textContent = member.address;
      card.appendChild(address);
    }

    if (member.phone) {
      const phone = document.createElement("p");
      phone.textContent = member.phone;
      card.appendChild(phone);
    }

    if (member.website) {
      const website = document.createElement("p");
      const link = document.createElement("a");
      link.href = member.website;
      link.target = "_blank";
      link.textContent = "Website";
      website.appendChild(link);
      card.appendChild(website);
    }

    if (member.membershipLevel) {
      const membershipLevel = document.createElement("p");
      membershipLevel.textContent = `Membership Level: ${getMembershipLevel(member.membershipLevel)}`;
      card.appendChild(membershipLevel);
    }
    container.appendChild(card)
  })
}

function getMembershipLevel(level) {
  switch (level) {
    case 1:
      return "Member"
    case 2:
      return "Silver"
    case 3:
      return "Gold"
    default:
      return "Unknown"
  }
}


// Fetch and display member data
async function fetchMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    console.log("Members", members);
    displayMembers(members);
  } catch (error) {
    console.error("Error fetching members", error);
  }
}

// Toggle view
document.getElementById("grid-view").addEventListener("click", () => {
  console.log("grid-view clicked");
  document.getElementById("directory-container").classList.remove("list-view")
})
  
document.getElementById("list-view").addEventListener("click", () => {
  console.log("list-view clicked");
  document.getElementById("directory-container").classList.add("list-view")
})

// Fetch and display member data
fetchMembers();
