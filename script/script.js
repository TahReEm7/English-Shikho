
const allAPI = async () => {
    showLoader()
    try {
        let response = await fetch('https://openapi.programming-hero.com/api/levels/all');
        let data = await response.json();

        if (data && data.data) {
            
            for (const btn of data.data) {
                lessons(btn.level_no)
            }
        } else {
            console.error('Data structure is not as expected:', data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
hideLoader()
}
let clickLesson = async (id) => {
    showLoader()
    let response = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
    let data = await response.json();
        displayCard(data.data);

        hideLoader()
};
 document.getElementById("card-container").style.display='none'

let displayCard = (data) => {
    let cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    
    if(data.length === 0){
        return cardContainer.innerHTML = `
        <div class="col-span-3 flex flex-col justify-center text-center items-center py-3 mx-auto bg-base-200 px-[420px] rounded-lg gap-3">
           <div>
            <img class="w-[60px]" src="./assets/alert-error.png" alt="">
           </div>
            <p class="bangla text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p class="bangla english font-medium text-[24px]">নেক্সট Lesson এ যান</p>
        </div>
        `;
    }
    
        data.forEach((card) => {
        let div = document.createElement("div");
            div.innerHTML = `
            <div class="flex flex-col bg-white text-center justify-center items-center gap-4 shadow-lg rounded-md p-20 m-5  hover:bg-sky-200">
                <p class="english font-bold text-[24px]">${card.word}</p>
                <p  class="english">Meaning / Pronunciation</p>
                <p class="bangla font-semibold text-[18px] text-[#18181B]"><span>${card.meaning ? `${card.meaning}`:`অর্থ নেই`}</span> / <span>${card.pronunciation}</span></p>
                <div class="grid grid-cols-8 mt-5">
                    <button onclick="loadCard('${card.id}')" class="cursor-pointer col-span-1"> <i class="fa-solid p-3 rounded-sm fa-circle-info bg-[#1A91FF10] "></i></button>
                    <span class="col-span-6"></span>
                    <button onclick="pronounceWord('${card.word}')" class="col-span-1 cursor-pointer"> <i class="p-3 rounded-sm fa-solid fa-volume-high bg-[#1A91FF10]"></i></button>
                </div>
            </div>
        `;
        
        document.getElementById("content").style.display='none'
        document.getElementById("card-container").style.display='grid'

        cardContainer.appendChild(div);
    }); 

};

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; 
    window.speechSynthesis.speak(utterance);
  }

const lessons = (level) => {
    let lessonsContainer = document.getElementById("btn-container");
    let button = document.createElement("button");
    button.classList.add("btn", "btn-outline", "btn-primary");
    button.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson-${level}`;
    button.addEventListener("click", () => {
        clickLesson(level);
        document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
    lessonsContainer.appendChild(button);
};
allAPI();
