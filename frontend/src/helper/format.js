function dateFormat(dateString) {
  if (dateString === null || dateString === undefined) {
    return
  }
  if (dateString === "") {
    return
  }
  if (typeof dateString === "string") {
    const [year, month, time] = dateString.split("-")
    const day = time.split("T")[0]
    let formatedDateString = `${day}-${month}-${year}`
    return formatedDateString
  }
  else {
    return
  }
}
export { dateFormat }
