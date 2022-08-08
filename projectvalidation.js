/*
	Designed By Yvonne Form Validation
	December 1, 2020
	Rasmin Patiu
 */

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the submit event
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e)
{
	hideAllErrors();

	if(formHasErrors()){
		e.preventDefault();
		return false;
	}

	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e A reference to the reset event
 * return  True allows the reset to happen; False prevents
 *         the browser from resetting the form.
 */
function resetForm(e){
	if ( confirm('Clear form?') )
	{
		hideAllErrors();
		
		document.getElementById("name").focus();
		
		return true;
	}

	e.preventDefault();
	
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors(){
	let errorFlag = false;

	let requiredFields = ["name", "email", "phone"];

	for(let i=0; i<requiredFields.length; i++){
		let textField = document.getElementById(requiredFields[i]);
		if(!formFieldHasInput(textField)){
			document.getElementById(requiredFields[i] + "_error").style.display = "block";

			if(!errorFlag){
				textField.focus();
			}

			errorFlag = true;

		}
	}

	// Email validation
	let mailFormat = new RegExp( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
	let mailValue = trim(document.getElementById("email").value);

	if(document.getElementById("email").value){
		if(!mailFormat.test(mailValue)){
			document.getElementById("emailformat_error").style.display = "block";

			if(!errorFlag){
				document.getElementById("email").focus();
				document.getElementById("email").select();
			}

			errorFlag = true;
		}
	}

	// Phone validation
	let phoneFormat = new RegExp( /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/);
	let phoneValue = trim(document.getElementById("phone").value);

	if(document.getElementById("phone").value){
		if(!phoneFormat.test(phoneValue)){
			document.getElementById("phoneformat_error").style.display = "block";

			if(!errorFlag){
				document.getElementById("phone").focus();
				document.getElementById("phone").select();
			}

			errorFlag = true;
		}
	}

	return errorFlag;
}

/*
 * Resets (hides) all of the error messages on the page.
 */
function hideAllErrors(){
	let errorFields = document.getElementsByClassName("error");
	for(let i=0; i<errorFields.length; i++){
		errorFields[i].style.display = "none";
	}
}

/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str){
	return str.replace(/^\s+|\s+$/g,"");
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement){
	if ( fieldElement.value == null || trim(fieldElement.value) == "" )
	{
		return false;
	}
	
	return true;
}

/**
 * Handles the load event of the document.
 */
function load(){
	document.getElementById("contact_form").addEventListener("submit", validate);
	document.getElementById("contact_form").reset();
	document.getElementById("contact_form").addEventListener("reset", resetForm);
}

document.addEventListener("DOMContentLoaded", load);



















