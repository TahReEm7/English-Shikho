const allWord = async () => {
    try {
        let response = await fetch('https://openapi.programming-hero.com/api/words/all');
        let data = await response.json();
        
        if (data && data.data) {
            modalDetails(data.data);
        } else {
            console.error('Data structure is not as expected:', data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

const loadCard =async (id)=>{
    let response = await fetch(`https://openapi.programming-hero.com/api/word/${id}`);
    let data = await response.json();
    showCard(data.data);   
}


const showCard = (card)=>{
    console.log(card);
        let modal = document.getElementById('modal_details').showModal();
        let modalContent = document.getElementById('modal-content');
          modalContent.innerHTML = `
           <h1 class="font-semibold bangla english text-[24px]">
            ${card.word} (<span> <i class="fa-solid fa-microphone-lines"></i> </span>: ${card.pronunciation})
        </h1>
        <div>
            <p class="font-semibold english">Meaning</p>
            <p class="font-medium bangla">${card.meaning ? `${card.meaning}`:`"অর্থ পাওয়া যায়নি"`}</p>
        </div>
        <div>
            <p class="font-semibold english">Example</p>
            <p class="font-medium bangla">${card.sentence}</p>
        </div>
        <p class="font-semibold bangla">সমার্থক শব্দ গুলো</p>
        <div>
         <p class="font-medium english"> ${card.synonyms ? `<span class="p-2 bg-base-300">${card.synonyms.join(' / ')}</span>` : `No synonyms available`}</p>
        </div>
      </div>
          `  
}
allWord()