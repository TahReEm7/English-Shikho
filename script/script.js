
const allAPI = async () => {
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

}
let clickLesson = async (id) => {
    let response = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
    let data = await response.json();
        displayCard(data.data);
};
 document.getElementById("card-container").style.display='none'

let displayCard = (data) => {
    let cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    
    if(data.length === 0){
        return cardContainer.innerHTML = `
        <div class="col-span-3 flex flex-col justify-center text-center items-center  my-10 mx-auto bg-base-200 px-[420px] rounded-md gap-3">
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
            <div class="flex flex-col bg-white text-center justify-center items-center gap-4 shadow-lg rounded-md p-20 m-5">
                <p class="english font-bold text-[24px]">${card.word}</p>
                <p  class="english">Meaning / Pronunciation</p>
                <p class="bangla font-semibold text-[18px] text-[#18181B]"><span>${card.meaning}</span> / <span>${card.pronunciation}</span></p>
                <div class="grid grid-cols-8 mt-5">
                    <p class="col-span-1"> <i id="${card.id}" onclick="modal_details.showModal('${card.id}')" class="fa-solid p-3 rounded-sm fa-circle-info bg-[#1A91FF10] cursor-pointer"></i></p>
                    <span class="col-span-6"></span>
                    <p class="col-span-1"> <i class="p-3 rounded-sm fa-solid fa-volume-high bg-[#1A91FF10]"></i></p>
                </div>
            </div>
        `;
        
       document.getElementById("content").style.display='none'
        document.getElementById("card-container").style.display='grid'

        cardContainer.appendChild(div);
    }); 

};



let lessons = (data) => {
    
    let lessonsContainer = document.getElementById("btn-container");
    
    let div = document.createElement("div");
   
    div.innerHTML = `
        <button id="btn-${data}" onclick="clickLesson('${data}')" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>Lesson-${data}
        </button>
    `;

    lessonsContainer.appendChild(div);
   
   
  
}

document.addEventListener("click", () => {
    const container = document.getElementById("btn-container");

    container.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn")) {
            document.querySelectorAll(".btn").forEach((b) => b.classList.remove("active"));
            e.target.classList.add("active");
        }
    });
});


allAPI();


