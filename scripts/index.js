const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";

    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        displayLesson(json.data);
    })
}
loadLessons();

const displayLesson = (lessons) => {

    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        console.log(lesson);
        
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `

            <button href="" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open-reader"></i> Lesson - ${lesson.level_no}</button>

        `;
        levelContainer.append(btnDiv);
    }

}