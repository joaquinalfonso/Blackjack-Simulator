export function GetControlSelectedElement(id) {
	var selectControl = document.getElementById(id);
	return selectControl.options[selectControl.selectedIndex].value;
}

export function SetControlSelectElement(id, valueToSelect) {
	let element = document.getElementById(id);
	element.value = valueToSelect;
}

export function GetControlIntegerElement(id) {
	var control = document.getElementById(id);
	return control.value;
}

export function SetControlIntegerValue(id, value) {
	var control = document.getElementById(id);
	control.value = value;
}

export function ChangeElementVisibility(id, visible) {
	var elem = document.getElementById(id);
	if (visible) elem.style.removeProperty("display");
	else elem.style.display = "none";
}
