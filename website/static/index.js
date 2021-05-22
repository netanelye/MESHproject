function deleteElement(searchID){
    fetch("/delete-search", {
        method: "POST",
        body: JSON.stringify({searchID: searchID})
    }).then((_res)=>{
        window.location.href = "/search";
    });
}