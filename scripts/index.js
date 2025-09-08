const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";

    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        displayLesson(json.data);
    });
};
loadLessons();

const loadLevelWord = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data))
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    words.forEach(word => {
        const card =document.createElement("div");
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-2 space-y-4">
                <h2 class="text-2xl font-bold">${word.word}</h2>
                <p class="font-semibold">Meaning/Pronunciation</p>
                <div class="font-bangla text-2xl font-medium text-[rgba(24,24,27,1)]">
                    "${word.meaning} / ${word.pronunciation}"
                </div>
                <div class="flex justify-center items-center gap-85 mt-10">
                    <button class="btn bg-[rgba(26,145,255,0.1)] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i></button>
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
        console.log(lesson);
        
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `

            <button onClick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open-reader"></i> Lesson - ${lesson.level_no}</button>

        `;
        levelContainer.append(btnDiv);
    };
};