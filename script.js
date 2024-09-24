const inputField = document.getElementById('id-input')
const outputData = document.getElementById('dog-data')

async function fetchDogData(id) {
  try {
    const response = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`)
    if(!response.ok) {
      if (response.status === 404) {
        throw new Error(`Dog ID not found`)
      } else {        
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
    } 
    const dogData = await response.json();
    return dogData
  } catch (error) {
      console.error(`Failed to fetch dog data:`, error)
      throw error;
  }
}

function formatDogData(data) {
 
  const dogAttributes = data.data.attributes;
  // console.log(dogAttributes)
  const { name, description, life: {
  max: lifeMax,
  min: lifeMin
  }, 
  male_weight: {
    max: maleWeightMax,
    min: maleWeightMin
  },
  female_weight: {
    max: femaleWeightMax,
    min: femaleWeightMin
  }, 
hypoallergenic} = dogAttributes;
  
  const hypoallergenicStatus = !hypoallergenic ? " not " : " "
    

  const formattedDogData = 
    `<br>
    <strong>Name: </strong><br>
    ${name}<br><br>
    
    <strong>Description: </strong><br>
    ${description}<br><br>

    The ${name} typically lives between ${lifeMin} to ${lifeMax} years. Male ${name} weigh between ${maleWeightMin} to ${maleWeightMax} kg. Female ${name} weigh between ${femaleWeightMin} to ${femaleWeightMax} kg. Despite their appealing traits, they are${hypoallergenicStatus}hypoallergenic. 
    `

  return formattedDogData;
}

async function submit() {
  const dogID = inputField.value;

  if (!dogID) {
    outputData.innerHTML = `<strong>Please enter an ID</strong>`
  } else {  
    try {
    const dogData = await fetchDogData(dogID)
    const formattedDogData = formatDogData(dogData)
    outputData.innerHTML = formattedDogData
    } catch (error) {
      outputData.innerHTML = `<strong>${error.message}</strong>`
    }
  }
}

// beff84c3-66c4-4335-beba-f346c2565881