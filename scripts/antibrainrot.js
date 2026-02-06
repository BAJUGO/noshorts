for (let i = 0; i < localStorage.length; i++) {
    console.log(`${localStorage.key(i)} all visit-times: ${localStorage.getItem(localStorage.key(i))}`);
}