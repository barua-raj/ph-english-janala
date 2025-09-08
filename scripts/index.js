const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";

    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        displayLesson(json.data);
    });
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
    
};

const loadLevelWord = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        
        removeActive(); // remove all active class
        const clickedBtn = document.getElementById(`btn-lesson-${id}`);
        clickedBtn.classList.add("active"); // add active class
        
        displayLevelWord(data.data)
    });
};

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
    // console.log(word);
    const detailsBox = document.getElementById("word-details-container");
    detailsBox.innerHTML = `
            <div class="mb-8">
                <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>: <span class="font-bangla">${word.pronunciation}</span>)</h2>
            </div>
            <div class="">
                <h2 class="font-semibold mb-2">Meaning</h2>
                <p class="font-bangla">${word.meaning}</p>
            </div>
            <div class="my-5">
                <h2 class="font-semibold mb-2">Example</h2>
                <p>${word.sentence}</p>
            </div>
            <div class="">
                <h2 class="font-semibold mb-2">Synonyms</h2>
                <span class="btn">1</span>
                <span class="btn">2</span>
                <span class="btn">3</span>
            </div>
    `;
    document.getElementById("word-modal").showModal();
};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
            <div class="text-center col-span-full py-10 space-y-6">
                <img src="./assets/alert-error.png" alt="" class="mx-auto">
                <p class="text-xl font-medium text-gray-600"><span class="font-bangla">এই</span> Lesson <span class="font-bangla">এ এখনো কোন</span> Vocabulary <span class="font-bangla">যুক্ত করা হয়নি</span></p>
                <h2 class="text-5xl font-semibold"><span class="font-bangla">নেক্সট Lesson <span class="font-bangla">এ যান</span></h2>
            </div>
        `;
        return;
    }

    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-2 space-y-4">
                <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-semibold">Meaning/Pronunciation</p>
                <div class="font-bangla text-2xl font-medium text-[rgba(24,24,27,1)]">
                    "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"
                </div>
                <div class="flex justify-between items-center mt-10">
                    <button onclick="loadWordDetail(${word.id})" class="btn bg-[rgba(26,145,255,0.1)] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[rgba(26,145,255,0.1)] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `;
        wordContainer.append(card);
    });
};

const displayLesson = (lessons) => {

    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `

            <button id="btn-lesson-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open-reader"></i> Lesson - ${lesson.level_no}</button>

        `;
        levelContainer.append(btnDiv);
    };
};

loadLessons();