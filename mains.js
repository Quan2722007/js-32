const dragge = document.querySelectorAll(".box");
const container = document.querySelector(".container");

dragge.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
    });
});
container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getElementCurrent(container, e.clientX);
    const dragging = document.querySelector(".dragging");
    if (afterElement == null) {
        container.appendChild(dragging);
    } else {
        container.insertBefore(dragging, afterElement);
    }
});
function getElementCurrent(container, x) {
    const boxElement = [...container.querySelectorAll(".box:not(.dragging)")];
    return boxElement.reduce(
        (closet, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closet.offset) {
                return { offset: offset, element: child };
            } else {
                return closet;
            }
        },
        { offset: Number.NEGATIVE_INFINITY },
    ).element;
}
