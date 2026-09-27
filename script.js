const form = document.getElementById("form");
const complete = document.getElementById("complete");
const btnConfirm = document.getElementById("btn-confirm");
const btnContinue = document.getElementById("btn-continue");
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvcInput = document.getElementById("cvc");
const inputs = document.querySelectorAll(".form-input");
const nameError = document.getElementById("name-error");
const numberError = document.getElementById("number-error");
const dateError = document.getElementById("date-error");
const cvcError = document.getElementById("cvc-error");
const cardName = document.getElementById("card-name");
const cardNumber = document.getElementById("card-number");
const cardMonth = document.getElementById("card-month");
const cardYear = document.getElementById("card-year");
const cardCvc = document.getElementById("card-cvc");
const onlyNumbers = /^\d+$/;

function updateCard() {
  cardName.textContent = nameInput.value || "Jane Appleseed";
  cardNumber.textContent = numberInput.value || "0000 0000 0000 0000";
  cardMonth.textContent = monthInput.value || "00";
  cardYear.textContent = yearInput.value || "00";
  cardCvc.textContent = cvcInput.value || "000";
}

function showError(input, errorMessage, text) {
  input.classList.add("error");
  errorMessage.textContent = text;
  errorMessage.style.display = "block";
}

function clearError(input, errorMessage) {
  input.classList.remove("error");
  errorMessage.style.display = "none";
}

function checkName() {
  clearError(nameInput, nameError);
  if (nameInput.value.trim() === "") {
    showError(nameInput, nameError, "Can't be blank");
    return false;
  }
  return true;
}

function checkNumber() {
  clearError(numberInput, numberError);
  const number = numberInput.value.replace(/\s/g, "");
  if (numberInput.value === "") {
    showError(numberInput, numberError, "Can't be blank");
    return false;
  }
  if (!onlyNumbers.test(number)) {
    showError(numberInput, numberError, "Wrong format, numbers only");
    return false;
  }
  if (number.length !== 16) {
    showError(numberInput, numberError, "Card number must have 16 digits");
    return false;
  }
  return true;
}

function checkDate() {
  clearError(monthInput, dateError);
  clearError(yearInput, dateError);
  if (monthInput.value === "" || yearInput.value === "") {
    if (monthInput.value === "") {
      showError(monthInput, dateError, "Can't be blank");
    }
    if (yearInput.value === "") {
      showError(yearInput, dateError, "Can't be blank");
    }
    return false;
  }
  if (!onlyNumbers.test(monthInput.value) || !onlyNumbers.test(yearInput.value)) {
    showError(monthInput, dateError, "Wrong format, numbers only");
    showError(yearInput, dateError, "Wrong format, numbers only");
    return false;
  }
  if (Number(monthInput.value) < 1 || Number(monthInput.value) > 12) {
    showError(monthInput, dateError, "Invalid month");
    return false;
  }
  return true;
}

function checkCvc() {
  clearError(cvcInput, cvcError);
  if (cvcInput.value === "") {
    showError(cvcInput, cvcError, "Can't be blank");
    return false;
  }
  if (!onlyNumbers.test(cvcInput.value)) {
    showError(cvcInput, cvcError, "Wrong format, numbers only");
    return false;
  }
  if (cvcInput.value.length !== 3) {
    showError(cvcInput, cvcError, "CVC must have 3 digits");
    return false;
  }
  return true;
}

inputs.forEach((input) => {
  input.addEventListener("input", updateCard);
});

btnConfirm.addEventListener("click", function() {
  const isNameValid = checkName();
  const isNumberValid = checkNumber();
  const isDateValid = checkDate();
  const isCvcValid = checkCvc();
  if (!isNameValid || !isNumberValid || !isDateValid || !isCvcValid) {
    return;
  }
  form.style.display = "none";
  complete.classList.add("active");
});

btnContinue.addEventListener("click", function() {
  form.reset();
  updateCard();
  complete.classList.remove("active");
  form.style.display = "flex";
});
