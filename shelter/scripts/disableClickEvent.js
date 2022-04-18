export default function disableClickEvent(element) {
    element.addEventListener('click', e => e.preventDefault());
}