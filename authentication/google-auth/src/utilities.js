export const assignClick = (elementId, func) => {
	const clickElement = document.getElementById(elementId);
	if (clickElement) clickElement.onclick = func;
}
